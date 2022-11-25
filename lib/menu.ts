import { apiQuery } from 'dato-nextjs-utils/api';
import { AllNewsDocument, AllAboutsMenuDocument, AllConsultsDocument } from "/graphql";

export type Menu = MenuItem[]

export type MenuItem = {
  type: string,
  index?: boolean
  label: string,
  slug?: string,
  regional?: boolean,
  sub?: MenuItem[]
}

const base: Menu = [
  { type: 'about', label: 'Om' },
  {
    type: 'consult', label: 'Anlita oss', sub: [
      { type: 'consult', label: 'Hitta konstnär', slug: '/anlita-oss/hitta-konstnar', regional: true },
      { type: 'consult', label: 'Uppdragsarkiv', slug: '/anlita-oss/uppdrag', regional: true }
    ]
  },
  {
    type: 'artist', label: 'För konstnärer', sub: [
      { type: 'artist', label: 'Bli medlem', slug: '/konstnar/bli-medlem' },
      { type: 'artist', label: 'Logga in', slug: '/konstnar/logga-in' },
      { type: 'artist', label: 'Aktuellt', slug: '/konstnar/aktuellt', regional: true },
      { type: 'artist', label: 'Arbeta med oss', slug: '/konstnar/arbeta-med-oss' }
    ]
  },
  { type: 'initiative', label: 'Våra initiativ', slug: '/vara-initiativ', index: true, sub: [] },
  { type: 'news', label: 'Nyheter', slug: '/nyheter', index: true, regional: true, sub: [] },
  { type: 'contact', label: 'Kontakt', slug: '/kontakt', index: true, regional: true, sub: [] },
]

export const buildMenu = async () => {

  const { news, abouts, consults }: { news: NewsRecord[], abouts: AboutRecord[], consults: ConsultRecord[] } = await apiQuery([
    AllNewsDocument,
    AllAboutsMenuDocument,
    AllConsultsDocument
  ]);

  const menu = base.map(item => {
    let sub: MenuItem[];
    switch (item.type) {
      case 'news':
        sub = news.slice(0, 5).map(el => ({ type: 'news', label: el.title, slug: `/mitt/${el.slug}` }))
        break;
      case 'about':
        sub = abouts.map(el => ({ type: 'about', label: el.title, slug: `/om/${el.slug}` }))
        break;
      case 'consult':
        sub = item.sub.concat(consults.map(el => ({ type: 'about', label: el.title, slug: `/anlita-oss/${el.slug}` })))
        break;
      default:
        break;
    }
    return { ...item, sub: sub ? sub : item.sub }
  })

  return menu
}
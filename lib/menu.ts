import { apiQuery } from 'dato-nextjs-utils/api';
import { AllNewsDocument } from "/graphql";

export type Menu = MenuItem[]

export type MenuItem = {
  type: string,
  label: string,
  slug?: string,
  sub?: MenuItem[]
}

const base: Menu = [
  {
    type: 'about', label: 'Om', sub: [
      { type: 'about', label: 'Om oss', slug: '/om/om-oss' },
      { type: 'about', label: 'Lättläst', slug: '/om/lattlast' },
      { type: 'about', label: 'Styrelse', slug: '/om/syrelse' },
      { type: 'about', label: 'Stadgar', slug: '/om/stadgar' },
      { type: 'about', label: 'Personuppgifter', slug: '/om/personuppgifter' },
    ]
  },
  {
    type: 'consult', label: 'Anlita oss', sub: [
      { type: 'consult', label: 'Hitta konstnär', slug: '/anlita-oss/hitta-konstnar' },
      { type: 'consult', label: 'Rådgivning', slug: '/anlita-oss/radgivning' },
      { type: 'consult', label: 'Uppdragsgivare', slug: '/anlita-oss/uppdragsgivare' },
      { type: 'consult', label: 'Offentlig konst', slug: '/anlita-oss/offentlig-konst' }
    ]
  },
  {
    type: 'artist', label: 'För konstnärer', sub: [
      { type: 'artist', label: 'Bli medlem', slug: '/konstnar/bli-medlem' },
      { type: 'artist', label: 'Logga in', slug: '/konstnar/logga-in' },
      { type: 'artist', label: 'Aktuellt', slug: '/konstnar/aktuellt' },
      { type: 'artist', label: 'Arbeta med oss', slug: '/konstnar/arbeta-med--oss' }
    ]
  },
  {
    type: 'initiative', label: 'Våra initiativ', sub: [
      { type: 'initiative', label: 'Konstdepartementet', slug: '/initiativ/konstdepartementet' },
      { type: 'initiative', label: 'Galleri KC', slug: '/initiativ/galleri-kc' },
      { type: 'initiative', label: 'BRAK', slug: '/initiativ/brak' },
      { type: 'initiative', label: 'X - sites', slug: '/initiativ/x-sites' },
      { type: 'initiative', label: 'Plattform Syd', slug: '/initiativ/plattform-syd' }
    ]
  },
  {
    type: 'news', label: 'Nyheter', sub: []
  },
  {
    type: 'contact', label: 'Kontakt', sub: [
      { type: 'contact', label: 'Förbundet', slug: '/kontakt/forbundet' },
      { type: 'contact', label: 'Våra regioner', slug: '/kontakt/regioner' }
    ]
  },
]

export const buildMenu = async () => {

  const { news }: { news: NewsRecord[] } = await apiQuery(AllNewsDocument);

  const menu = base.map(item => {
    let sub: MenuItem[];
    switch (item.type) {
      case 'news':
        sub = news.slice(0, 5).map(el => ({ type: 'news', label: el.title, slug: `/mitt/${el.slug}` }))
        break;
      default:
        break;
    }
    return { ...item, sub: sub ? sub : item.sub }
  })

  return menu
}
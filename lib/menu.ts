import { regions } from '/lib/region';
import { apiQuery } from 'dato-nextjs-utils/api';
import { LatestNewsDocument, AllAboutsMenuDocument, AllConsultsDocument, LatestProjectsDocument } from "/graphql";

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
  { type: 'about', label: 'Om', regional: false, slug: '/om' },
  {
    type: 'consult', label: 'Anlita oss', slug: '/anlita-oss', sub: [
      { type: 'consult', label: 'Uppdragsarkiv', slug: '/anlita-oss/uppdrag', regional: true },
      { type: 'consult', label: 'Hitta konstnär', slug: '/anlita-oss/hitta-konstnar', regional: true }
    ]
  },
  {
    type: 'artist', label: 'För konstnärer', slug: '/konstnar', sub: [
      { type: 'artist', label: 'Bli medlem', slug: '/konstnar/bli-medlem', regional: false },
      { type: 'artist', label: 'Logga in', slug: '/konstnar/konto/logga-in', regional: false },
      { type: 'artist', label: 'Aktuellt', slug: '/konstnar/aktuellt', regional: true }
    ]
  },
  { type: 'projects', label: 'Våra initiativ', slug: '/vara-initiativ', regional: true, index: true, sub: [] },
  { type: 'news', label: 'Nyheter', slug: '/nyheter', index: true, regional: true, sub: [] },
  { type: 'contact', label: 'Kontakt', slug: '/kontakt', index: true, regional: true, sub: [] },
]

export const buildMenu = async () => {

  const {
    news,
    abouts,
    consults,
    projects
  }: {
    news: NewsRecord[],
    abouts: AboutRecord[],
    consults: ConsultRecord[],
    projects: ProjectRecord[]
  } = await apiQuery([
    LatestNewsDocument,
    AllAboutsMenuDocument,
    AllConsultsDocument,
    LatestProjectsDocument,
  ], { variables: [{ first: 4 }] });

  const menu = base.map(item => {
    let sub: MenuItem[];
    switch (item.type) {
      case 'news':
        sub = news.slice(0, 5).map(el => ({ type: 'news', label: el.title, slug: `/nyheter/${el.slug}`, regional: false }))
        break;
      case 'about':
        sub = abouts.map(el => ({ type: 'about', label: el.title, slug: `/om/${el.slug}`, regional: false }))
        break;
      case 'consult':
        sub = consults.map(el => ({ type: 'about', label: el.title, slug: `/anlita-oss/${el.slug}`, regional: false })).concat(item.sub)
        break;
      case 'projects':
        sub = projects.map(el => ({ type: 'projects', label: el.title, slug: el.url }))
        break;
      case 'contact':
        sub = regions.filter(({ global }) => !global).map(el => ({ type: 'contact', label: el.name, slug: `/${el.slug}/kontakt`, regional: false }))
        break;
      default:
        break;
    }
    return { ...item, sub: sub ? sub : item.sub }
  })

  return menu
}
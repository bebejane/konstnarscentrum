import { apiQuery } from 'dato-nextjs-utils/api';
//import { MenuDocument } from "/graphql";

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
    type: 'hire-us', label: 'Anlita oss', sub: [
      { type: 'hire-us', label: 'Hitta konstnär', slug: '/anlita-oss/hitta-konstnar' },
      { type: 'hire-us', label: 'Rådgivning', slug: '/anlita-oss/radgivning' },
      { type: 'hire-us', label: 'Uppdragsgivare', slug: '/anlita-oss/uppdragsgivare' },
      { type: 'hire-us', label: 'Offentlig konst', slug: '/anlita-oss/offentlig-konst' }
    ]
  },
  {
    type: 'konstnar', label: 'För artister', sub: [
      { type: 'konstnar', label: 'Bli medlem', slug: '/konstnar/bli-medlem' },
      { type: 'konstnar', label: 'Logga in', slug: '/konstnar/logga-in' },
      { type: 'konstnar', label: 'Aktuellt', slug: '/konstnar/aktuellt' },
      { type: 'konstnar', label: 'Arbeta med oss', slug: '/konstnar/arbeta-med--oss' }
    ]
  },
  {
    type: 'initiatives', label: 'Våra initiativ', sub: [
      { type: 'initiatives', label: 'Konstdepartementet', slug: '/initiativ/konstdepartementet' },
      { type: 'initiatives', label: 'Galleri KC', slug: '/initiativ/galleri-kc' },
      { type: 'initiatives', label: 'BRAK', slug: '/initiativ/brak' },
      { type: 'initiatives', label: 'X - sites', slug: '/initiativ/x-sites' },
      { type: 'initiatives', label: 'Plattform Syd', slug: '/initiativ/plattform-syd' }
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

  //const { allDesigners, allProductCategories, allProducts } = await apiQuery(MenuDocument, {});

  const menu = base.map(item => {
    let sub: MenuItem[];
    switch (item.type) {
      case 'news':
        sub = []
        break;
      default:
        break;
    }
    return { ...item, sub: sub ? sub : item.sub }
  })

  return menu
}
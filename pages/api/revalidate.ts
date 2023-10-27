import { withRevalidate } from 'dato-nextjs-utils/hoc'
import { regions } from '/lib/region'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey } = record.model;
  const { slug, region: regionId } = record
  const region = regions.find(({ id }) => regionId === id)
  const paths = []

  switch (apiKey) {
    case 'region':
      if (regions.find(r => r.slug === slug && r.global))
        paths.push(`/`)
      else
        paths.push(`/${slug}`)
      break;
    case 'about':
      paths.push(`/om/${slug}`)
      break;
    case 'commission':
      paths.push(`/anlita-oss/uppdrag/${slug}`)
      break;
    case 'commission_category':
      paths.push(`/anlita-oss/uppdrag`)
      break;
    case 'consult':
      paths.push(`/anlita-oss/${slug}`)
      break;
    case 'apply':
      paths.push(`/konstnar/bli-medlem`)
      break;
    case 'member_news':
      paths.push(`/konstnar/aktuellt/${slug}`)
      paths.push(`/${region.slug}/konstnar/aktuellt/${slug}`)
      break;
    case 'project':
      paths.push(`/vara-initiativ`)
      break;
    case 'news':
      paths.push(`/nyheter/${slug}`)
      paths.push(`/${region.slug}/nyheter/${slug}`)
      break;
    case 'employee':
      paths.push(`/kontakt/konstkonsulter`)
      paths.push.apply(paths, regionalPaths(`/kontakt/personal`))
      paths.push.apply(paths, regionalPaths(`/kontakt/styrelse`))
      break;
    case 'press':
      paths.push(`/about/press`)
      break;
    case 'member':
      paths.push(`/anlita-oss/hitta-konstnar/${slug}`)
      paths.push(`/anlita-oss/hitta-konstnar`)
      break;
    case 'member_category':
      paths.push.apply(paths, regionalPaths(`/anlita-oss/hitta-konstnar`))
      break;
    case 'member_news_category':
      paths.push.apply(paths, regionalPaths(`/konstnar/aktuellt`))
      break;
    case 'members_list':
      paths.push.apply(paths, regionalPaths(`/for-konstnarer/medlemmar`))
      break;
    case 'contact_intro':
      paths.push(`/kontakt/personal`)
      paths.push(`/kontakt/konstkonsulter`)
      paths.push(`/kontakt/styrelse`)
      break;
    case 'employee':
      paths.push(`/kontakt/personal`)
      break;
    case 'board':
      paths.push(`/kontakt/styrelse`)
      break;
    case 'consultant':
      paths.push(`/kontakt/konstkonsulter`)
      break;
    case 'application':
      break;
    case 'consultant':
      break;
    case 'for_artist':
      paths.push(`/for-konstnarer/${slug}`)
      break;
    case 'in_english':
      paths.push(`/english`)
      break;
    case 'intro_initiative':
      paths.push.apply(paths, regionalPaths(`/vara-initiativ`))
      break;
    case 'footer':
      paths.push(`/`)
      break;
    default:
      break;
  }

  revalidate(paths)
})

const regionalPaths = (path: string, slug?: string): string[] => {
  return regions.map(r => `${r.global ? '' : `/${r.slug}`}${path}${slug ? `/${slug}` : ''}`)
}
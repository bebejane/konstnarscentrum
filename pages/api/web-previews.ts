import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';

export const config = {
  runtime: 'edge'
}

export default withWebPreviewsEdge(async ({ item, itemType }) => {

  const { slug, global } = item.attributes

  let path = null;

  switch (itemType.attributes.api_key) {
    case 'region':
      path = global ? `/` : `/${slug}`
      break;
    case 'about':
      path = `/om/${slug}`
      break;
    case 'in_english':
      path = `/english`
      break;
    case 'consult':
      path = `/anlita-oss/${slug}`
      break;
    case 'commission':
      path = `/anlita-oss/uppdrag/${slug}`
      break;
    case 'for_artist':
      path = `/for-konstnarer/${slug}`
      break;
    case 'members_list':
      path = `/for-konstnarer/medlemmar`
      break;
    case 'apply':
      path = `/konstnar/bli-medlem`
      break;
    case 'news':
      path = `/konstnar/aktuellt/${slug}`
      break;
    case 'member_news_category':
      path = `/konstnar/aktuellt`
      break;
    case 'project':
      path = `/vara-initiativ`
      break;
    case 'project': case 'intro_initiative':
      path = `/vara-initiativ`
      break;
    case 'news':
      path = `/nyheter/${slug}`
      break;
    case 'member':
      path = `/anlita-oss/hitta-konstnar/${slug}`
      break
    case 'member_category':
      path = `/anlita-oss/hitta-konstnar`
      break;
    case 'member_news':
      path = `/konstnar/aktuellt/${slug}`
      break;
    case 'footer':
      path = `/`
      break;
    case 'contact_intro':
      path = `/kontakt/styrelse`
      break;
    case 'employee':
      path = `/kontakt/personal`
      break;
    case 'board':
      path = `/kontakt/styrelse`
      break;
    case 'consultant':
      path = `/kontakt/konstkonsulter`
      break;
    default:
      break;
  }

  return path
})
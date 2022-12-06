export { default, getStaticProps } from '/pages/anlita-oss/uppdrag/[commission]'
import { getStaticPagePaths } from '/lib/utils'
import { AllCommissionsDocument } from '/graphql'

export async function getStaticPaths() {
  return getStaticPagePaths(AllCommissionsDocument, 'commission', true)
}

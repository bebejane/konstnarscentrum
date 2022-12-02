export { default, getStaticProps } from '/pages/konstnar/aktuellt/[memberNews]'
import { getStaticPagePaths } from '/lib/utils'
import { AllMemberNewsDocument } from '/graphql'

export async function getStaticPaths() {
  return getStaticPagePaths(AllMemberNewsDocument, 'memberNews', true)
}

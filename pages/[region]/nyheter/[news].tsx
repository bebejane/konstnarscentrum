export { default, getStaticProps } from '/pages/nyheter/[news]'
import { getStaticPagePaths } from '/lib/utils'
import { AllNewsDocument } from '/graphql'

export async function getStaticPaths() {
  return getStaticPagePaths(AllNewsDocument, 'news', true)
}

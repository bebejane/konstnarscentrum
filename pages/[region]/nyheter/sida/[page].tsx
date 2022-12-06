import { getStaticPaginationPaths } from '/lib/utils'
import { AllNewsDocument } from '/graphql'
export { default, getStaticProps } from '/pages/nyheter/sida/[page]'

export const getStaticPaths = () => {
  return getStaticPaginationPaths(AllNewsDocument, 'news', true)
}
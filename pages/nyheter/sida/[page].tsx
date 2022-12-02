import { getStaticPaginationPaths } from '/lib/utils'
import { AllNewsDocument } from '/graphql'
export { default, getStaticProps } from '../'

export const getStaticPaths = () => {
  return getStaticPaginationPaths(AllNewsDocument, 'news')
}
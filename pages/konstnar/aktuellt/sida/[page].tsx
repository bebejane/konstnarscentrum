import { getStaticPaginationPaths } from '/lib/utils'
import { AllMemberNewsDocument } from "/graphql";
export { default, getStaticProps } from '../'

export const getStaticPaths = () => {
  return getStaticPaginationPaths(AllMemberNewsDocument, 'memberNews')
}
import { getStaticPaginationPaths } from '/lib/utils'
import { AllMemberNewsDocument } from '/graphql'
export { default, getStaticProps } from '/pages/nyheter/sida/[page]'

export const getStaticPaths = () => {
  return getStaticPaginationPaths(AllMemberNewsDocument, 'nmemberNews', true)
}
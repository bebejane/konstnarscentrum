import { apiQuery } from "dato-nextjs-utils/api";
import { AllMemberNewsDocument } from "/graphql";
import { regions } from "/lib/region";
import { chunkArray, pageSize } from "/lib/utils";

export { default, getStaticProps } from '../'

export async function getStaticPaths(context) {

  const paths = []
  const posts = []

  for (let page = 0, count; posts.length < count || page === 0; page++) {
    const { memberNews, pagination } = await apiQuery(AllMemberNewsDocument, { variables: { first: 100, skip: (page * 100) } })
    posts.push.apply(posts, memberNews);
    count = pagination.count;

  }

  const pages = chunkArray(posts, pageSize)
  pages.forEach(({ news }, idx) => {
    paths.push({ params: { region: '', page: `${idx + 1}` } })
  })

  regions.forEach((region) => {
    const pages = chunkArray(posts.filter(p => p.region.id === region.id), pageSize)
    const slugs = pages.map((p, idx) => ({ params: { region: region.slug, page: `${idx + 1}` } }))
    paths.push.apply(paths, slugs)
  })

  return {
    paths,
    fallback: false,
  };
}
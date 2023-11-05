import { regions } from "/lib/region";
export { default, getStaticProps } from '/pages'

export async function getStaticPaths() {

  const paths = regions.map(({ slug }) => ({ params: { region: slug } }))

  return {
    paths,
    fallback: 'blocking',
  };
}

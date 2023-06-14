import { regions } from "/lib/region";
export { default, getStaticProps } from '/pages/kontakt/personal'

export async function getStaticPaths(context) {

  const paths = regions.map(({ slug }) => ({ params: { region: slug } }))

  return {
    paths,
    fallback: 'blocking',
  };
}

import regions from '/regions.json'
import { capitalize } from "/lib/utils";

export const apiTokenByRegion = (slug: string) => !slug ? undefined : process.env[`GRAPHQL_API_TOKEN_${slug.toUpperCase()}`]

export const propByRegion = (res, region, prop) => res[`${prop}${capitalize(region)}`] || null

export { regions }
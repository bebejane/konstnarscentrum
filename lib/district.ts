import districts from '/districts.json'
import { capitalize } from "lodash-es";

export const apiTokenByDistrict = (id: string) => process.env[`GRAPHQL_API_TOKEN_${id.toUpperCase()}`]

export const propByDistrict = (res, district, prop) => res[`${prop}${capitalize(district)}`] || null

export { districts }
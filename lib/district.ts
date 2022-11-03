import districts from '/districts.json'
import { capitalize } from "lodash-es";

export const accessToken = (id : string) => {
  const district = districts.filter(({slug}) => slug === id)[0]
  return district.token.token
}

export const propByDistrict = (res, district, prop) => res[`${prop}${capitalize(district)}`] || null

export { districts }
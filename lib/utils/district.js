import districts from '/districts.json'

const accessToken = (id) => {
  const district = districts.filter(({slug}) => slug === id)[0]
  return district.token.token
}

export { districts, accessToken }
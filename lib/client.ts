import { buildClient } from '@datocms/cma-client'

const client = buildClient({apiToken:process.env.gql_API_TOKEN})

export default client;
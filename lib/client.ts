import { buildClient } from '@datocms/cma-client'
const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL })
export default client;
export { buildClient }
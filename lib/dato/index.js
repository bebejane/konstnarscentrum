import { GRAPHQL_API_ENDPOINT, GRAPHQL_PREVIEW_API_ENDPOINT, GRAPHQL_API_TOKEN } from "/lib/utils/constant";
import { GraphQLClient } from 'graphql-request'
import { SiteClient as DatoClient } from 'datocms-client';

// REST API
const Dato = new DatoClient(process.env.GRAPHQL_API_TOKEN);
/*
Dato.role = function(token){
  console.log(this.token)
  this.token = token;
  console.log('set token', token)
  return this
}
*/

const createRoleClient = async (roleId) => {
  const accessTokens = await Dato.accessTokens.all()
  const token = accessTokens.filter((t) => t.role === roleId )[0].token
  const RoleClient = new DatoClient(token);
  return RoleClient
}

// GRAPHQL API
const client = new GraphQLClient(GRAPHQL_API_ENDPOINT, {headers: {authorization: 'Bearer ' + GRAPHQL_API_TOKEN}})
const previewClient = new GraphQLClient(GRAPHQL_PREVIEW_API_ENDPOINT, {headers: {authorization: 'Bearer ' + GRAPHQL_API_TOKEN}})

const apiQuery = async (query, params, preview) => {
  const data =  preview === true ? await previewClient.request(query, params) : await client.request(query, params)
  return data;
}
const apiQueries = async (...args) => {
  const data = await Promise.all(args.map(q=>client.request(typeof q === 'string' ? q : q.q, typeof q === 'string' ? {} : q.p)))
  let obj = {}
  data.forEach( o => obj = {...obj, ...o})
  return obj
}

const datoError = (err) => {
  const errors =  err.body ? err.body.data : []
  const message = errors.length ? errors[0] : err
  const error = {
    type:'dato',
    errors,
    message
  }
  
  console.log(error)
  return error
}

export default Dato;

export { 
  DatoClient,
  createRoleClient,
  apiQuery,
  apiQueries,
  datoError
}

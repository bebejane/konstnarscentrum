console.log('generate districts.json')
const env = require('dotenv').config({path:'./.env.local'})
const fs = require("fs")
const slugify = require('slugify')
const { buildClient } = require('@datocms/cma-client-node')

const prebuild = async () => {
  
  const client  = buildClient({apiToken:process.env.GRAPHQL_API_TOKEN});
  const roles = await client.roles.list()
  const editor = roles.filter(r => r.name.toLowerCase() === 'editor')[0] 
  const districts = roles
    .filter(r => r.inherits_permissions_from?.find(({id}) => id === editor.id))
    .sort((a, b) => a.name < b.name ? -1 : 1)
    .map(({id, name}) => ({id, name, slug:slugify(name, {lower:true})}))
  
  fs.writeFileSync('districts.json', JSON.stringify(districts, null, 2))
  console.log('done!', districts.length)
}

prebuild()
require('dotenv').config({path:'./.env.local'})
const fs = require("fs")
const { SiteClient } = require('datocms-client');
const Dato = new SiteClient(process.env.GRAPHQL_API_TOKEN);

( async ()=>{
  console.log('generate ./districts.json')
  const roles = (await Dato.roles.all()).filter(r => r.environmentsAccess !== 'all' && r.name.toLowerCase().includes('distrikt'))
  fs.writeFileSync('districts.json', JSON.stringify(roles.map(({id, name}) => ({id, name}))))
})()
require('dotenv').config({path:'./.env.local'})
const fs = require("fs")
const {SiteClient} = require('datocms-client');
const Dato = new SiteClient(process.env.GRAPHQL_API_TOKEN);

(async ()=>{
  console.log('generate ./roles.json')
  const roles = (await Dato.roles.all()).filter(r => r.environmentsAccess !== 'all')
  fs.writeFileSync('roles.json', JSON.stringify(roles))
})()
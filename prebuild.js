require('dotenv').config({path:'./.env.local'})
const fs = require("fs")
const slugify = require('slugify')
const { SiteClient } = require('datocms-client');

const Dato = new SiteClient(process.env.GRAPHQL_API_TOKEN);

(async ()=>{
  console.log('> generate districts.json')
  const roles = await Dato.roles.all() 
  const editor = roles.filter(r => r.name.toLowerCase() === 'editor')[0]
  const districts = roles.filter(r => r.inheritsPermissionsFrom && r.inheritsPermissionsFrom.includes(editor.id)).sort((a, b) => a.name < b.name ? -1 : 1)
  const data = JSON.stringify(districts.map(({id, name}) => ({id, name, slug:slugify(name, {lower:true})})))
  fs.writeFileSync('districts.json', data)
})()
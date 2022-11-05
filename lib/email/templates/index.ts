import fs from 'fs';
import mjml2html from 'mjml'

const basePath = `${process.cwd()}/lib/email/templates/`

export const interpolateTemplate = async (template: string, params:any) => {
  // Load template.
  const templateFile = `${basePath}/${template}.mjml`;
  const paramsFile = `${basePath}/${template}.json`;
  const tpl = fs.readFileSync(templateFile, {encoding:'utf-8'})
  params = !params && fs.existsSync(paramsFile) ? JSON.parse(fs.readFileSync(paramsFile, {encoding:'utf-8'})) : params
  
  // Render.
  let html = mjml2html(tpl).html

  // Interpolate variables.
  for (const prop in params)
    html = html.replaceAll(`{{ ${prop} }}`, params[prop]).replaceAll(`{{${prop}}}`, params[prop])

  return html
}

export { default as resetPassword } from './reset-password'
import { promises as fs } from 'fs';
import mjml2html from 'mjml'

export { default as resetPassword } from './reset-password'

export const interpolateTemplate = async (template: string, params:any) => {
  // Load template.
  const tpl = await fs.readFile(`${process.cwd()}/lib/email/templates/${template}.mjml`, {encoding:'utf-8'})

  // Render.
  let html = mjml2html(tpl).html

  // Interpolate variables.
  for (const prop in params) {
    html = html.replaceAll(`{{ ${prop} }}`, params[prop]).replaceAll(`{{${prop}}}`, params[prop])
  }

  return html
}
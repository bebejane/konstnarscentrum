
import * as dotenv from 'dotenv'
dotenv.config({ path: "./.env" });

import { buildClient } from '@datocms/cma-client'
import regions from '../../regions.json';
import slugify from 'slugify'
import ExcelJS from 'exceljs';
import fs from 'fs';
import jwt from 'jsonwebtoken'

import { Email } from '../emails'

const excelFile = `${process.cwd()}/KOMPLETT MEDLEMSLISTA (KC JANUARI 2023)-2.xlsx`;
//const excelFile = `${process.cwd()}/medlemslista-test.xlsx`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const workbook = new ExcelJS.Workbook();
const allMembers = [];
const errors = [];

const environment = "main";
const mainclient = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL as string, environment });


const generateToken = async (email: string): Promise<any> => {
  return jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: 12000 });
}
process.exit(0)
console.time("import");

workbook.xlsx.readFile(excelFile).then((doc) => {
  doc.eachSheet(function (worksheet, sheetId) {
    worksheet.eachRow((row, idx) => {
      if (idx > 1) {
        const regionSlug = worksheet.name
          .toLowerCase()
          .replace("ö", "o")
          .replace("å", "a")
          .replace("ä", "a");

        const member = {
          first_name: row.getCell(1).value?.trim(),
          last_name: row.getCell(2).value?.trim(),
          full_name: `${row.getCell(1).value?.trim()} ${row.getCell(2).value?.trim()}`,
          email:
            typeof row.getCell(3) === "object"
              ? row.getCell(3).text.trim()
              : row.getCell(3).value.trim(),
          slug: slugify(`${row.getCell(1).value} ${row.getCell(2).value}`, {
            lower: true,
            strict: true,
          }),
          region: regions.find((el) => el.slug === regionSlug),
        };
        if (
          !member.email ||
          !member.region ||
          !member.first_name ||
          !member.last_name ||
          !member.slug
        ) {
          errors.push(member);
        } else allMembers.push(member);
      }
    });
    if (doc.worksheets.length === sheetId) importMembers();
  });
});

async function importMembers() {

  let currentMembers = JSON.parse(fs.readFileSync('./current.json', { encoding: 'utf-8' }))
  const failed = []
  for (let x = 0; x < currentMembers.length; x++) {
    const m = currentMembers[x]
    m.region = regions.find(el => el.id === m.region)
    const apiToken = process.env[`GRAPHQL_API_TOKEN_${m.region.slug.toUpperCase()}`];
    const client = buildClient({ apiToken, environment });
    const member = {
      item_type: { type: "item_type", id: "1185543" },
      resettoken: await generateToken(m.email)
    };

    try {
      console.log('update member', m.id, apiToken, m.full_name, m.email, `https://www.konstnarscentrum.org/konstnar/konto/inbjudan?token=${member.resettoken}`)

      await client.items.update(m.id, { resettoken: member.resettoken })

      await Email.memberInvitation({
        email: m.email,
        name: `${m.full_name}`,
        link: `https://www.konstnarscentrum.org/konstnar/konto/inbjudan?token=${member.resettoken}`
      })



    } catch (err) {
      console.log('FAILED', m.email)
      console.log(err)
      failed.push(m)
      fs.writeFileSync("./failed-old.json", JSON.stringify(failed, null, 2));
    }
  }
}

import * as dotenv from 'dotenv'
dotenv.config({ path: "./.env" });

import { buildClient } from '@datocms/cma-client'
import regions from '../../regions.json';
import slugify from 'slugify'
import ExcelJS from 'exceljs';

import { Email } from '../emails'

const excelFile = `${process.cwd()}/KOMPLETT MEDLEMSLISTA (KC JANUARI 2023)-2.xlsx`;
//const excelFile = `${process.cwd()}/medlemslista-test.xlsx`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const workbook = new ExcelJS.Workbook();

const errors = [];

const environment = "dev";
const mainclient = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL as string, environment });

async function updateMembers() {

  const uploads = []

  for await (const record of mainclient.uploads.listPagedIterator({ filter: { tags: { contains: 'upload' } }, nested: 'true', page: { limit: 100 } })) {
    uploads.push(record);
  }

  uploads.forEach(u => console.log(u))
  console.log('uploads', uploads.length)
  process.exit(0);
}
updateMembers()
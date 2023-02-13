
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

const errors = [];

const environment = "main";
const mainclient = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL as string, environment });

async function updateMembers() {

  let currentMembers = []; //await mainclient.items.list({ filter: { type: "member" } });
  console.log("get current members...");
  for await (const record of mainclient.items.listPagedIterator({ filter: { type: "member" }, page: { limit: 100 } })) {
    currentMembers.push(record);
  }

  const r = {};
  let insertCount = 0;
  console.log(
    `Updating ${insertCount} members (${currentMembers.length}), ${Object.keys(r).length
    } regions...`
  );

  console.log(currentMembers.length)

  for (let i = 0; i < currentMembers.length; i++) {

    const member = currentMembers[i]
    const region = regions.find(el => el.id === member.region)
    const apiToken = process.env[`GRAPHQL_API_TOKEN_${region.slug.toUpperCase()}`];
    const client = buildClient({ apiToken, environment });
    console.log(`${i}/${currentMembers.length}`, member.first_name, member.last_name, member.email)

    try {

      await client.items.update(member.id, {
        creator: { type: 'user', id: region.userId }
      })

    } catch (err) {
      console.error(err)

    }
  }


  console.timeEnd("import");
  process.exit(0);
}
updateMembers()
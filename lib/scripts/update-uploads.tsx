
import * as dotenv from 'dotenv'
dotenv.config({ path: "./.env" });

import { buildClient } from '@datocms/cma-client'
import regions from '../../regions.json';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const errors = [];

const environment = "main";
const mainclient = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL as string, environment });

const chunkArray = (array: any[] | React.ReactNode[], chunkSize: number) => {
  const newArr = []
  for (let i = 0; i < array.length; i += chunkSize)
    newArr.push(array.slice(i, i + chunkSize));
  return newArr
}

async function updateMembers() {
  console.time('update')
  const uploads = []

  for await (const record of mainclient.uploads.listPagedIterator({ filter: { tags: { contains: 'upload' } }, nested: 'true', page: { limit: 100 } })) {
    uploads.push(record);
  }

  const userUploads = uploads.filter(el => el.tags.includes('upload'))
  let reqs = []
  let count = 0

  for (let i = 0; i < userUploads.length; i++) {

    const u = userUploads[i];
    const region = regions.find(el => u.tags.includes(el.name.toLowerCase()))
    reqs.push(mainclient.uploads.update(u.id, { creator: { type: 'user', id: region.userId } }))

    if (reqs.length === 10 || i + 1 === userUploads.length) {
      await Promise.all(reqs)
      count += reqs.length
      reqs = []
      console.log(count, userUploads.length)
    }
  }

  const chunks = chunkArray(reqs, 10)

  for (let i = 0; i < chunks.length; i++) {
    const r = chunks[i];

    await Promise.allSettled(r)


  }

  console.log('uploads', userUploads.length)
  console.timeEnd('update')
  process.exit(0);
}
updateMembers()
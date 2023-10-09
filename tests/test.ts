import * as dotenv from "dotenv";
import { buildClient } from "@datocms/cma-client-node";
import { validatePassword } from "/lib/auth";
dotenv.config({ path: "./.env" });
console.time('dur');
/*
(async () => {
	const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL });
	const models = await client.itemTypes.list();
	const tokens = await client.accessTokens.list();
	const applicationModelId = models.find((el) => el.api_key === "application").id;
	console.log(applicationModelId);
	console.timeEnd('dur');
})();
*/


console.log(validatePassword('BFw@&+2bHqcx]8v'))







const dotenv = require("dotenv");
const { buildClient } = require("@datocms/cma-client-node");
dotenv.config({ path: "./.env" });

(async () => {
	const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL });
	const models = await client.itemTypes.list();
	const tokens = await client.accessTokens.list();
	const applicationModelId = models.find((el) => el.api_key === "application").id;
	console.log(applicationModelId);
})();

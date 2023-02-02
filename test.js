require("dotenv").config({ path: "./.env" });
const { buildClient } = require("@datocms/cma-client-node");

(async () => {
	const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL });
	const models = await client.itemTypes.list();
	const tokens = await client.accessTokens.list();
	//console.log(models);
	console.log(tokens);
	const applicationModelId = models.find((el) => el.api_key === "application").id;
	console.log(applicationModelId);
})();

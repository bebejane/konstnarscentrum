const env = require("dotenv").config({ path: "./.env" });
const fs = require("fs");
const slugify = require("slugify");
const { buildClient } = require("@datocms/cma-client-node");

const prebuild = async () => {
	console.log("generate regions.json");
	const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN });
	const roles = await client.roles.list();
	const tokens = await client.accessTokens.list();
	const editor = roles.filter((r) => r.name.toLowerCase() === "editor")[0];
	const regions = roles
		.filter((r) => r.inherits_permissions_from?.find(({ id }) => id === editor.id))
		.sort((a, b) => (a.name < b.name ? -1 : 1))
		.map(({ id, name }) => ({
			id,
			tokenId: tokens.find((t) => t.role?.id === id)?.id,
			name,
			slug: slugify(name, { lower: true }),
		}));

	if (!regions.length) throw new Error("No regions found!");

	fs.writeFileSync("regions.json", JSON.stringify(regions, null, 2));
	console.log("done!", regions.length);
};

prebuild();

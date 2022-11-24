const env = require("dotenv").config({ path: "./.env" });
const fs = require("fs");
const slugify = require("slugify");
const { buildClient } = require("@datocms/cma-client-node");

(async () => {
	console.log("generate regions.json");
	const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN });

	const roles = await client.roles.list();
	const editor = roles.filter((r) => r.name.toLowerCase() === "editor")[0];
	const tokens = await client.accessTokens.list();
	const districts = await client.items.list({
		filter: {
			type: "region",
		},
	});

	const regions = roles
		.filter((r) => r.inherits_permissions_from?.find(({ id }) => id === editor.id))
		.sort((a, b) => (a.name < b.name ? -1 : 1))
		.map(({ id: roleId, name }) => ({
			id: districts.find((el) => el.slug === slugify(name, { lower: true })).id,
			roleId,
			tokenId: tokens.find((t) => t.role?.id === roleId)?.id,
			name,
			slug: slugify(name, { lower: true }),
		}));

	if (!regions.length) throw new Error("No regions found!");

	fs.writeFileSync("regions.json", JSON.stringify(regions, null, 2));
	console.log("done!", regions.length);
})();

/*
const prebuildOld = async () => {
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
*/

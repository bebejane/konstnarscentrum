const excelFile = `${process.cwd()}/lib/scripts//KOMPLETT MEDLEMSLISTA (KC JANUARI 2023).xlsx`;
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const fs = require("fs");

const members = [];
const errors = [];

function done() {
	members.forEach((member) =>
		console.log(member.region, member.firstName, member.lastName, member.email)
	);
}

workbook.xlsx.readFile(excelFile).then((doc) => {
	doc.eachSheet(function (worksheet, sheetId) {
		worksheet.eachRow((row, idx) => {
			if (idx > 1) {
				const member = {
					region: worksheet.name
						.toLowerCase()
						.replace("ö", "o")
						.replace("å", "a")
						.replace("ä", "a"),
					firstName: row.getCell(1).value,
					lastName: row.getCell(2).value,
					email: row.getCell(3).value,
				};
				if (!member.email || !member.region || !member.firstName || !member.lastName) {
					errors.push(member);
				} else members.push(member);
			}
		});
		if (doc.worksheets.length === sheetId) done();
	});
});

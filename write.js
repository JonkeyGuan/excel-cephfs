var exceljs = require('exceljs');

let data = [
	["zhangsan1", 30],
	["lisi1", 31],
	["wangwu1", 32],
	["zhaoliu1", 33],
	["sunqi1", 34],
]

const DATA_LOC = process.env.DATA_LOC || './';

exports.writeXsl = async function (fileName, repeat) {
	var workbook = new exceljs.Workbook();
	var sheet = workbook.addWorksheet('My Sheet');

	for (let i = 0; i < repeat; i++) {
		sheet.addRows(data);
	}

	await workbook.xlsx.writeFile(DATA_LOC + "/" + fileName + ".xlsx")
    .then(function() {
        console.log("write done: " + fileName);
    });
}

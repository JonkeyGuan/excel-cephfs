const xlsx = require('xlsx');

let jsonData = [{
	key: "zhangsan1",
	value: 30
}, {
	key: "lisi1",
	value: 31
}, {
	key: "wangwu1",
	value: 32
}, {
	key: "zhaoliu1",
	value: 33
}, {
	key: "sunqi1",
	value: 34,
}];

const DATA_LOC = process.env.DATA_LOC || './';

exports.writeXsl = function (fileName, repeat) {
	let json = [];
	for (let i = 0; i < repeat; i++) {
		json = json.concat(jsonData)
	}
	let jsonWorkSheet = xlsx.utils.json_to_sheet(json);

	let workBook = {
		SheetNames: ['jsonWorkSheet'],
		Sheets: {
			'jsonWorkSheet': jsonWorkSheet,
		}
	};
	xlsx.writeFile(workBook, DATA_LOC + "/" + fileName + ".xlsx");
	console.log("write done: " + fileName);
}

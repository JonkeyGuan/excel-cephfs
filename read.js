const xlsx = require('xlsx');

const DATA_LOC = process.env.DATA_LOC || './';

exports.readXsl = function (fileName) {
    let workbook = xlsx.readFile(DATA_LOC + "/" + fileName + ".xlsx");
    let sheetNames = workbook.SheetNames;
    let sheet1 = workbook.Sheets[sheetNames[0]];

    let range = xlsx.utils.decode_range(sheet1['!ref']);

    let value = "";
    for (let R = range.s.r; R <= range.e.r; ++R) {
        let row_value = '';
        for (let C = range.s.c; C <= range.e.c; ++C) {
            let cell_address = { c: C, r: R };
            let cell = xlsx.utils.encode_cell(cell_address);
            if (sheet1[cell]) {
                row_value += sheet1[cell].v + ", ";
            } else {
                row_value += ", ";
            }
        }
        value = value + row_value;
    }
    console.log("read done: " + fileName);
    return value;
}
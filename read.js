var exceljs = require('exceljs');

const DATA_LOC = process.env.DATA_LOC || './';

exports.readXsl = async function (fileName) {
    var workbook = new exceljs.Workbook();

    let value = ""
    await workbook.xlsx.readFile(DATA_LOC + "/" + fileName + ".xlsx").then(function () {
        var worksheet = workbook.getWorksheet(1);
        worksheet.eachRow(function (row, rowNumber) {
            let row_value = '';
            var rowSize = row.cellCount;
            var numValues = row.actualCellCount;
            row.eachCell(function (cell, colNumber) {
                if (cell.type == 6) {
                    var value = cell.result;
                } else {
                    var value = cell.value;
                }
                row_value += value + ", "
            });
            value += row_value;
        });

    });

    console.log("read done: " + fileName);
    return value;
}

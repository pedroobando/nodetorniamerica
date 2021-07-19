const XLSX = require('xlsx');

const readExcel = (xlsfilename) => {
  const workbook = XLSX.readFile(xlsfilename);
  const sheet_name_list = workbook.SheetNames;
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
};

module.exports = { readExcel };

import * as XLSX from 'xlsx';

export const downloadExcel = ({ data, filename }: { data: unknown[][], filename: string }) => {
  /* generate worksheet */
  try {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    console.log("Hola")
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `${filename}.xlsx`);
  } catch (e) {
    console.log(e);
  }

};

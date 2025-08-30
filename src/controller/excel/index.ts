import ExcelJS from "exceljs";
import path from "path";
import { Request, Response } from "express";

const EXCEL_PATH = "utils/doc_tarif_07082025.xlsx";

export const parseExcel = async (_req: Request, res: Response) => {
  const excelFilePath = path.join(process.cwd(), EXCEL_PATH); // process.cwd() = racine projet

  const workbook = new ExcelJS.Workbook();
  const worksheet = (await workbook.xlsx.readFile(excelFilePath)).getWorksheet(
    1
  );

  if (worksheet) {
    const parsed: Record<string, string>[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      parsed.push({
        un: row.getCell(1).text ?? null,
        deux: row.getCell(2).text ?? null,
        trois: row.getCell(3).text ?? null,
        quatre: row.getCell(4).text ?? null,
        cinq: row.getCell(5).text ?? null,
        six: row.getCell(6).text ?? null,
      });
    });

    res.status(200).json(parsed);
  } else {
    res.status(500).json({ error: "Can't found the excel file" });
  }
};

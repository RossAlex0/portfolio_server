import ExcelJS from "exceljs";
import path from "path";
import { Request, Response } from "express";

const EXCEL_PATH = "utils/doc_tarif_07082025.xlsx";

export const parseExcel = async (_req: Request, res: Response) => {
  const excelFilePath = path.join(process.cwd(), EXCEL_PATH);

  const workbook = new ExcelJS.Workbook();
  const worksheet = (await workbook.xlsx.readFile(excelFilePath)).getWorksheet(
    1
  );

  if (worksheet) {
    const parsed: Record<string, string | Record<string, string>>[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const rawPack = row.getCell(3).text ?? "";

      const packType = rawPack.replace(/\d/g, "") ?? null;

      const packCount = rawPack.replace(/\D/g, "") ?? null;

      parsed.push({
        name: row.getCell(1).text ?? null,
        year: row.getCell(2).text ?? null,
        pack_bottle: {
          type: packType,
          count: packCount,
        },
        volume: row.getCell(4).text ?? null,
        stock: row.getCell(5).text ?? null,
        price: row.getCell(6).text ?? null,
      });
    });

    res.status(200).json(parsed);
  } else {
    res.status(500);
  }
};

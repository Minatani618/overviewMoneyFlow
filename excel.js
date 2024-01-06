const fs = require("fs");
const ExcelJS = require("exceljs");

// CSVファイルからデータを読み込む部分
const csvData = []; // 仮のCSVデータ

// ここでCSVファイルからデータを取得するコードを書く

// 例としてダミーデータを設定
csvData.push(["Name", "Age"]);
csvData.push(["John Doe", 30]);
csvData.push(["Jane Smith", 25]);

// 新しいExcelブックを作成
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("CSV Data");

// CSVデータをExcelワークシートに書き込む
csvData.forEach((row) => {
  console.log(row);
  worksheet.addRow(row);
});

// Excelファイルを保存
workbook.xlsx
  .writeFile("output.xlsx")
  .then(() => {
    console.log("Excelファイルが作成されました: output.xlsx");
  })
  .catch((err) => {
    console.error("エラーが発生しました:", err);
  });

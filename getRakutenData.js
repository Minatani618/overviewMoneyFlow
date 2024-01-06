const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const ExcelJS = require("exceljs");

const main = async () => {
  /* ////////////////////////////////////////////////// */
  //テスト用　対象とする年月をここに記入する
  const targetYear = 2023;
  const targetMonth = 12;
  /* ////////////////////////////////////////////////// */

  const moneyDataPath = path.join(__dirname, "moneyData");
  const rakutenPath = path.join(moneyDataPath, "rakutenCard");

  const files = fs.readdirSync(rakutenPath);
  let csvName = "";
  let yyyymm;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    //csvファイルは　enaviyyyymm(5124).csv　という形式になっているため
    //真ん中のyyyymmを抜き出す
    yyyymm = filename.split("enavi")[1].split("(5124).csv")[0];
    const yyyy = yyyymm.slice(0, 4);
    const mm = yyyymm.slice(4, 6);

    //指定した期間に合致するものならファイル名を取得して抜ける
    if (targetYear == yyyy && targetMonth == mm) {
      csvName = filename;
      break;
    }
  }
  const csvPath = path.join(rakutenPath, csvName);
  const csvObjArr = await getCsvContent(csvPath);
  console.log(__dirname + "\\overViewMoneyFlow.xlsm");
  createExcel(csvObjArr, __dirname + "\\output.xlsx", yyyymm);
  /* createExcel(csvObjArr, __dirname + "\\overViewMoneyFlow.xlsm", yyyymm); */
};

/* csvファイルをオブジェクト配列にとる */
const getCsvContent = (csvPath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    //対象のcsvファイルの中身を出力する
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
};

/* csvデータからエクセルを生成 */
const createExcel = (csvData, wb, yyyymm) => {
  // Excelブックを作成
  const workbook = new ExcelJS.Workbook();
  console.log(`neko ${wb}`);
  workbook.xlsx
    .readFile(wb)
    .then(() => {
      const worksheet = workbook.addWorksheet(yyyymm); // 新しいワークシートを追加

      // データをワークシートに書き込む
      csvData.forEach((row) => {
        worksheet.addRow(row);
      });

      // 変更を保存する
      return workbook.xlsx.writeFile(wb);
    })
    .then(() => {
      console.log("新しいワークシートが既存のExcelファイルに追加されました");
    })
    .catch((err) => {
      console.error("エラーが発生しました:", err);
    });
};

main();

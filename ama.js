const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // headless: falseでブラウザを表示
  const page = await browser.newPage();

  try {
    // Amazonのログインページに移動
    await page.goto("https://www.amazon.com/");

    // ログインボタンをクリック
    await page.click("#nav-link-accountList");

    // ログイン情報を入力してログイン
    await page.type("#ap_email", "あなたのAmazonのメールアドレス");
    await page.click("#continue");
    await page.waitForSelector("#ap_password");
    await page.type("#ap_password", "あなたのAmazonのパスワード");
    await page.click("#signInSubmit");

    // ログイン後のページが表示されるのを待機
    await page.waitForNavigation();

    // ログイン後の処理をここに記述
    // 例: 特定のページに移動したり、何かアクションを実行したりする
  } catch (error) {
    console.error("エラーが発生しました:", error);
  } finally {
    // ブラウザを閉じる
    await browser.close();
  }
})();

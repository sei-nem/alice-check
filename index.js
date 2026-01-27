import main from './main.js';

// 設定
const classNameJson = {
  "注文番号": "rms-status-order-nr",
  "フルネーム": "fullname",
  "注文内容": "rms-span-open-in-new",
};

// 実行
new main('html', classNameJson);
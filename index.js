import Main from './src/Main.js';
import path from 'path';
import process from 'node:process'
import readline from 'readline';

// HTMLフォルダパスとExcelフォルダパスを取得
const htmlFolderArg = './html';
const excelFolderArg = './excel';

// 絶対パスに変換
const htmlFolderPath = path.resolve(htmlFolderArg);
const excelFolderPath = path.resolve(excelFolderArg);

async function run() {
    try {
        // Main をインスタンス化して比較を実行
        await new Main(htmlFolderPath, excelFolderPath);
        console.log('✅ 処理が完了しました。');
    } catch (err) {
        console.error('❌ エラーが発生しました:');
        console.error(err);
    } finally {
        // 処理完了後に一時停止
        waitForInput();
    }
}

function waitForInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\n任意のキーを押してウィンドウを閉じてください...', () => {
        rl.close();
        process.exit(0);
    });
}

run();


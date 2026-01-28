import fs from 'fs';
import path from 'path';

export default class ExcelReader {
    constructor(folderPath) {
        this.targetDir = path.isAbsolute(folderPath) ? folderPath : path.resolve(folderPath);
        
        // SEA環境対応：複数のパスからrecord.txtを探す
        let recordFilePath;
        const possiblePaths = [
            // 通常のNode.js環境（モジュール相対）
            () => {
                try {
                    return path.join(path.dirname(new URL(import.meta.url).pathname), 'record.txt');
                } catch {
                    return null;
                }
            },
            // SEA環境：プロセスのカレントディレクトリ
            () => path.join(process.cwd(), 'src', 'excel', 'record.txt'),
            // SEA環境：EXE実行ディレクトリの親ディレクトリ
            () => path.join(path.dirname(process.execPath), '..', 'src', 'excel', 'record.txt'),
        ];
        
        for (const pathFn of possiblePaths) {
            try {
                const testPath = pathFn();
                if (testPath && fs.existsSync(testPath)) {
                    recordFilePath = testPath;
                    if (process.platform === 'win32' && recordFilePath.startsWith('\\')) {
                        recordFilePath = recordFilePath.substring(1);
                    }
                    break;
                }
            } catch (e) {
                // パスの取得に失敗した場合は次を試す
            }
        }
        
        this.recordFilePath = recordFilePath;
        this.excelFilePath = path.join(this.targetDir, 'excel.txt');
        
        this.init();
    }

    init() {
        try {
            // record.txtを読み込む（ヘッダー情報）
            const headerContent = fs.readFileSync(this.recordFilePath, 'utf8');
            const keys = headerContent.trim().split('\t');

            // excel.txtを読み込み
            const content = fs.readFileSync(this.excelFilePath, 'utf8');
            const lines = content.trim().split('\n');

            const results = [];
            lines.forEach(line => {
                if (!line.trim()) return;
                
                const values = line.split('\t');
                // 最初の要素（行番号）を無視して2番目から処理
                const dataValues = values.slice(1);
                
                const result = {};
                keys.forEach((key, index) => {
                    // セルの値をトリムして改行を削除
                    result[key] = (dataValues[index] || '').trim();
                });
                results.push(result);
            });

            return results;
        } catch (err) {
            console.error('データ抽出失敗:', err.message);
            return [];
        }
    }

    getResults() {
        return this.init();
    }
}

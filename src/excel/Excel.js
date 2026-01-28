import fs from 'fs';
import path from 'path';

export default class ExcelReader {
    constructor(folderPath) {
        // 渡されたパスが絶対パスかどうかを判定して処理
        this.targetDir = path.isAbsolute(folderPath) ? folderPath : path.resolve(folderPath);
        this.recordFilePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'record.txt');
        const fixedPath = process.platform === 'win32' ? this.recordFilePath.substring(1) : this.recordFilePath;
        this.recordFilePath = fixedPath;
        
        this.results = [];
        this.init();
    }

    init() {
        try {
            // record.txtを読み込む（ヘッダー情報）
            const headerContent = fs.readFileSync(this.recordFilePath, 'utf8');
            const headerLine = headerContent.trim();
            const keys = headerLine.split('\t').map(key => key.replace(/"/g, ''));

            // ターゲットフォルダからExcelファイルを取得（複数対応）
            const files = fs.readdirSync(this.targetDir);
            const excelFiles = files.filter(file => 
                ['.xls', '.xlsx', '.csv', '.tsv'].some(ext => file.toLowerCase().endsWith(ext))
            );

            if (excelFiles.length === 0) {
                console.log('❌ 対象のエクセルファイルが見つかりません。');
                return;
            }

            // 複数のエクセルファイルを処理
            excelFiles.forEach(file => {
                const filePath = path.join(this.targetDir, file);
                const data = this.extractData(filePath, keys);
                this.results.push({ fileName: file, ...data });
            });

            this.displayResults();
        } catch (err) {
            console.error('Excelデータ抽出失敗:', err.message);
        }
    }

    extractData(filePath, keys) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.trim().split('\n');

            const results = [];
            lines.forEach(line => {
                if (!line.trim()) return; // 空気行をスキップ
                
                const values = line.split('\t');
                const result = {};
                keys.forEach((key, index) => {
                    result[key] = values[index] || '';
                });
                results.push(result);
            });
            return { data: results };
        } catch (err) {
            console.error(`ファイル読み込み失敗: ${filePath}`, err.message);
            return { data: [] };
        }
    }

    displayResults() {
        console.log(JSON.stringify(this.results, null, 2));
    }
}

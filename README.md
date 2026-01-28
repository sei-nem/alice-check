# Readme

## 使い方

alice-check.exeをダウンロード

適当なフォルダに入れる

同じ階層にhtmlフォルダexcelフォルダを作る

htmlフォルダにデータを取得したいhtmlを全て入れる

### HTMLダウンロードブックマークレット
```javascript
javascript:(function(b,c,d,e,f,g,h,a){g=c.createElement('div').appendChild(c.getElementsByTagName('html')[0].cloneNode(true));f=g.querySelectorAll('[href],[src]');for(var i=0,n=f.length;i<n;i++){if(f[i].href){f[i].href=f[i].href}if(f[i].src){f[i].src=f[i].src}}h=g.innerHTML;e=c.doctype;e='<!DOCTYPE '+e.name+(e.publicId?%27 PUBLIC "%27+e.publicId+%27"%27:%27%27)+(e.systemID?%27 "%27+e.systemID+%27"%27:%27%27)+%27>%27;a=c.createElement(%27a%27);a.download=decodeURI(d.pathname+d.hash).replace(/\//g,%27__%27).replace(/#/g,'--')+'.html';a.href=(b.URL||b.webkitURL).createObjectURL(new Blob([e,'\n',h]));a.click()})(window,document,location);
```

excelフォルダにexcel.txtを作りそこに本日分のデータの行を選択してそのままコピペする

alice-check.exeを実行

resultフォルダに比較結果のCSVファイルが生成される




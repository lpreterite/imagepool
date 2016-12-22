# imagepool
图片加载器

## 使用

```
var thread = 5; //最大请求链接数
var imagepool = require('/utils/imagepool').initImagePool(thread)

// 加载图片列表
var sourcemap = [{
    '/assets/imgs/logo.png',
    '/assets/imgs/bg.jpg'
}];

var finish = 0,     //完成加载数
    progressVal= 0; //加载进度（百分比）

imagepool.load(sourcemap, {
    success: function(src){
        ++finish
        progressVal = Math.floor(finish / sourcemap.length * 100)
    },
    error: function(src){
        console.error("error:::::"+src)
    }
});
```
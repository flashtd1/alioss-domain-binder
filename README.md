# 阿里云OSS域名绑定命令行工具
公司的前端部署都放在了OSS上，但是每次添加新的项目都要登录、创建bucket、设置静态访问、绑定域名很麻烦，所以写了一个简单的工具
## 环境要求
* nodejs8及以上
* php7及以上（域名绑定没有nodejs的npm包，只有composer，所以用了PHP）

## 安装
克隆项目到本地后，执行`npm install`安装node的依赖，执行`composer install`安装php的依赖

## 配置
在项目根目录新建env.json，按照以下结构配置您的aliyun的accessKeyId和AccessKeySecret以及其他信息
```js
{
    "bucket": {
        "accessKeyId": "",
        "accessKeySecret": "",
        "bucket": "", // 这里填一个已经存在的bucket，用于初始化，不会对其进行修改
        "region": ""
    },
    "domain": {
        "accessKeyId": "",
        "accessKeySecret": ""
    },
    "dns": {
        "accessKeyId": "",
        "accessKeySecret": "",
        "DomainName": "", // 这里填的是顶级域名的部分，abc.com，不要带www或者任何通配符
        "bucketRegion": "" // 这个和bucket的region是同一个值
    }
}
```

## 命令
### 添加bucket
```node add_bucket.js {bucket名称}```

例如`node add_bucket.js abc`会在OSS上创建一个abc的bucket，并且设置访问类型为公共读，设置静态访问的文件为index.html

### 绑定域名
```php binddomain.php {bucket名称} {域名}```

例如`php binddomain.php abc abc.domain.com`会给刚才创建的`abc`bucket绑定域名`abc.domain.com`

### 域名解析
```node dns.js {记录值} {bucket名称}```

例如`node dns.js abc abc`会给`domain.com`域名创建一个值为`abc`的CNAME记录指向`abc`这个bucket

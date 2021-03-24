const oss = require('ali-oss');
const { accessKeyId, accessKeySecret, bucket, region } = require('./env.json').bucket

// init
const store = oss({
    accessKeyId,
    accessKeySecret,
    bucket,
    region
})

const args = process.argv.slice(2)

const [bucket] = args

// request
store.putBucket(bucket, {
    acl: 'public-read',
}).then(({ res }) => {
    console.log(`创建bucket：${bucket}`, res.status)
    store.putBucketWebsite(bucket, {
        index: 'index.html',
        error: 'index.html'
    }).then(({ res }) => {
        console.log('开启静态网站', res.status)
    }).catch((e) => {
        console.log('开启静态网站失败', e)
    })
}).catch((e) => {
    console.log(`创建bucket：${bucket}失败`, e)
})



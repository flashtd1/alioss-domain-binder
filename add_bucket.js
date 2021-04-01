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

const [newBucket] = args

// request
store.putBucket(newBucket, {
    acl: 'public-read',
}).then(({ res }) => {
    console.log(`创建bucket：${newBucket}`, res.status)
    store.putBucketWebsite(newBucket, {
        index: 'index.html',
        error: 'index.html'
    }).then(({ res }) => {
        console.log('开启静态网站', res.status)
    }).catch((e) => {
        console.log('开启静态网站失败', e)
    })
}).catch((e) => {
    console.log(`创建bucket：${newBucket}失败`, e)
})



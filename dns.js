const Core = require('@alicloud/pop-core')

const { accessKeyId, accessKeySecret, DomainName, bucketRegion } = require('./env.json')

var client = new Core({
    accessKeyId,
    accessKeySecret,
    endpoint: 'https://alidns.aliyuncs.com',
    apiVersion: '2015-01-09'
})

const args = process.argv.slice(2)

const [pr, bucket] = args

var params = {
    "RegionId": "cn-hangzhou",
    "DomainName": DomainName,
    "RR": pr,
    "Type": "CNAME",
    "Value": `${bucket}.${bucketRegion}.aliyuncs.com`
}

var requestOption = {
    method: 'POST'
};

client.request('AddDomainRecord', params, requestOption).then((result) => {
    console.log(`添加纪录${pr}.${DomainName}成功`)
    console.log(JSON.stringify(result))
}, (ex) => {
    console.log(`添加纪录${pr}.${DomainName}失败`)
    console.log(ex)
})

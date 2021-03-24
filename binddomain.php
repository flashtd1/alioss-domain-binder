<?php
require_once __DIR__ . '/vendor/autoload.php';
$configFile = file_get_contents('./env.json');
$config = json_decode($configFile);
$accessKeyId = $config->domain->accessKeyId;
$accessKeySecret = $config->domain->accessKeySecret;
$endpoint = "http://oss-cn-beijing.aliyuncs.com";

use OSS\OssClient;
use Oss\Core\OssException;

list($file, $bucket, $domain) = $argv;
print_r($bucket . '\n');
print_r($domain);


try {
    $ossClient = new OssClient($accessKeyId, $accessKeySecret, $endpoint);
    $ossClient->addBucketCname($bucket, $domain);
} catch (OssException $e) {
    printf(__FUNCTION__ . ": FAILED\n");
    printf($e->getMessage() . "\n");
    return;
}

print(__FUNCTION__ . ": OK" . "\n");

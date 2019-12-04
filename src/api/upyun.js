import upyun from '@/components/upyun'
import sign from '@/components/upyun/upyun/sign'
import crypto from 'crypto'

const bucketname = 'image-sgj';  //account.UPyun.bucketname;  // 空间名
const key = 'czdhy';  //account.UPyun.key; // 操作员
const secret = 'hsIbDbbdeURszZMoRq9JqTovEcG2ETl7';  //account.UPyun.secret; // 密码
const upyunUrl = 'https://api.upyun.com/'
const corsDomain = 'devops.wsp'

const service = new upyun.Service(bucketname, key, secret)
const client = new upyun.Client(service,sign.getHeaderSign)

export function upload(data, path) {

    return new Promise((resolve, reject) => {

        var md5 = crypto.createHash("md5");
        md5.update(data.name);
        var name = md5.digest('hex');
        var type = '';
        if(data.type.indexOf('video')>-1){
            type = '.'+data.type.split('/')[1]
        }
        client.putFile(path + name + type, data).then(function(result){
            console.log('put file to upyun ' + (result ? 'success' : 'failed'))
            resolve(result)
        })
    })
}

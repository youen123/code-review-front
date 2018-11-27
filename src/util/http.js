import Axios from 'axios';

let post = (url, data) => {
    return new Promise((resolve, reject) => {
        Axios.post(url, data).then(data => {
            if (data.status === 200 && data.data.flag) {
                resolve(data.data.data);
            } else {
                reject(data.data);
            }
        }).catch((e) => {
            throw e;
        })
    })
}

let get = (url, params) => {
    return new Promise((resolve, reject) => {
        Axios.get(url, {params}).then(data => {
            if (data.status === 200 && data.data.flag) {
                resolve(data.data.data);
            } else {
                reject(new Error('请求失败'));
            }
        }).catch((e) => {
            throw e;
        })
    })
}

export {
    get,
    post,
}
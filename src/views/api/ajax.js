//--Ajax requeste module which use axios
//--Centralized handling of abnormal requests
//--use the promise obj to cover the return of the axios
//--Do not reject(error) when recive the error rather than aler a message
//--aync get the respons.date={status:0 date: XXXXXX}----succsess or {status:1 msg:'xxxx'----failed

import axios from 'axios'
import {Alert} from 'rsuite'

export default function ajax (url, data={}, method='GET'){
    return new Promise((resolve, reject) => {
        let promise
        if(method==='GET'){
            promise = axios.get(url, {
                params:data
            })
        }else {
            promise = axios.post(url, data)
        }
        promise.then(response =>{
            resolve(response.data)
        }).catch(error =>{
            Alert.error('请求出错：'+ error.message)
        })
    })
}
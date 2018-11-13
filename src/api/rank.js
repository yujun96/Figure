
import jsonp from 'common/js/jsonp.js'

import {commonParams,options} from 'api/config.js'

import axios from 'axios'

export function getTopList(){
  const url = '/api/getTopList'
  
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format:'json'
  })
  return axios.get(url,{
    params:data
}).then((res)=>{
    return Promise.resolve(res.data)
})
}


export function getMusicList(topid) {
  const url = '/api/getMusicList'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })
  return axios.get(url,{
    params:data
}).then((res)=>{
    return Promise.resolve(res.data)
})
}

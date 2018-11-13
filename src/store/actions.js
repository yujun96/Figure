import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {shuffle}  from 'common/js/util'
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite} from 'common/js/cache'

function findIndex (list,song) {
    return list.findIndex((item)=>{
       return  item.id === song.id
    })
}

export const selectPlay = function({commit,state},{list,index}){
   commit(types.SET_SEQUENCE_LIST,list)
   if(state.mode === playMode.random){
       let randomlist = shuffle(list)
       commit(types.SET_PLAY_LIST,randomlist)
       index = findIndex(randomlist,list[index])
   }
   else{
    commit(types.SET_PLAY_LIST,list) 
   }

   commit(types.SET_CURRENT_INDEX,index) 
   commit(types.SET_FULL_SCREEN,true)
   commit(types.SET_PLAYING_STATE,true)   
}


export const randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    let randomlist = shuffle(list)
    commit(types.SET_PLAY_LIST,randomlist) 
    commit(types.SET_CURRENT_INDEX,0) 
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)  
}


export const insertSong = function({commit,state},song){
    let playlist = state.playlist.slice()
    let sequencelist = state.sequencelist.slice()
    let currentIndex = state.currentIndex

    // 记录当前歌曲
    let currentSong = playlist[currentIndex]

    // 判断歌曲中是否有该歌曲
    let fpIndex =findIndex(playlist,song)

    // 因为插入一首歌，所以索引+1
    currentIndex++

    // 插入这首歌的当前索引位置
    playlist.splice(currentIndex,0,song)
    // 已经包含了这首歌
    if(fpIndex>-1){
        if(currentIndex>fpIndex){
            playlist.splice(fpIndex,1)
            currentIndex--
          }
          else{
            playlist.splice(fpIndex+1,1) 
          }
    }
  let currentSIndex = findIndex(sequencelist,currentSong) + 1

  let fsIndex = findIndex(sequencelist,song)

  sequencelist.splice(currentSIndex,0,song)

  if(fsIndex>-1){
    if(currentSIndex>fsIndex){
       sequencelist.splice(fsIndex,1)
      }
      else{
       sequencelist.splice(fsIndex+1,1) 
      }
}
commit(types.SET_PLAY_LIST,playlist)
commit(types.SET_SEQUENCE_LIST,sequencelist)
commit(types.SET_CURRENT_INDEX,currentIndex)
commit(types.SET_FULL_SCREEN,true)
commit(types.SET_PLAYING_STATE,true)  
}


export const saveSearchHistory = function({commit},query){
      commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}


export const deleteSearchHistory = function({commit},query){
    commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit}){
    commit(types.SET_SEARCH_HISTORY,clearSearch())
}

export const deleteSong = function({commit,state},song){
    let playlist = state.playlist.slice()
    let sequencelist = state.sequencelist.slice()
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist,song)
    playlist.splice(pIndex,1)
    let sIndex = findIndex(sequencelist,song)
    sequencelist.splice(sIndex,1)
    if(currentIndex>pIndex || currentIndex === playlist.length){
        currentIndex--
    }
    commit(types.SET_PLAY_LIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequencelist)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    if(!playlist.length){
        commit(types.SET_PLAYING_STATE,false)
    }
    else{
        commit(types.SET_PLAYING_STATE,true)
    }
}

export const deleteSongList = function({commit}){
    commit(types.SET_PLAY_LIST,[])
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)
}

export const savePlayHistory = function({commit},song){
   commit(types.SET_PLAY_HISTORY,savePlay(song))
}



export const saveFavoriteList = function({commit},song){
  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}

export const deleteFavoriteList = function({commit},song){
   commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}
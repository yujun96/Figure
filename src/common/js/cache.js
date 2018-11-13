import storage from 'good-storage'

const SEARCH_KEY = '__search__'

const SEACH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'


const PLAY_KEY_LENGTH = 200

const FAVOTIYE_KEY = '__favorite__'

const  FAVOTIYE_KEY_length = 200

function insertArray(arr,val,compare,maxlength){
       const index = arr.findIndex(compare)
       if(index === 0){
           return 
       }
       if(index>0){
           arr.splice(index,1)
       }
       arr.unshift(val)
       if(maxlength && maxlength.length> SEACH_MAX_LENGTH){
           arr.pop()
       }
}

function deleteFromArray(arr,compare){
    const index =  arr.findIndex(compare)
    if(index>-1){
        arr.splice(index,1)
    }
}

export function saveSearch(query){
    let searches = storage.get( SEARCH_KEY,[])
    insertArray(searches,query,(item)=>{
        return item === query
    },SEACH_MAX_LENGTH)
    storage.set(SEARCH_KEY,searches)
    return searches
}

export function loadSearch(){
    return storage.get(SEARCH_KEY,[])
}


export function deleteSearch(query){
    let searches = storage.get(SEARCH_KEY,[])
    deleteFromArray(searches,(item)=>{
        return item === query
    })
    storage.set(SEARCH_KEY,searches)
    return searches
}


export function clearSearch(){
    storage.remove(SEARCH_KEY)
    return []
}


export function savePlay(song){
let songs = storage.get(PLAY_KEY,[])
    insertArray(songs,song,(item)=>{
        return item.id === song.id
    },PLAY_KEY_LENGTH)
    storage.set(PLAY_KEY,songs)
    return songs
}

export function loadPlay(){
    return storage.get(PLAY_KEY)
}

export function saveFavorite(song){
    let songs = storage.get(FAVOTIYE_KEY,[])
     insertArray(songs,song,(item)=>{
            return item.id === song.id
     },FAVOTIYE_KEY_length)
     storage.set(FAVOTIYE_KEY,songs)
     return songs
}

export function deleteFavorite(song){
    let songs = storage.get(FAVOTIYE_KEY,[])
    deleteFromArray(songs,(item)=>{
        return item.id === song.id
    })
    storage.set(FAVOTIYE_KEY,songs)
    return songs
}

export function loadFavorite(){
    return  storage.get(FAVOTIYE_KEY,[])
}


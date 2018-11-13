import {mapGetters, mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle}  from 'common/js/util'

export  const playMixin = {
    computed:{
          ...mapGetters(['playlist'])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)  
    },
    methods:{
        handlePlaylist(){
         throw new Error('组件中必须要有handPlaylist方法')
        },
    },
    watch:{
        playlist(newVal){
            this.handlePlaylist(newVal)  
        } 
    }
}

export const playerMixin = {
    computed:{
        iconMode() {
            return this.mode=== playMode.sequence ? 'icon-sequence' : this.mode=== playMode.loop ? 'icon-loop' : 'icon-random'
           },
           ...mapGetters([
            'sequencelist','currentSong','playlist','mode','favoriteList'
           ])
    },
    methods:{
        changeMode(){
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if(this.mode === playMode.random){
              list = shuffle(this.sequencelist)
            }else{
              list = this.sequencelist
            }
            this._resetCurrentIndex(list)
            this.setPlayList(list)
         },
         end(){
            if(this.mode===playMode.loop){
               this.loop()
            }
            else{
              this.next()
            }
           
         },
         loop(){
            this.$refs.audio.currentTime = 0
             this.$refs.audio.play()
             if(this.currentLyric){
               this.currentLyric.seek(0)
             }
         },
         _resetCurrentIndex(list,song){
            let index = list.findIndex((item)=>{
                  return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
         },
         getFavoriteIcon(song){
            if(this.isFavorite(song)){
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
         },
         toggleFavorite(song){
              if(this.isFavorite(song)){
                   this.deleteFavoriteList(song)
              }else{
                  this.saveFavoriteList(song)
              }  
         },
         isFavorite(song){
             const index = this.favoriteList.findIndex((item)=>{
                return item.id === song.id
            })
           return index > -1
         },
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex:'SET_CURRENT_INDEX',
            setPlayMode:'SET_PLAY_MODE',
            setPlayList: 'SET_PLAY_LIST'
         }),
        ...mapActions(['saveFavoriteList','deleteFavoriteList'])
        }
    
}

export const searchMixin = {
    data(){
        return{
          newQuery:''
        }
    },
    computed:{
        ...mapGetters(['searchHistory'])
    },
    methods:{
        blurInput() {
            this.$refs.searchBox.blur()
          },
          saveSearch() {
            this.saveSearchHistory(this.newQuery)
          },
          query(newQuery) {
            this.newQuery = newQuery
          },
          addQuery(query) {
            this.$refs.searchBox.setQuery(query)
          },
          ...mapActions(["saveSearchHistory","deleteSearchHistory"])
    }
}
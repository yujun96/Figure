<template>
    <transition name="slider">
       <musicList :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></musicList>
    </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import {getMusicList} from 'api/rank'
import {createdSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import { mapGetters } from 'vuex';
export default {
  created(){
      this._getMusicList()
    },
   data(){
     return{
         songs:[],
         rank:true
     }
   },
  components:{
       musicList
  },
  computed:{
      title(){
          return this.topList.topTitle
      },
      bgImage(){
          if(this.songs.length){
             return this.songs[0].image
          }
          return ''
      },
    ...mapGetters(['topList'])
  },
  methods:{
     _getMusicList(){
         if(!this.topList.id){
             this.$router.push({
                 path:'/rank'
             })
         }
     getMusicList(this.topList.id).then((res)=>{
         if(res.code === ERR_OK){
             this.songs =this._normalizeSongs(res.songlist)
         }
     })
    },
     _normalizeSongs(list){
         let ret = []
         list.forEach((item)=>{
             const musicData = item.data
             if(musicData.songid&&musicData.albumid){
                 ret.push(createdSong(musicData))
             }
         })
           return ret
     } 
    }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable';



.slider-enter-active, .slider-leave-active {
    transition: all 0.3s;
}

.slider-enter, .slider-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>

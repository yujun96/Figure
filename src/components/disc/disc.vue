<template>
    <transition name="slider">
       <musicList :title="title" :bg-image="bgImage" :songs="songs"></musicList>
    </transition>

</template>

<script>
import musicList from 'components/music-list/music-list'
import {getSongList} from 'api/recommend'
import { mapGetters } from 'vuex';
import {ERR_OK} from 'api/config'
import {createdSong} from 'common/js/song'
export default{
    data(){
       return{
         songs:[]
       }
    },
    components:{
     musicList
    },
    computed:{
     title(){
         return this.disc.dissname
      },
     bgImage(){
        return this.disc.imgurl
      },
     ...mapGetters(['disc'])
    },
    created(){
      this._getSongList()
    },
    methods:{
      _getSongList(){
          if(!this.disc.dissid){
              this.$router.push('/recommend')
          }
         getSongList(this.disc.dissid).then((res)=>{
             if(res.code === ERR_OK){
              this.songs = this._normalizeSongs(res.cdlist[0].songlist)
             }
          
         })
    },
    _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          if(item.songid && item.albummid){
               ret.push(createdSong(item)) 
          }
        });
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

<template>
    <transition name="slider">
       <musicList :songs="songs" :title="title" :bg-image="bgImage"></musicList>
    </transition>

</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import {createdSong} from 'common/js/song'
import musicList from 'components/music-list/music-list'
export default {
  created() {
    this._getDetail();
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title(){
         return this.singer.name
    },
    bgImage(){
        return this.singer.avatar
    },
    
    ...mapGetters(["singer"])
  },
  components:{
       musicList
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
      this.songs = this._normalizeSongs(res.data.list);
        }
      })
    },
    _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let musicData = item.musicData
          if(musicData.songid && musicData.albummid){
               ret.push(createdSong(musicData)) 
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

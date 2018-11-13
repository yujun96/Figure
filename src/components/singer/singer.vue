<template>
    <div class="singer" ref="singer">
       <listview :data="singers" @select="selectSinger" ref="list"></listview>
       <router-view></router-view>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from 'common/js/singer'
import listview from 'base/listview/listview'
import {playMixin} from 'common/js/mixin'
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  mixins:[playMixin],
  created() {
    this._getSingerList();
  },
  data() {
    return {
      singers: []
    };
  },
  methods: {
    handlePlaylist(playlist){
     const bottom = playlist.length > 0 ? '60px' : ''
     this.$refs.singer.style.bottom = bottom 
     this.$refs.list.refresh()  
    },
    selectSinger(singer){
        this.$router.push({
          path:`/singer/${singer.id}`
        }),
      this.setsinger(singer)  
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          //  this.singers = res.data.list
          this.singers =this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer(
             item.Fsinger_mid,
             item.Fsinger_name
            ))
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(new Singer(
              item.Fsinger_mid,
              item.Fsinger_name
              ));
      });
      // console.log(map)
      let hot = []
      let ret = []
      for(let key in map){
        let val = map[key]
        if(val.title.match(/[a-zA-z]/)){
          ret.push(val)
        }
       else if(val.title===HOT_NAME){
           hot.push(val)
       }
      }
     ret.sort((a,b)=>{
       return a.title.charCodeAt(0)-b.title.charCodeAt(0)
     })
     return hot.concat(ret)
    },
    ...mapMutations({
      setsinger:'SET_SINGER'
    })
  },
  components:{
    listview
  }
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>


<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hidden">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">

         <search-box ref="searchBox" placeholder="搜索歌曲" @query="query"></search-box>
      </div>
      <div class="shortcut" v-show="!newQuery">
           <switches @switch="switchItem" :switches="switches" :currentIndex='currentIndex'></switches>
           <div class="list-wrapper">
             <scroll ref="songListWrapper" class="list-scroll" v-if="currentIndex===0" :data="playHistory">
               <div class="list-inner">
                     <songlist :songs="playHistory" @select="selectSong"></songlist>
               </div>
             </scroll>
             <scroll :refreshDelay="refreshDelay" ref="searchListWrapper" class="list-scroll" v-if="currentIndex===1" :data="searchHistory">
               <div class="list-inner">
                  <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
               </div>
             </scroll>
           </div>
      </div>
      <div class="search-result" v-show="newQuery">
          <suggest :query="newQuery" :showSinger="false" @select="selectSuggest" @listenScroll="blurInput"></suggest>
      </div>
      <top-tip ref="topTip">
       <div class="tip-title">
         <i class="inco-ok"></i>
         <span class="text">1售歌曲已经添加到列表</span>
       </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
import searchBox from 'base/search-box/search-box'
import suggest from 'components/suggest/suggest'
import {searchMixin} from 'common/js/mixin'
import switches from 'base/switches/switches'
import scroll from 'base/scroll/scroll'
import {mapGetters, mapActions} from 'vuex'
import songlist from 'base/songlist/songlist'
import Song from 'common/js/song'
import searchList from 'base/search-list/search-list'
import topTip from 'base/top-tip/top-tip'
export default {
   mixins:[searchMixin],
    data(){
        return{
            showFlag:false,
            currentIndex:0,
            switches:[
              {name:'最近播放'},
              {name:'搜索历史'}
            ],
               refreshDelay:200
           
        }
    },
    components:{
      searchBox,
      suggest,
      switches,
      scroll,
      songlist,
      searchList,
      topTip
    },
    methods:{
           show(){
               this.showFlag = true
               setTimeout(()=>{
                if(this.currentIndex===0){
                  this.$refs.songListWrapper.refresh()
                }
                else{
                   this.$refs.searchListWrapper.refresh()
                }
               },20)
           },
           hidden(){
               this.showFlag = false
           },
          selectSuggest(){
            this.saveSearch()
             this.showTip()
          } ,
          switchItem(index){
            this.currentIndex = index
          },
          selectSong(song,index){
            if(index!==0){
              this.insertSong(new Song(song))
              this.showTip()
            }
          },
          showTip(){
            this.$refs.topTip.showFlag = true
          },
          ...mapActions(["insertSong"])
    },
    computed:{
      ...mapGetters(['playHistory'])
    }
}
</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
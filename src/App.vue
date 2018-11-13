<template>
  <div id="app">
    <mHeader></mHeader>
    <tab></tab>
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header'
import tab from 'components/tab/tab'
import player from 'components/player/player'
export default {
  components:{
    mHeader,
    tab,
    player
  }
}
</script>

<style>

</style>

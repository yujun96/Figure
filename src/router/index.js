import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const  recommend = (resolve) =>{
  import('components/recommend/recommend').then((module)=>{
    resolve(module)
  })
}
const singer = (resolve) =>{
  import('components/singer/singer').then((module)=>{
    resolve(module)
  })
}
const rank = (resolve) =>{
  import('components/rank/rank').then((module)=>{
    resolve(module)
  })
}
const search = (resolve) =>{
  import('components/search/search').then((module)=>{
    resolve(module)
  })
}
const singerDetail = (resolve) =>{
  import('components/singerDetail/singerDetail').then((module)=>{
    resolve(module)
  })
}
const disc = (resolve) =>{
  import('components/disc/disc').then((module)=>{
    resolve(module)
  })
}
const toplist = (resolve) =>{
  import('components/top-list/top-list').then((module)=>{
    resolve(module)
  })
}
const userCenter = (resolve) =>{
  import('components/user-center/user-center').then((module)=>{
    resolve(module)
  })
}


export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children:[
        {
          path: ':id',
          component:disc
        }
      ]
    },
    {
      path: '/singer',
      component: singer,
      children:[
        {
          path: ':id',
          component:singerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children:[{
        path:':id',
        component:toplist
      }]
    },
    {
      path: '/search',
      component: search,
      children:[{
        path:':id',
        component:singerDetail
      }]
    },
    {
       path:'/user',
       component:userCenter
    }
  ]
  // mode:'history'
})

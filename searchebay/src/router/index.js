import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Item from '@/components/Item'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
    	path: '/item/:id',
    	name: 'Item',
    	component: Item
    },
    {
      path: '/l/:limit/o/:offset/f/:filters',
      name: 'SearchWithParams',
      component: Search
    }
  ]
})

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
    }
  ]
})

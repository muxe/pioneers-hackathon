import Router from 'vue-router'
import List from './List'
import Post from './Post'

const routes = [
	{ path: '/list', component: List },
	{ path: '/add', component: Post }
]

const router = new Router({
	routes
})

export default router

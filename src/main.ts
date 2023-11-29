import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Atividades from './views/Atividades.vue'
import './style.css'

const routes = [
  {path: '/', component: Login},
  {path: '/home', component: Home},
  {path: '/atividades/:nome', component: Atividades},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')

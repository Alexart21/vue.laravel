import {createRouter, createWebHistory} from 'vue-router'

import Index from './components/pages/Index.vue';
import Test from './components/pages/Test.vue';
import Login from './components/pages/Login.vue';
import Registration from './components/pages/Registration.vue';
import Me from './components/pages/Me.vue';
import Refresh from './components/pages/Refresh.vue';
import Logout from './components/pages/Logout.vue';
import TableTest from './components/pages/TableTest.vue';
import E404 from './components/pages/E404.vue';

const routes = [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: 'test',
    path: '/test',
    component: Test
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'registration',
    path: '/registration',
    component: Registration
  },
  {
    name: 'me',
    path: '/me',
    component: Me
  },
  {
    name: 'refresh',
    path: '/refresh',
    component: Refresh
  },
  {
    name: 'logout',
    path: '/logout',
    component: Logout
  },
  {
    name: 'table-test',
    path: '/table-test',
    component: TableTest
  },
  {
    path: '/:any(.*)', // .*
    component: E404
  }
];

export default createRouter({
  routes,
  history: createWebHistory(),
});

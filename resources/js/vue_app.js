import {createApp} from 'vue'

import App from './../src/App.vue';
import store from './../src/store';
import router from './../src/router';

import mdiVue from 'mdi-vue/v3'
import  { mdiAccount, mdiAccountBadgeOutline, mdiCardAccountMailOutline }  from '@mdi/js'

createApp(App)
    .use(store)
    .use(router)
    .use(mdiVue, {
        icons: { mdiAccount, mdiAccountBadgeOutline, mdiCardAccountMailOutline }
    })
    .mount('#app');

import router from './router';
import { createApp } from 'vue';
import App from './app/App.vue';

// Import the Vuetify plugin 
import vuetify from './plugins/vuetify';

// Import the global styles (This loads Tailwind + Design System)
import './styles/global.css';

//Import vuetify styles AFTER tailwind to prevent tailwind from overriding vuetify
import 'vuetify/styles';

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#root');

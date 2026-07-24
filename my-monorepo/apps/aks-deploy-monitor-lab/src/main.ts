import router from './router';
import { createApp } from 'vue';
import App from './app/App.vue';

// 1. Import the global styles (This loads Tailwind + Design System)
import './styles/global.css';

const app = createApp(App);
app.use(router);
app.mount('#root');

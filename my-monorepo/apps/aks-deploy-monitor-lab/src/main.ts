import router from './router';
import { createApp } from 'vue';
import App from './app/App.vue';

// Import the global styles (This loads Tailwind + Design System)
import './styles/global.css';

import '@org/ui-design-system/dist/index.css';

const app = createApp(App);

app.use(router);

app.mount('#root');

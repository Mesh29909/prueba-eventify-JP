import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import i18n from "./i18n.js";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import Textarea from 'primevue/textarea';
import AutoComplete from 'primevue/autocomplete';
import {
    Avatar,
    Button,
    Column,
    DataTable,
    DatePicker,
    Dialog, Divider,
    InputGroup,
    InputGroupAddon, InputNumber,
    InputText, Select,
    SelectButton, Toolbar,
} from "primevue";


const app = createApp(App);

app.use(i18n)
    .use(PrimeVue, {ripple:true, theme:{preset:Aura}})
    .component('pv-select-button', SelectButton)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-button',Button)
    .component('pv-date-picker', DatePicker)
    .component('pv-dialog', Dialog)
    .component('pv-input-group', InputGroup)
    .component('pv-input-group-addon', InputGroupAddon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-select', Select)
    .component('pv-divider', Divider)
    .component('pv-toolbar',Toolbar)
    .component('pv-avatar',Avatar)
    .component('pv-textarea', Textarea)
    .component('pv-dropdown', AutoComplete)
    .mount('#app');

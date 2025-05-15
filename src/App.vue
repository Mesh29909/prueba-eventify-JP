<script>

import {defineComponent} from "vue";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import CreateQuote from "./quote-management/components/create-quote.component.vue";
import QuoteOrderList from "./quote-management/components/quote-order-list.component.vue"
import HeaderContent from "./public/components/header-content.component.vue";
import ToolbarContent from "./public/components/toolbar-content.component.vue";
import TaskManagement from './task-management/components/task-management.component.vue';
export default defineComponent({
  components: {TaskManagement, ToolbarContent, HeaderContent, CreateQuote, LanguageSwitcher,QuoteOrderList}
})
</script>

<template>
  <div class="app-wrapper">
    <header-content />
    <div class="layout-body">
      <toolbar-content />
      <div class="main-content">
        <TaskManagement></TaskManagement>
      </div>
    </div>
  </div>
</template>


<style scoped>
.app-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 🔒 bloquea scroll externo */
}

.layout-body {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto; /* ✅ solo aquí habrá scroll si se necesita */
}
</style>
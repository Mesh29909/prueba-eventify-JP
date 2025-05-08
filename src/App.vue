<script>

import {defineComponent} from "vue";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import CreateQuote from "./quote-management/components/create-quote.component.vue";
import QuoteOrderList from "./quote-management/components/quote-order-list.component.vue"
import HeaderContent from "./public/components/header-content.component.vue";
import ToolbarContent from "./public/components/toolbar-content.component.vue";
export default defineComponent({
  components: {ToolbarContent, HeaderContent, CreateQuote, LanguageSwitcher,QuoteOrderList}
})
</script>
<template>
  <header-content></header-content>
  <div class="flex">
    <toolbar-content></toolbar-content>
    <quote-order-list class="w-full"></quote-order-list>
  </div>

</template>
<style scoped>

</style>
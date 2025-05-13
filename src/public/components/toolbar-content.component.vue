<script>
export default {
  name: "toolbar-content",
  data(){
    return{

    }
  }
}
</script>
<template>
  <pv-toolbar class="toolbar-custom">
    <template #center>
      <div class="flex flex-column">
        <a href="#">{{ $t('toolbar.profile') }}</a>
        <a href="#">{{ $t('toolbar.calendar') }}</a>
        <a href="#">{{ $t('toolbar.events') }}</a>
        <a href="#">{{ $t('toolbar.tasks') }}</a>
        <a href="#">{{ $t('toolbar.quotes') }}</a>
        <a href="#">{{ $t('toolbar.messages') }}</a>
        <a href="#">{{ $t('toolbar.subscriptions') }}</a>
      </div>
    </template>
    <template #end>
      <div class="h-4rem"></div>
    </template>
  </pv-toolbar>
</template>

<style scoped>
.toolbar-custom {
  height: 100vh;
  flex-direction: column;
  display: flex;
  background-color: #fff;
  padding: 0;
  border: none;
  border-radius: 0;
}

a {
  padding: 25px 48px;
  text-decoration: none;
  color: #000;
}
a:hover {
  background-color: #3A506B;
  color: #fff;
  transition: 0.3s ease-in-out;
}
</style>

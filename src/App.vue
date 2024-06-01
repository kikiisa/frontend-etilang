<script setup>
 import NavbarComponentsVue from "./components/NavbarComponents.vue";
 import {useRoute} from "vue-router"
 const route = useRoute()
</script>
<template>
    <NavbarComponentsVue v-if="route.path !== '/'"/>
    <router-view/>  
</template>
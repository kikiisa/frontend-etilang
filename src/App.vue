<script setup>
 import NavbarComponentsVue from "./components/NavbarComponents.vue";
 import {useRoute} from "vue-router"
 const route = useRoute()
</script>
<template>
    <NavbarComponentsVue v-if="route.path !== '/'"/>
    <router-view/>  
</template>
<style>
    
.form-control {
    height: 40px;
    border-width: 2px;
    background-color: #F3F3F3;
    
}
.form-control:focus {
    box-shadow: none;
    border-color: var(--main-color);
}
</style>
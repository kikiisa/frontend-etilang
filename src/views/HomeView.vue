<script>
import cameraComponents from "../components/cameraComponents.vue";
import NavbarComponents from "../components/NavbarComponents.vue";
import ModalComponentsAngkutanUmun from "../components/ModalComponentsAngkutanUmun.vue";
import MenuComponents from "../components/MenuComponents.vue";
import {useAuthStore} from "../store/auth"
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingComponentsVue from '../components/LoadingComponents.vue';

import ModalComponentsAngkutanPlatKuningVue from '../components/ModalComponentsAngkutanPlatKuning.vue';
export default {
  components: {
    cameraComponents,
    NavbarComponents,
    ModalComponentsAngkutanUmun,
    ModalComponentsAngkutanPlatKuningVue,
    MenuComponents,
    LoadingComponentsVue
  },
  setup() { 
    const loading = ref(null);
    const router = useRouter()
    onMounted( async () => {
      setTimeout(async() => {
        const authStore = useAuthStore();
        loading.value = true
        // console.log(await authStore.verify());
        if(await authStore.verify() == false)
        {
          router.push("/"); 
        }
        
      },3000)
    })
    return { loading }
  },
};
</script>
<template>
  <LoadingComponentsVue v-if="loading == null"/>
  <main v-if="loading == true">
      <MenuComponents/>
      <cameraComponents/>
      <ModalComponentsAngkutanUmun/>
      <ModalComponentsAngkutanPlatKuningVue/>
  </main>
</template>

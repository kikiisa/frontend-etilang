<script>
import cameraComponents from "../components/cameraComponents.vue";
import NavbarComponents from "../components/NavbarComponents.vue";
import ModalComponentsAngkutanUmun from "../components/ModalComponentsAngkutanUmun.vue";
export default {
  components: {
    cameraComponents,
    NavbarComponents,
    ModalComponentsAngkutanUmun
  },
};
</script>

<template>
  <div class="home">
    <div class="row justify-content-center">
        <NavbarComponents/>
        <cameraComponents/>
        <ModalComponentsAngkutanUmun/>
    </div>
  </div>
</template>

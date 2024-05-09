<script>
import cameraComponents from "../components/cameraComponents.vue";
import NavbarComponents from "../components/NavbarComponents.vue";
export default {
  components: {
    cameraComponents,
    NavbarComponents
  },
};
</script>

<template>
  <div class="home">
    <div class="row justify-content-center">
        <NavbarComponents/>
        <cameraComponents/>
    </div>
  </div>
</template>

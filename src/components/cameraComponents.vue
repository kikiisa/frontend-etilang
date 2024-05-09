<script>
import Camera from "simple-vue-camera";
import { ref } from "vue";
import { dataURLToBlob,nameFileRandom } from "../utils/blob"
import {serviceImage} from "../utils/Api"
export default {
  components: {
    Camera,
  },
  setup() {
    const camera = ref(Camera);
    const recognizePicture = async () => 
    {
        const file = await camera.value?.snapshot();
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            let result = reader.result
            let blob = dataURLToBlob(result)
            serviceImage(new File([blob], `${nameFileRandom('scan-')}.png`, { type: 'image/png' }))
        }
    }
    return {
      camera,
      recognizePicture
    };
  },
};
</script>

<template>
  <div class="col-lg-8">
    <div class="card border-0">
      <div class="card-body">
        <div class="bg-info p-4 rounded-4 text-center text-light fw-bold mb-3">
          Foto Plat Nomor Kendaraan 📷
        </div>
        <camera ref="camera" autoplay></camera>
        <button class="btn btn-primary fw-bold mt-2" @click="recognizePicture">Scan Plat Nomor</button>
        <button class="btn btn-dark ms-2 fw-bold mt-2">Reset</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.camera {
  margin-top: 50px;
}
</style>

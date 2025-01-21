<script>
import Camera from "simple-vue-camera";
import { ref, reactive } from "vue";
import { dataURLToBlob, filterSpasi, nameFileRandom } from "../utils/blob";
import { service1, service2 } from "../utils/Api";
import LoadingComponents from "./LoadingComponents.vue";
import { toastError, toastSuccess } from "../utils/Toast";
import ModalComponentsAngkutanUmun from "../components/ModalComponentsAngkutanUmun.vue";
import ModalComponentsAngkutanPlatKuningVue from '../components/ModalComponentsAngkutanPlatKuning.vue';
import debounce from "../utils/Debounce";
import axios from "axios";
export default {
  components: {
    Camera,
    LoadingComponents,
    ModalComponentsAngkutanPlatKuningVue,
    ModalComponentsAngkutanUmun,
  },
  setup() {
    const camera = ref(Camera);
    const isLoading = ref(null);
    const resultOcr = ref("");
    const data_plat = ref([]);
    const category  = ref(null);
    const message   = ref("");

    const resetData = () => {
      resultOcr.value = "";
      data_plat.value = [];
      isLoading.value = null;
      window.location.reload();
    };
    const searchByKeyup = async () => 
    {
      if(resultOcr.value != "")
      {
        const response = await axios.post(`${service2}search-plat-number`,{
          data:resultOcr.value
          
        }) 
        data_plat.value = response.data.data;
        category.value = response.data.category;
        message.value  = response.data.message;
      }
    }
    const searchData = debounce(searchByKeyup,2000);

    const recognizePicture = async () => {
      const file = await camera.value?.snapshot();
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        isLoading.value = true;
        let result = reader.result;
        let blob = dataURLToBlob(result);
        const formData = new FormData();
        formData.append(
          "image",new File([blob], `${nameFileRandom("scan-")}.png`, {
            type: "image/png",
          })
        );
        await axios
          .post(service1 + "service-image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",

            },
          })
          .then((response) => {
            if (response.data.result == "") {
              
              isLoading.value = false;
              toastError("Plat Nomor Tidak Terdeteksi");
            } else {
              setTimeout(async () => {
                isLoading.value = false;
                resultOcr.value = response.data.result;
                try {
                  let responseInfoPlatNumber = await axios.post(
                    `${service2}search-plat-number`,
                    {
                      data: response.data.result,

                    }
                  );
                  data_plat.value = responseInfoPlatNumber.data.data;
                  category.value = responseInfoPlatNumber.data.category;
                  message.value  = responseInfoPlatNumber.data.message;
                } catch (error) {
                  toastError(error)
                  // Tangani error jika request gaga
                }
              }, 2000);
            }
          })
          .catch((err) => {
            isLoading.value = null;
            toastError("Terjadi Kesalahan !");
            console.log(err);
          });
      };
    };
    return {
      camera,
      recognizePicture,
      isLoading,
      resetData,
      resultOcr,
      data_plat,
      category,
      message,
      searchByKeyup,
      searchData
    };
  },
};
</script>
<template>
  <div class="row justify-content-center">
    <div class="col-lg-12">
      <div class="card border-0">
        <div class="card-body">
          <div class="bg-info p-4 rounded-4 text-center text-light fw-bold mb-3">
            Foto Plat Nomor Kendaraan 📷
          </div>
          <div class="bg-danger p-2 rounded text-center text-white fw-bold mb-3" v-if="category == 0">{{ message }} 😊</div>
          <input
            
            type="text"
            v-model="resultOcr"
            class="form-control mb-3"
            @keyup="searchData"
            placeholder="Cari Secara Manual"
          />
          <LoadingComponents v-if="isLoading == true" class="text-center" />
          <camera ref="camera" v-if="isLoading == null " autoplay></camera>
      
          <div class="list-data" v-if="data_plat.length > 0">
            <div class="list-data-angkutan-umum-orang" v-if="category == 1">
              <h5 class="mb-2 mt-3">Data Plat Nomor Angkutan Umum Orang</h5>
              <ul class="list-group mt-2" v-for="data in data_plat" :key="data.id">
                <li class="list-group-item"><p>Plat Nomor : <strong>{{ data.plat_nomor }}</strong></p> <router-link :to="{name: 'detail', params: {id: data.id,category: 1}}" class="btn btn-primary">Detail</router-link></li>
              </ul>
            </div>
            <div class="list-data-plat-kuning" v-if="category == 2">
              <h5 class="mb-2 mt-3">Data Plat Kuning</h5>
              <ul class="list-group mt-2" v-for="data in data_plat" :key="data.id">
                <li class="list-group-item"><p>Plat Nomor : <strong>{{ data.nomor_kendaraan }}</strong></p> <router-link :to="{name: 'detail', params: {id: data.id,category: 2}}" class="btn btn-primary">Detail</router-link></li>
              </ul>
            </div>
          </div>
          <div class="add-data" v-if="category == 0" >
            <button class="btn btn-outline-warning mt-3 fw-bold" data-bs-toggle="modal" data-bs-target="#add1">Angkutan Umum Orang </button>
            <button class="btn btn-outline-warning mt-3 fw-bold ms-1" data-bs-toggle="modal" data-bs-target="#add2">Angkutan Umum Barang</button>
          </div>
          <button class="btn btn-primary fw-bold mt-2" v-if="resultOcr == ''" @click="recognizePicture">
            Scan Plat Nomor
          </button>
          <button class="btn btn-dark fw-bold mt-2 ms-2" @click="resetData">
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
  <ModalComponentsAngkutanPlatKuningVue :platnumber="resultOcr"/>
  <ModalComponentsAngkutanUmun :platnumber="resultOcr"/>
</template>
<style scoped>
.camera {
  margin-top: 50px;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

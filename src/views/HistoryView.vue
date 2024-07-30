<script setup>
import { onMounted, ref } from "vue";
import MenuComponents from "../components/MenuComponents.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { service2 } from "../utils/Api";
import { useAuthStore } from "../store/auth";
import LoadingComponentsVue from "../components/LoadingComponents.vue";
const loading = ref(null);
const router = useRouter();
const dataResponseOpd = ref([]);
const dataResponseKir = ref([]);
const fetchData = async () => {
  try {
    const response = await axios.get(`${service2}latest-data`);
    const {data_opd,data_kir} = response.data
    console.log(response);
    dataResponseOpd.value = data_opd
    dataResponseKir.value = data_kir
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  setTimeout(async () => {
    const authStore = useAuthStore();
    loading.value = true;
    // console.log(await authStore.verify());
    if ((await authStore.verify()) == false) {
      router.push("/");
    }
  }, 3000);
  fetchData();
});
</script>
<template>
  <LoadingComponentsVue v-if="loading == null"/>
  <div class="home" v-else>
    <MenuComponents />
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card border-0">
          <div class="card-body">
            <h5 class="mt-4 mb-2">History Tilang</h5>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Angkutan Umum Orang
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                Data Angkutan Umum Barang
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabindex="0"
              >
                <div class="list-data">
                    <div class="list-data-angkutan-umum-orang" v-if="dataResponseOpd.length > 0">
                        <ul class="list-group mt-2" v-for="data1 in dataResponseOpd" :key="data1.id"> 
                            <li class="list-group-item"><p>Plat Nomor : <strong>{{ data1.plat_nomor }}</strong></p> <router-link :to="{name: 'detail', params: {id: data1.id,category: 1}}" class="btn btn-primary">Detail</router-link></li>
                        </ul>
                    </div>
                    <div class="bg-danger rounded-2 p-2 text-white" v-else>
                      Data Belum Tersedia 
                    </div>
                </div> 
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabindex="0"
              >
                <div class="list-data" v-if="dataResponseKir.length > 0">
                    <div class="list-data-angkutan-umum-orang">
                        <ul class="list-group mt-2" v-for="dataKir in dataResponseKir" :key="dataKir.id">
                            <li class="list-group-item"><p>Plat Nomor : <strong>{{ dataKir.nomor_kendaraan }}</strong></p> <router-link :to="{name: 'detail', params: {id: dataKir.id,category: 2}}" class="btn btn-primary">Detail</router-link></li>
                        </ul>
                    </div>
                </div> 
                <div class="bg-danger rounded-2 p-2 text-white" v-else>
                    Data Belum Tersedia
                </div>
              </div>
            </div>
           
            <router-link to="/home" class="mt-2 btn btn-primary"
              >Kembali</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* .active {
  background-color: #0d6efd !important;
} */
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

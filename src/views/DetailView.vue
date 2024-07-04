<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import MenuComponents from "../components/MenuComponents.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { service2 } from "../utils/Api";
import { useAuthStore } from "../store/auth";
import LoadingComponentsVue from "../components/LoadingComponents.vue";
import {formatLabel,isNumeric,formatValue} from "../utils/Common"
const loading = ref(null)
const auth = useAuthStore();
const router = useRouter();
const id = computed(() => useRoute().params.id);
const responseDataKir = ref(null)
let datas = reactive({})
const category = computed(() => useRoute().params.category);
const fetchData = async () => {
  try {
    const response = await axios.get(`${service2}detail-plat-number`,{
      params:{
        id:id.value,
        category:category.value
      }
    }) 

     datas = response.data.data
     console.log(datas.plat_nomor ? datas.plat_nomor : datas.nomor_kendaraan);
     let getDataKir = await axios.get(`${service2}detail-kir/${datas.plat_nomor ? datas.plat_nomor : datas.nomor_kendaraan}`) 
     responseDataKir.value = getDataKir.data.status_kir
     console.log(responseDataKir.value);


     
    } catch (error) {
    console.log(error);
  }
  
};
onMounted(async() => {
  setTimeout(async() => {
    const authStore = useAuthStore();
    loading.value = true
    // console.log(await authStore.verify());
    if(await authStore.verify() == false)
    {
      router.push("/"); 
    }
  },3000)
  fetchData();
});
</script>
<template>
  <LoadingComponentsVue v-if="loading == null"/>
  <div class="home" v-else>
    <MenuComponents/>
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card border-0">
          <div class="card-body">
            <h5 class="mt-4 mb-2">Detail Data</h5>
            <div class="alert alert-info fw-bold" v-if="category == 1">Angkutan Angkutan Umum Orang <strong></strong></div>  
            <div class="alert alert-warning fw-bold" v-if="category == 2">Angkutan Umum Barang <strong></strong></div>  
            <div class="form-group mb-3">
            </div>
            <div v-for="(value, key) in datas" :key="key" class="form-group mb-2">
              <label class="mb-2">{{ formatLabel(key) }}</label>
              <input disabled class="form-control" v-if="typeof value === 'string'" v-model="datas[key]" :placeholder="formatLabel(key)"  />
              <textarea class="form-control" v-if="typeof value === 'text'" v-model="datas[key]" :placeholder="formatLabel(key)"></textarea>
            </div>
            <div class="form-group" v-if="responseDataKir">
              <h5 class="fw-bold mt-3">Riwayat Pembayaran Kir</h5>
              <input type="text" v-model="responseDataKir" class="form-control mt-2 mb-2" disabled>
            </div>
            <router-link to="/home" class="btn btn-primary">Kembali</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

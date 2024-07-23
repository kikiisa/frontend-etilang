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
    } catch (error) {
     responseDataKir.value = null
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
              <div v-if="value == 1">
                <span class="badge bg-success">Berlaku</span>
              </div>
              <div v-else-if="value == 2">
                <div class="badge bg-warning">Tidak Valid</div>
              </div>
              <div v-else-if="value == 0">
                <span class="badge bg-danger">Tidak Berlaku</span>
              </div>
              <div v-else>
                <input disabled class="form-control" v-if="typeof value === 'string'" v-model="datas[key]" :placeholder="formatLabel(key)"  />
                <textarea class="form-control" v-if="typeof value === 'text'" v-model="datas[key]" :placeholder="formatLabel(key)"></textarea>
              </div>
            
            </div>
            <div class="form-group" v-if="responseDataKir != null">
              <h5 class="fw-bold mt-3">Status Pembayaran Kir</h5>
              <div class="badge bg-success"  v-if="responseDataKir == 1">Status Kir Masih Berlaku</div>
              <div class="badge bg-danger"  v-if="responseDataKir == 0">Status Kir Tidak Berlaku</div>
            </div>
            <div v-else>
              <h5 class="fw-bold mt-3">Riwayat Pembayaran Kir</h5>
              <div class="badge bg-warning"  v-if="responseDataKir == null">Status Kir Tidak Di Ketahui</div>
            </div>
            <router-link to="/home" class="btn btn-primary mt-3">Kembali</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import MenuComponents from "../components/MenuComponents.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { service2 } from "../utils/Api";
const detailData = reactive({
  plat_nomor: "",
  jenis_kendaraan: "",
  nama_pemilik: "",
});
const router = useRoute();
const id = computed(() => router.params.id);
const category = computed(() => router.params.category);
const fetchData = async () => {
  await axios
    .post(`${service2}detail-plat-number`, {
      id: id.value,
      category: category.value,
    })
    .then((response) => {
      const {nama,plat_nomor} = response.data.data;
      detailData.nama_pemilik = nama;
      detailData.plat_nomor = plat_nomor;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
onMounted(() => {
  fetchData();
});
</script>
<template>
  
  <div class="home">
    <MenuComponents />
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card border-0">
          <div class="card-body">
            <h5 class="mt-4 mb-2">Detail Data</h5>
            <div class="alert alert-warning fw-bold" v-if="category == 1">Angkutan Plat Kuning <strong>{{ detailData.nomor_kendaraan }}</strong></div>  
            <div class="alert alert-warning fw-bold" v-if="category == 2">Angkutan Plat Kuning <strong>{{ detailData.nomor_kendaraan }}</strong></div>  
            
            <div class="form-group mb-3">
              <label for="namaPemilik" class="mb-2">Nama Pemilik</label>
              <input
                type="text"
                class="form-control"
                id="namaPemilik"
                placeholder="Masukkan Nama Pemilik"
                :value="detailData.nama_pemilik"
                />
            </div>
            <div class="form-group mb-3">
              <label for="jenisKendaraan" class="mb-2">Jenis Kendaraan</label>
              <input
                type="text"
                class="form-control"
                id="jenisKendaraan"
                placeholder="Masukkan Jenis Kendaraan"
                :value="detailData.jenis_kendaraan ? detailData.jenis_kendaraan : '-'"
                />
            </div>
            <div class="form-group mb-3">
              
              <label for="nomorKendaraan" class="mb-2">Nomor Kendaraan</label>
              <input
                type="text"
                class="form-control"
                id="nomorKendaraan"
                placeholder="Masukkan Nomor Kendaraan"
                :value="detailData.plat_nomor"
              />
            </div>
            <router-link to="/home" class="btn btn-primary">Kembali</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

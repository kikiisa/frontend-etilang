<script setup>
import axios from "axios";
import {service2} from "../utils/Api"
import { defineProps, reactive, ref, watch } from "vue";
import { toastError,toastSuccess } from "../utils/Toast";
import { useRouter } from "vue-router";
const props = defineProps({
  platnumber: {
    type: String,
    required :true,
  },
});
let nomor_kendaraan =  ref(props.platnumber)
const formData = reactive({
  plat_nomor: nomor_kendaraan,
  nama_pemilik: "",
  badan_usaha: "",
  tahun: "",
  izin_trayek:"",
  "phone":"",
});

watch(
  () => props.platnumber,
  (newVal) => {
    nomor_kendaraan.value = newVal;
  }
);
const handleSubmit = async () => 
{
  try {
    const response = await axios.post(`${service2}add-angkutan-umum`,formData);
    if(response.data.status == true)
    {
        formData.plat_nomor =""
        formData.badan_usaha = ""
        formData.nama_pemilik = ""
        formData.badan_usaha = ""
        formData.tahun = ""
        formData.izin_trayek = ""   
        formData.phone = ""  
        // useRouter().push("/home")
        toastSuccess("Berhasil Menambahkan Kendaraan")
        setTimeout(() => {
          window.location.reload()
        },2000)

    }else{
        toastError("Terjadi Kesalahan")
    }
  } catch (error) {
    const errors = error.response.data
    console.log(error);
    Object.keys(errors).forEach((field) => {
        errors[field].forEach((error)=>{
            toastError(error)
        })
    });
  }
};
</script>
<template>
  <div
    class="modal"
    id="add1"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Tambah Data Angkutan Umum Orang
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form  @submit.prevent.once.stop="handleSubmit">
            <div class="form-group mb-2">
              <label>Nomor Kendaraan</label>
              <input
                required
                type="text"
                v-model="formData.plat_nomor"
                class="form-control"
                placeholder="Nomor Kendaraan"
              />
            </div>
            <div class="form-group mb-2">
              <label>Nama Pemilik </label>
              <input
                required
                type="text"
                v-model="formData.nama_pemilik"
                class="form-control"
                placeholder="Nama Pemilik"
              />
            </div>
            <div class="form-group mb-2">
              <label>Nomor Telepon </label>
              <input
                required
                type="text"
                v-model="formData.phone"
                class="form-control"
                placeholder="Nomor Telephon / Whatsapps"
              />
            </div>
            <div class="form-group mb-2">
              <label>Badan Usaha </label>
              <input
                required
                type="text"
                v-model="formData.badan_usaha"
                class="form-control"
                placeholder="Badan Usaha"
              />
            </div>
            
            <div class="form-group mb-2">
              <label>Tahun Pembuatan</label>
              <input
                required
                type="text"
                v-model="formData.tahun"
                class="form-control"
                placeholder="Tahun"
              />
            </div>
            <div class="form-group mb-2">
              <label>Izin Trayek </label>
              <input
                required
                type="text"
                v-model="formData.izin_trayek"
                class="form-control"
                placeholder="Izin Trayek"
              />
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      
      </div>
    </div>
  </div>
</template>

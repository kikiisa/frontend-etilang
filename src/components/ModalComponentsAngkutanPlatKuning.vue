<script setup>
import axios from "axios";
import { defineProps, reactive,computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {service2} from "../utils/Api"
import { toastError,toastSuccess } from "../utils/Toast";
const props = defineProps({
  platnumber: {
    type: String,
    required: true,
  },
});
let nomor_kendaraan =  ref(props.platnumber)

const sendForm = reactive({
  nomor_kendaraan: nomor_kendaraan,
  merek: "",
  nama_pemilik: "",
  tahun: "",
  keterangan: "",
  jenis_kendaraan:"",
  "phone":"",
});

watch(
  () => props.platnumber,
  (newVal) => {
    nomor_kendaraan.value = newVal;
  }
);
const handlePost = async () => {
  try {
    const response = await axios.post(`${service2}add-plat-kuning`,sendForm)
    if(response.data.status == true)
    {
        sendForm.nomor_kendaraan = ""
        sendForm.merek = ""
        sendForm.nama_pemilik = ""
        sendForm.keterangan = ""
        sendForm.tahun = ""
        sendForm.jenis_kendaraan = ""
        sendForm.phone = ""

        toastSuccess("Berhasil Menambahkan Kendaraan")
        window.location.reload();
    }else{
      toastError("Terjadi Kesalahan");
    }
  } catch (error) {
    const {data} = error.response
    Object.keys(data).forEach((field) => {
        data[field].forEach((error)=>{
            toastError(error)
        })
    });
    console.log(data);
  }
};
</script>
<template>
  <div
    class="modal"
    id="add2"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Angkutan Umum Barang
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent.once.stop="handlePost">
              <div class="form-group mb-3">
                <label for="platnumber" class="mb-2">Plat Nomor</label>
                <input
                  type="text"
                  class="form-control"
                  id="platnumber"
                  required
                  placeholder="Plat Number"
                  v-model="sendForm.nomor_kendaraan"
                />
              </div>
              <div class="form-group mb-3">
                <label for="nama_pemilik" class="mb-2">Nama Pemilik</label>
                <input
                  type="text"
                  class="form-control"
                  id="nama_pemilik"
                  required
                  placeholder="Nama Pemilik"
                  v-model="sendForm.nama_pemilik"
                />
              </div>
              <div class="form-group mb-3">
                <label for="tahun" class="mb-2">Tahun</label>
                <input
                  type="text"
                  class="form-control"
                  id="tahun"
                  required
                  placeholder="Tahun"
                  v-model="sendForm.tahun"
                />
              </div>
              <div class="form-group mb-3">
                <label for="merek" class="mb-2">Merek Kendaraan</label>
                <input
                  type="text"
                  class="form-control"
                  id="merek"
                  required
                  placeholder="Merek Kendaraan"
                  v-model="sendForm.merek"
                />
              </div>
              <div class="form-group mb-3">
                <label for="jenis_kendaraan" class="mb-2">Jenis Kendaraan</label>
                <select name="jenis_kendaraan" class="form-control" id="jenis_kendaraan" v-model="sendForm.jenis_kendaraan">
                  <option value="" selected disabled>Pilih Jenis Kendaraan</option>
                  <option value="Bus">Bus</option>
                  <option value="Mini Bus">Mini Bus</option>
                  <option value="Kontainer">Kontainer</option>
                </select>
              </div>
              <div class="form-group">
                <label for="phone" class="mb-2">Nomor Telephone / Whatsapps</label>
                <input type="text" placeholder="Phone" v-model="sendForm.phone" class="form-control">
              </div>
              <div class="form-group mb-3">
                <label for="merek" class="mb-2">Keterangan</label>
              <textarea class="form-control" placeholder="Keterangan" v-model="sendForm.keterangan"></textarea>
              </div>
              <button class="btn btn-primary">Tambah Data</button>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

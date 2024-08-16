<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import MenuComponents from "../components/MenuComponents.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { service2 } from "../utils/Api";
import { useAuthStore } from "../store/auth";
import LoadingComponentsVue from "../components/LoadingComponents.vue";
import { toastError, toastSuccess } from "../utils/Toast";
const loading = ref(null)
const auth = useAuthStore();
const detailData = reactive({
  id:"",
  nama: "",
  username:"",
  email:"",
  password: "",
  confirm:"",
});
const sendData = async () => 
{
    try {
        const response = await axios.put(`${service2}update-profile`,detailData);
        const { message,status } = response.data
        if(status == true)
        {
            detailData.confirm = ""
            detailData.password = ""
            toastSuccess(message)
        }else{
            toastError(message)
        }
    } catch (error) {
        const response = error.response.data.errors
        Object.keys(response).forEach((field) => {
        response[field].forEach((error) => {
            toastError(error)
            // errorNotif.value.push(error)
        });
      });
    }
}
const router = useRouter();
onMounted(async() => {
  setTimeout(async() => {
    
    loading.value = true
    // console.log(await authStore.verify());
    if(await auth.verify() == false)
    {
      router.push("/"); 
    }
    detailData.username = await auth.authUser?.username
    detailData.id = await auth.authUser?.id;
    detailData.nama = await auth.authUser?.name;
    detailData.email = await auth.authUser?.email;
  },2000)
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
            <h5 class="mt-4 mb-2">Profile</h5>
            <form @submit.prevent="sendData">
              <div class="form-group mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" v-model="detailData.username" class="form-control">
              </div>
              <div class="form-group mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="detailData.nama"
                />
              </div>
              <div class="form-group mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="detailData.email"
                />
              </div>
              <div class="form-group mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="detailData.password" placeholder="Password Baru" class="form-control">
              </div>
              <div class="form-group mb-3">
                <label for="password" class="form-label">Konfirmasi Password</label>
                <input type="password" v-model="detailData.confirm" placeholder="Password Baru" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary">Simpan</button>
              <router-link to="/home" class="btn btn-outline-primary ms-2">Kembali</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { toastError } from "../utils/Toast";
const form = reactive({
  email: "",
  password: "",
});
const errorNotif = ref([])
const router = useRouter();
onMounted(async() => {
  if(await useAuthStore().verify() == true)
  {
    router.push("/home")
  }
})
const handleLogin = async () => {
  const response = await useAuthStore().login(form.email, form.password);
  const {status} = response.request
  if (status == 400) {
      const error = response.response.data
      console.log(response);
      Object.keys(error).forEach((field) => {
        error[field].forEach((error) => {
            toastError(error)
            // errorNotif.value.push(error)
        });
      });
  }
  if(status == 401)
  {
    // console.log(401,response.response.data);
    form.password = ""
      
    toastError(response.response.data.message)
  }
  if(status == 200)
  { 
    router.push("/home")
    // console.log(200,response);
  }
};
</script>
<template>
  <div class="container">
    <div class="row vh-100 d-flex justify-content-center align-items-center">
      <div class="col-lg-10">
        <div class="text-center">
          <img
            src="https://andalalin-go.gorontaloprov.go.id/theme/images/gorontalo.svg"
            width="75"
            alt=""
            srcset=""
          />
        </div>
        <div class="card border-0 shadow mt-4">
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <h5 class="text-start">Login To Account</h5>
              <div class="form-group">
                <label for="email" class="fw-bold">Email</label>
                <input
                  required
                  type="text"
                  v-model="form.email"
                  placeholder="Enter Email"
                  class="mt-2 rounded-6 form-control"
                />
              </div>
              <div class="form-group mt-3">
                <label for="password" class="fw-bold">Password</label>
                <input
                 required
                  type="password"
                  id="password"
                  v-model="form.password"
                  placeholder="Enter Password"
                  class="mt-2 rounded-6 form-control"
                />
              </div>
              <button class="btn btn-primary fw-bold mt-3 w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  border-radius: 20px;
}
input {
  border-radius: 30px;
}
button {
  border-radius: 30px;
}
</style>

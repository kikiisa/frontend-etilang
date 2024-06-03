<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
const auth = useAuthStore();
const router = useRouter();
const logout = async () => 
{
  if(await auth.logout() == true)
  {
    router.push("/");
  }
};
</script>
<template>
  <section class="container">
      <div class="mb-0 mt-2">
        <h6 class="mb-2">Selamat Datang,<span class="fw-bold ms-2">{{ auth.authUser?.name }}</span></h6>

        <div class="row row-cols-4 g-2">
          <router-link  to="home" class="col-md-4 home-menu" style="width: 25%;text-decoration: none;">
                <div class="text-center p-2">
                 
                  <img
                    style="width: 30px"
                    src="https://cdn-icons-png.flaticon.com/128/15527/15527317.png"
                  />
                  <p
                    style="color: #000; cursor: pointer"
                    class="small pt-0 m-0 cursor"
                  >
                    Home
                  </p>
                </div>
              
          </router-link>
          <div class="col-md-4" style="width: 25%">
            <router-link to="profile" style="text-decoration: none;">
              <div
                class="text-center p-2"
                style="
                  background: #ececec;
                  border-radius: 10px;
                  color: #fff;
                  border: 1px #e8e8e8 solid;
                "
              >
                <img
                  style="width: 30px"
                  src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                />
                <p
                  style="color: #000; cursor: pointer"
                  class="text-wrapper small pt-0 m-0 cursor"
                >
                  Profile
                </p>
              </div>
            </router-link>
          </div>
          <div class="col-md-4" style="width: 25%">
            <router-link to="history" style="text-decoration: none;">
              <div
                class="text-center p-2"
                style="
                  background: #ececec;
                  border-radius: 10px;
                  color: #fff;
                  border: 1px #e8e8e8 solid;
                "
              >
                <img
                  style="width: 30px"
                  src="https://cdn-icons-png.flaticon.com/128/13471/13471973.png"
                />
                <p
                  style="color: #000; cursor: pointer"
                  class="text-wrapper small pt-0 m-0 cursor"
                >
                  History 
                </p>
              </div>
            </router-link>
          </div>
          <div class="col-md-4" style="width: 25%">
            
            <div
              @click="logout"
              class="text-center p-2"
              style="
                background: #ececec;
                border-radius: 10px;
                color: #fff;
                border: 1px #e8e8e8 solid;
              "
            >
              
              <img
                style="width: 30px"
                src="https://cdn-icons-png.flaticon.com/128/10309/10309341.png"
              />
              <p
                style="color: #000; cursor: pointer"
                class="text-wrapper small pt-0 m-0 cursor"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>
<style scoped>
  
</style>

import { defineStore } from "pinia";
import axios from "axios";
import { service2 } from "../utils/Api";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authUser: null,

  }),
  getters: {
    user: (state) => state.authUser,
    isAuthenticated: (state) => !!state.authUser,
},
  
  actions: {
    async logout()
    {
        try {
            const response = await axios.post(`${service2}logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            this.authUser = null;
            window.localStorage.removeItem("token")
            return true
        } catch (error) {
            return false
        }
    },
    async verify()
    {   
        let token = window.localStorage.getItem("token");
        if(token)
        {
            try {
                
                const response = await axios.get(`${service2}user`, {
                    headers: {
                      Authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                  })
                  if(response.request.status == 401)
                  {
                        return false
                  }else{
                    this.authUser = response.data
                    return true
                  }
            } catch (error) {
                return false
            }
        }else{
           
            return false
        }
    },
    async login(email, password) {
      return await axios
        .post(`${service2}login`, {
          email,
          password,
        })
        .then((response) => {
          this.authUser = response.data.user;
          window.localStorage.setItem("token",response.data.token)
          return response;
        })
        .catch((error) => {
          return error;
        });
    },
  },
});

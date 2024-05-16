<script>
import Camera from "simple-vue-camera";
import { ref, reactive } from "vue";
import { dataURLToBlob, filterSpasi, nameFileRandom } from "../utils/blob";
import { baseUrl } from "../utils/Api";
import LoadingComponents from "./LoadingComponents.vue";
import { toastError, toastSuccess } from "../utils/Toast";
import axios from "axios";
export default {
  components: {
    Camera,
    LoadingComponents,
  },
  setup() {
    const camera = ref(Camera);
    const isLoading = ref(null);
    const plateNumber = ref(null);
    const responseData = reactive({
      result: "",
      message: "",
    });
    const resetData = () => {
      responseData.result = "";
      isLoading.value = null;
      window.location.reload();
    };
    const recognizePicture = async () => {
      const file = await camera.value?.snapshot();
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        isLoading.value = true;
        let result = reader.result;
        let blob = dataURLToBlob(result);
        const formData = new FormData();
        formData.append(
          "image",
          new File([blob], `${nameFileRandom("scan-")}.png`, {
            type: "image/png",
          })
        );
        await axios
          .post(baseUrl + "service-image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.result == "") {
              console.log(response.data.result);

              isLoading.value = false;
              toastError("Plat Nomor Tidak Terdeteksi");
            } else {
              setInterval(() => {
                responseData.result = filterSpasi(response.data.result);
                plateNumber.value = response.data.result;
                isLoading.value = false;
              }, 2000);
            }
          })
          .catch((err) => {
            isLoading.value = null;
            toastError("Terjadi Kesalahan !");
            console.log(err);
          });
        // serviceImage(new File([blob], `${nameFileRandom('scan-')}.png`, { type: 'image/png' }))
      };
    };
    return {
      camera,
      recognizePicture,
      isLoading,
      responseData,
      resetData,
      plateNumber,
    };
  },
};
</script>

<template>
  <div class="col-lg-8">
    <div class="card border-0">
      <div class="card-body">
        <div
          class="bg-info p-4 rounded-4 text-center text-light fw-bold mb-3"
          v-if="isLoading == null"
        >
          Foto Plat Nomor Kendaraan 📷
        </div>
        <div class="result-scan" v-if="responseData.result != ''">
          <div class="alert alert-success">Plat Nomor Terdaftar</div>
          <div class="form-group">
            <label for="plate-number" class="fw-bold mb-2">Plate Number</label>
            <input
              type="text"
              v-model="plateNumber"
              id="plate-number"
              class="form-control fw-bold"
            />
          </div>
          <div class="form-group">
            <label for="plate-number" class="fw-bold mb-2 mt-3"
              >Nama Pemilik</label
            >
            <input
              type="text"
              value="kiki"
              id="plate-number"
              class="form-control fw-bold"
            />
          </div>

          <div class="form-group">
            <label for="plate-number" class="fw-bold mb-2 mt-3"
              >Status Kartu Pengawasan :
              <span class="badge bg-danger">Kadalduarsa</span></label
            >
            <span class="badge bg-success"></span>
            <br />
            <label for="plate-number" class="fw-bold mb-2 mt-3"
              >Status Izin Trayek : <span class=""></span
            ></label>
            <span class="badge bg-success"></span>
            <br />
            <label for="plate-number" class="fw-bold mb-2 mt-3"
              >Status Kir :
            </label>
            <span class="badge bg-success"></span>
          </div>

          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#angkutan_umum_orang"
          >
            Data Angkutan Umum Orang
          </button>
          <button class="btn btn-warning mt-2 fw-bold mb-4 ms-2">
            Tambah Data Angkutan Umum Barang
          </button>
        </div>
        <camera ref="camera" v-if="isLoading == null" autoplay></camera>
        <LoadingComponents class="text-center" v-if="isLoading == true" />
        <button class="btn btn-primary fw-bold mt-2" @click="recognizePicture">
          Scan Plat Nomor
        </button>
        <button class="btn btn-dark ms-2 fw-bold mt-2" @click="resetData">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.camera {
  margin-top: 50px;
}
</style>

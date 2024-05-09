import axios from "axios";
const baseUrl = "https://386d-36-85-223-195.ngrok-free.app/api/";

export const serviceImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    await axios
        .post(baseUrl + "service-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            alert(response.data.result);
            // console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
};


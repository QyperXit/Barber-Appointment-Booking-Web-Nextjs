const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/", // Note the correct spelling of baseURL
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCatergory = () => axiosClient.get("/catergories?populate=*");
const getDoctorList = () => axiosClient.get("/doctors?populate=*");

export default { getCatergory, getDoctorList };

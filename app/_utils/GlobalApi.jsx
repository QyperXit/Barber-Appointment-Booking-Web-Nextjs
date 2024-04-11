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
const getDoctorByCategory = (category) =>
  axiosClient.get(
    `/doctors?filters[catergories][Name][$in]=${category}&populate=*`
  );
const bookApointment = async (data) => {
  try {
    const response = await axiosClient.post("/appointments", data);
    // Handle successful booking (e.g., display a confirmation message)
    return response.data; // Optional: return the response data if needed
  } catch (error) {
    console.error("Error booking appointment:", error);
    // Handle errors (e.g., display an error message to the user)
  }
};

console.log(bookApointment());

const doctorId = 3; // Replace with the actual doctor ID
const getDoctorById = async (id) => {
  try {
    const response = await axiosClient.get(`/doctors/${id}?populate=*`);
    return response.data; // Return doctor data
  } catch (error) {
    console.error("Error fetching doctor:", error);
    // Handle error (e.g., display an error message to the user)
  }
};

// console.log(getDoctorByCategory());
// console.log(getDoctorById(doctorId));

export default {
  getCatergory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookApointment,
};

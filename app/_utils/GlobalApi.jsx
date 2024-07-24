const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
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

    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
  }
};

const getDoctorById = async (id) => {
  try {
    const response = await axiosClient.get(`/doctors/${id}?populate=*`);

    return response.data; // Return doctor data
  } catch (error) {
    console.error("Error fetching doctor:", error);
  }
};

// const sendEmail = (data) => axios.post("/api/sendEmail", data);
const sendEmail = async (data) => {
  try {
    const response = await axios.post("/api/sendEmail", data);
    console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error so it can be caught and handled by the caller
  }
};

const getAppointments = async () => {
  try {
    const response = await axiosClient.get("/appointments");

    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};

const getUserBookingList = (userEmail) => {
  const params = new URLSearchParams({
    "filters[Email][$eq]": userEmail,
    "populate[doctor][populate][Image][populate][0]": "url",
    populate: "*",
  });

  return axiosClient.get(`/appointments?${params}`);
};

const DeleteBooking = (id) => axiosClient.delete(`/appointments/${id}`);
const GetIcons = (id) => axiosClient.get(`/icons/${id}/?populate=*`);

export default {
  getCatergory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookApointment,
  sendEmail,
  GetIcons,
  getUserBookingList,
  DeleteBooking,
  getAppointments,
  // checkExistingBookings,
};

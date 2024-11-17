const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCatergory = () => axiosClient.get("/catergories?populate=*");
const getBarberList = () => axiosClient.get("/doctors?populate=*");
const getBarberByCategory = (category) =>
    axiosClient.get(
        `/doctors?filters[catergories][Name][$in]=${category}&populate=*`
    );

const bookAppointment = async (data) => {
  try {
    const response = await axiosClient.post("/appointments", data);

    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
  }
};

const getBarberById = async (id) => {
  try {
    const response = await axiosClient.get(`/doctors/${id}?populate=*`);

    return response.data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
  }
};

const getAppointmentById = async (id) => {
  try {
    const response = await axiosClient.get(`/appointments/${id}?populate=*`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error;
  }
};

// const sendEmail = (data) => axios.post("/api/sendEmail", data);
const sendEmail = async (data) => {
  try {
    const response = await axios.post("/api/sendEmail", data);
    // console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
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

const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await axiosClient.put(`/appointments/${id}`, {
      data: { status },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

const DeleteBooking = (id) => axiosClient.delete(`/appointments/${id}`);
const GetIcons = (id) => axiosClient.get(`/icons/${id}/?populate=*`);

export default {
  getCatergory,
  getBarberList,
  getBarberByCategory,
  getBarberById,
  bookAppointment,
  sendEmail,
  GetIcons,
  getUserBookingList,
  DeleteBooking,
  getAppointments,
  updateAppointmentStatus,
  getAppointmentById,
  // checkExistingBookings,
};

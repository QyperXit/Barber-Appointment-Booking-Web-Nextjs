const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://appointment-booking-backend-s6js.onrender.com/api/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCatergory = () => axiosClient.get("/catergories?populate=*");
const getBarberList = () => axiosClient.get("/doctors?populate=*");
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

// Function to fetch appointment details by ID
const getAppointmentById = async (id) => {
  try {
    const response = await axiosClient.get(`/appointments/${id}?populate=*`);
    return response.data; // Return the appointment data including the ID
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error; // Re-throw the error to handle it elsewhere
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

const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await axiosClient.put(`/appointments/${id}`, {
      // data: { status: status },
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
  getDoctorByCategory,
  getDoctorById,
  bookApointment,
  sendEmail,
  GetIcons,
  getUserBookingList,
  DeleteBooking,
  getAppointments,
  updateAppointmentStatus,
  getAppointmentById,
  // checkExistingBookings,
};

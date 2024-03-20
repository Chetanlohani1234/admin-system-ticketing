import axios from "axios";
import AuthService from "../services/auth.service";

//const API_URL = (process.env.NODE_ENV != 'production' ? "https://opm-stream.onrender.com/" : "https://opm-stream.onrender.com/");
//const API_URL = (process.env.NODE_ENV != 'production' ? "http://localhost:5000/" : "http://localhost:5000/");
const API_URL = (process.env.NODE_ENV != 'production' ? "https://system-ticketing-backend.onrender.com/" : "https://system-ticketing-backend.onrender.com/");

//https://ticket-backend-system.onrender.com
axios.interceptors.request.use(function (config) {
  const token = AuthService.getCurrentUserTokken();
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem("user");
    window.location.href = '/#/login'

  }
  return Promise.reject(error);
});
const addEvent = (data) => {
  return axios.post(API_URL + "api/ownerEvent/add", data);
};
//http://localhost:3000/api/ownerEvent/add

const getEvent = (id) => {
  return axios.get(API_URL + "api/ownerEvent/getAllByUserId/"+id);
};

//http://localhost:3000/api/ownerEvent/getAllByUserId/43536467

const getSingleEvent = (id) => {
  return axios.get(API_URL + "api/ownerEvent/getById/" + id);
};
//http://localhost:3000/api/ownerEvent/getById/65979e8c38966379ad7faeef

const addTicketing = (data) => {
  return axios.post(API_URL + "api/create-post", data);
};

const getTicket = () => {
  return axios.get(API_URL + "api/get-posts");
};

const getSingleTicket = (id) => {
  return axios.get(API_URL + "api/get-postsById/" + id);
};
//http://localhost:3000/api/ownerVenue/getById/6597a6b19eb050bc474e220e

const updateTicket = (id, data) => {
  return axios.put(API_URL + "api/update-post/" + id, data);
};


const deleteTicket = (_id) => {
  return axios.delete(API_URL + "api/delete-post/" + _id);
};

const getUserDetail = (id) => {
  return axios.get(API_URL + "api/user/getUserById/"+ id);
};

const submitComment = (data) => {
  return axios.post(API_URL + "api/user/comment", data);
};

const getComment = () => {
  return axios.get(API_URL + "api/user/getComment");
};

const getComments = (_id) => {
  return axios.get(API_URL + "api/user/getCommentById/" + _id);
};

const getVenue = (id) => {
  return axios.get(API_URL + "api/ownerVenue/getAllByUserId/"+id);
};

const deleteEvent = (_id) => {
  return axios.delete(API_URL + "api/ownerEvent/delete/" + _id);
};

//http://localhost:3000/api/ownerVenue/delete/6597a6b19eb050bc474e220e

// const getSingleEvent = (id) => {
//   return axios.get(API_URL + "api/venue/getById/" + id);
// };
//http://localhost:3000/api/venue/getById/6594f3e6ed4ca8b2642979f4

const updateEvent = (id, data) => {
  return axios.put(API_URL + "api/ownerEvent/update/" + id, data);
};

//http://localhost:3000/api/ownerEvent/update/65979e8c38966379ad7faeef

const addArtist = (data) => {
  return axios.post(API_URL + "api/artist/add", data);
};
//http://localhost:3000/api/artist/add

const getArtist = (id) => {
  return axios.get(API_URL + "api/artist/getAllById/"+id);
};
//http://localhost:3000/api/artist/getAllById/65955ab83f6f1a517910e524

const getSingleArtist = (id) => {
  return axios.get(API_URL + "api/artist/getById/" + id);
};
//http://localhost:3000/api/artist/getById/659512f3757d4db2e977bc5c

const updateArtist = (id, data) => {
  return axios.put(API_URL + "api/artist/update/" + id, data);
};
//http://localhost:3000/api/artist/update/659512f3757d4db2e977bc5c


const deleteArtist = (_id) => {
  return axios.delete(API_URL + "api/artist/delete/" + _id);
};

//http://localhost:3000/api/artist/delete/659512f3757d4db2e977bc5c

const addCategory = (data) => {
  return axios.post(API_URL + "api/category/add", data);
};

//http://localhost:3000/api/category/add


const getCategory = (type) => {
  return axios.get(API_URL + "api/category/getAllByType?type=" + type);
};

//http://localhost:3000/api/category/getAllByType?type=1&front=yes

const getNotifications = (id) => {
  return axios.get(API_URL + "api/notification/getOwnerNotification/"+id);
};
//http://localhost:3000/api/category/getAll

// const getCategory = (type) => {
//   return axios.get(API_URL + "api/categories/getAll?type=" + type);
// };





//http://localhost:3000/api/slotTime/getSlotTimeById/657692bc27c4abc45539de33/657692bc27c4abc45539de36



// const addCategory = (data) => {
//   return axios.post(API_URL + "api/categories/add", data);
// };



// const getUserDetail = () => {
//   return axios.get(API_URL + "api/users/detail");
// };



//http://localhost:3000/api/user/getById/6595464c55e8328ba9038040



const changePassword = (id,data)  => {
  return axios.put(API_URL + "api/user/changePassword/" +id,data);
};

//http://localhost:3000/api/user/changePassword/6595464c55e8328ba9038040
// const getDashboard = () => {
//   return axios.get(API_URL + "api/dashboard");
// };






// const getNotifications = (read = false) => {
//   return axios.get(API_URL + "api/users/notifications"+(read == true ? "?read=yes" : ""));
// };
const getAllCategory = (type) => {
  return axios.get(API_URL + "api/categories/getAll");
};
const getAllFilter = (a, b, c, d, e, f) => {
  return axios.get(API_URL + "api/studentRegistration/getfilteredCampRegistration?name=" + a + "&gender=" + b + "&birthYear=" + c + "&location=" + d + "&position=" + e + "&skillLevel=" + f );
};

// const sendEmailToCampRegistrations = (data) => {
//   return axios.post(API_URL + "api/studentRegistration/sendMailToCampRegistrations", data);
// };

const updateCategory = (data,id) => {
  return axios.put(API_URL + "api/category/update/" +  id,data);
};

const getCategoryDetail = (id) => {
  return axios.get(API_URL + "api/category/getById/" + id);
};
const DataService = {
  //sendEmailToCampRegistrations,
  getAllFilter,
  getAllCategory,
   
  //addLesson,


  addEvent,
  getEvent,

  addTicketing,
  getTicket,
  deleteTicket,
  getSingleTicket,
  updateTicket,
  getUserDetail,
  submitComment,
  getComment,
  getComments,

  getVenue,
  getSingleEvent,
  updateEvent,
  deleteEvent,

  addArtist,
  getArtist,
  getSingleArtist,
  updateArtist,
  deleteArtist,
  addCategory,
  getCategory,
  changePassword,

  updateCategory,
  getCategoryDetail,
  
 
  
  
 

  
  
  
  
  
  

  getNotifications,
}
export default DataService;
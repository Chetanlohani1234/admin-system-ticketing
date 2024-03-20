import axios from "axios";

//const API_URL = (process.env.NODE_ENV != 'production' ? "https://opm-stream.onrender.com/" : "https://opm-stream.onrender.com/");
const API_URL = (process.env.NODE_ENV != 'production' ? "https://system-ticketing-backend.onrender.com/" : "https://system-ticketing-backend.onrender.com/");


const register = (username, email, password) => {
  return axios.post(API_URL + "api/user/register", {
    username,
    email,
    password,
  });
};

// const login = (username, password) => {
//   return axios
//     .post(API_URL + "api/superAdmin/login", {
//       email:username,
//       password,
//       // role:"admin"
//     })
//     .then((response) => {
//       console.log(response.data.data)
//       if (response.data.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data.data.user.email));
//         localStorage.setItem("accessToken", JSON.stringify(response.data.data.accessToken));
//       }

//       return response.data;
//     });
// };

const login = (username, user_pass) => {
  return axios
    .post(API_URL + "api/admin/logIn", {
      email: username,
      password: user_pass,
      role: "admin"
    })
    .then((response) => {
      if (response.data.success) {
        const { admin, aceesToken } = response.data.data;
       // localStorage.setItem("user", JSON.stringify(response.data.data.user.email));
        // Store user ID and access token in local storage
        //localStorage.setItem("userId", JSON.stringify(user._id));
        //localStorage.setItem("token", JSON.stringify(aceesToken));

        // Optionally, you can store the entire user object in local storage
        //localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(admin));
        localStorage.setItem("userId", JSON.stringify(admin._id));
        localStorage.setItem("accessToken", JSON.stringify(aceesToken));
      }

      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};


// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};


// const getCurrentUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };




const getCurrentUserTokken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserTokken
}

export default AuthService;
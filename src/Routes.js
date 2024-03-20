import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import {HashRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/login";
import Dashboard from "./pages/dashboard";
import Otp from "./pages/otp";

import { RestrictedAccess } from "./private-component/RestrictedAccess";
import MyProfile from "./pages/myprofile";

//import EditProfile from "./pages/edit-profile";
import ViewReview from "./pages/review";
import ReviewDetails from "./pages/review-detail";
import Forgot from "./pages/Forgot";
import Resetpassword from "./pages/reset-password";
import SingleReviewDetail from "./section/home/review/view-review";

import AddTicket from "./pages/add-ticket";
import Ticket from "./pages/ticket";
import EditTicket from "./pages/edit-ticket";




export default function App() {
    return (
      <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Routes>
          <Route path="/" element={<Loginpage />}/>
            <Route exact path="/Login" element={<Loginpage />} />
            <Route exact path="/otp" element={<Otp />} />
            {/* <Route exact path="/forgot-password" element={<ForgotPassword />} /> */}
            <Route path="/forgot" element={<Forgot/>}/>
            <Route path="/reset-password/:token" element={<Resetpassword/>} /> 
            <Route element={<RestrictedAccess />}>

            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route exact path="/add-ticket" element={<AddTicket />} />
            <Route exact path="/ticket" element={<Ticket />} />
            <Route exact path="/edit-ticket/:id" element={<EditTicket />} />
            

            <Route exact path="/my-profile" element={<MyProfile />} />
            {/* <Route exact path="/edit-profile" element={<EditProfile/>}/>           */}
            <Route exact path="/edit-profile/:id" element={<MyProfile />} />          
            <Route exact path="/review" element={<ViewReview />} />          
            <Route exact path="/review-details" element={<ReviewDetails />} />
            <Route exact path="/review-details" element={<ReviewDetails />} /> 
            <Route path="/view-review/:id" element={<SingleReviewDetail/>}/>


          </Route>

        </Routes>
      </HashRouter>
    );
  }
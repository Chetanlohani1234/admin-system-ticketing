import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import MyProfileBanner from "../section/home/my-profile/my-profile-banner";
import MyProfileDetail from "../section/home/my-profile/my-profile-detail";
import EditProfileContent from "../section/home/my-profile/edit-myprofile-content";
import DataService from "../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const MyProfile = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const storedUserId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
      document.title = "My Profile";
      getData();
  }, [storedUserId]);

  const getData = () => {
      DataService.getUserDetail(storedUserId).then((data) => {
          setData(data.data.data);
          setLoading(false);
      }).catch((error)=>{
          const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

         setLoading(false);
          toast.error(resMessage, {
              position: toast.POSITION.TOP_RIGHT
          });
      });
  }
  return (
    <div className="bg-grey h-100">
      <Header />
      <section className="content-area mt-4">
        <Sidebar />
        <div className="Right-content">
          {!params?.id ?<MyProfileBanner data={data}/>:""}
          <div className="main-content">
          <ToastContainer></ToastContainer>
          {params?.id ?<EditProfileContent data={data} loading= {loading}/>:<MyProfileDetail data={data} loading= {loading}/>
          }
            
          </div>
          <Footer />
        </div>
      </section>


    </div>
  );
};

export default MyProfile;
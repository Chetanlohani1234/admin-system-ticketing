import React, {useEffect, useState, useRef } from "react";
import {useNavigate, Link, NavLink } from "react-router-dom";
import DataService from "../services/data.service";
import PhoneInput from "react-phone-input-2";
import VerifyOtp from "./OtpVerify";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-phone-input-2/lib/style.css'

const Forgot = () => {
  const form = useRef();
  const buttonref1 = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('254');
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    document.title = "Forgot Password";
  }, []);
  const handlePhoneChanes = (e)=>{
    setPhone(e.target.value);
  }
  const handlePhoneCode = (e)=>{
    setPhoneCode(e.target.value);
  }
  const navigateToNextPage = async (e)=>{
    e.preventDefault();
    const data = {};
    data.phone = phoneCode;
    data.type = 'forgot';
    data.role = 'admin';
    setLoading(true);
    await DataService.forgotPassword(data).then(
      () => {
        setLoading(false);
        toast.success('OTP sent successfully!', {
            position: toast.POSITION.TOP_RIGHT
        });
        buttonref1.current.click();  
      },
      (error) => {
        const resMessage =
          (error.response &&
              error.response.data &&
              error.response.data.msg) ||
          error.message ||
          error.toString();

          setLoading(false);
          toast.error(resMessage, {
            position: toast.POSITION.TOP_RIGHT
        });        
    });   
  }

  return (
    <div class="w-100 h-100 d-flex align-items-center justify-content-center flex-column p-5">
<div className="logo_forgot">
      <Link to="/">
        <img src="./assets/img/adminlogo.png" className="main_logo" alt="" srcset=""/>
      </Link>
</div>
    <div class="pop d-flex align-items-center justify-content-center flex-column mt-3">
        <svg width="106" height="117" viewBox="0 0 106 117" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_671_14883)">
            <path d="M85.2853 77.044L71.4659 67.792C69.7121 66.6273 67.3613 67.0106 66.0649 68.6726L62.0393 73.8686C61.5219 74.5532 60.5817 74.752 59.8331 74.3347L59.0674 73.9109C56.529 72.5219 53.3707 70.7926 47.007 64.4019C40.6435 58.0111 38.9174 54.838 37.5338 52.2944L37.1139 51.5256C36.6925 50.7745 36.8866 49.8264 37.569 49.3029L42.7413 45.2629C44.3963 43.9611 44.7785 41.6018 43.6197 39.8407L34.4037 25.9673C33.2162 24.1739 30.8334 23.6355 28.9949 24.745L23.2162 28.2299C21.4003 29.3016 20.0683 31.0371 19.4991 33.0729C17.4181 40.6847 18.9835 53.8214 38.2599 73.1752C53.5938 88.5678 65.0091 92.7072 72.8551 92.7072C74.6609 92.715 76.4597 92.479 78.2027 92.006C80.2311 91.4352 81.9602 90.0976 83.027 88.2744L86.5017 82.4765C87.6085 80.6304 87.0725 78.2369 85.2853 77.044Z" fill="#F4AC3D"/>
            <g opacity="0.312443">
            <path d="M57.6072 33.9742C68.9716 33.9869 78.1812 43.2325 78.1939 54.6414C78.1939 55.3128 78.736 55.857 79.4049 55.857C80.0736 55.857 80.6158 55.3128 80.6158 54.6414C80.6018 41.8902 70.3087 31.5568 57.6072 31.5428C56.9383 31.5428 56.3962 32.0871 56.3962 32.7585C56.3962 33.43 56.9383 33.9742 57.6072 33.9742Z" fill="#2C5F2D"/>
            <path d="M54.2624 46.0728C61.171 46.081 66.7698 51.7015 66.778 58.6373C66.778 59.2682 67.2874 59.7795 67.9156 59.7795C68.5441 59.7795 69.0534 59.2682 69.0534 58.6373C69.044 50.4404 62.4273 43.7979 54.2624 43.7885C53.634 43.7885 53.1246 44.2998 53.1246 44.9307C53.1246 45.5615 53.634 46.0728 54.2624 46.0728Z" fill="#2C5F2D"/>
            <path d="M52.3483 54.4898C55.4886 54.4935 58.0334 57.0483 58.0372 60.201C58.0372 60.8318 58.5466 61.3431 59.1748 61.3431C59.8031 61.3431 60.3126 60.8318 60.3126 60.201C60.3076 55.7872 56.7448 52.2104 52.3483 52.2054C51.7199 52.2054 51.2104 52.7168 51.2104 53.3476C51.2104 53.9785 51.7199 54.4898 52.3483 54.4898Z" fill="#2C5F2D"/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_671_14883">
            <rect width="106" height="117" fill="white"/>
            </clipPath>
            </defs>
        </svg>            
        <form onSubmit={navigateToNextPage}  ref={form} class="mt-3 w-100">
            <h3 class="text-center fw-bold">Enter your registered <br/>mobile number</h3>
            <br></br>
            <div class="d-flex flex-column gap-3">
            <div className="country_adminmain">
                                        <div className="phone_int">
                                            <PhoneInput
                                                country={"ke"}
                                                value={phoneCode}
                                                defaultCountry="US"
                                                onChange={setPhoneCode}
                                            />
                                        {/* <input 
                                    type="tel" 
                                    maxLength={10}
                                    required
                                    defaultValue={data.phone} 
                                    onChange={onChangePhone}
                                    className="form-control" 
                                    placeholder="User phone number" /> */}
                                        </div>
                                    </div>

                {/* <div class="d-flex phone-number gap-3">
                    <div className="one_country">
                        <PhoneInput
                          country={"ke"}
                          value={phoneCode}
                          defaultCountry="US"
                          required
                          onChange={setPhoneCode}  
                          placeholder="+254" />
                    </div>
                    <div style={{width: '60%'}}>
                    <input 
                    type="number" 
                    maxLength={10}
                    required
                    onChange={handlePhoneChanes} 
                    name="phone-number"  
                    placeholder="Phone Number" class="w-75"/>
                    </div>
                </div> */}
                <button type='submit' className="btn btn-primary bg-yellow" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Send OTP</span>
                </button>
            </div>
        </form>
        <ToastContainer/>
        <Link data-bs-toggle="modal" data-bs-target='#verifyOtp' style={{display:"none"}} ref={buttonref1}></Link>
        <div className="modal fade" id="verifyOtp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="verifyOtpLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body text-center">
                    <button class="close_icon" data-bs-dismiss="modal"><i class="fas fa-times"></i></button>
                        <VerifyOtp phone={phoneCode} />
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Forgot;
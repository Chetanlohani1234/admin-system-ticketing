import React, {useState, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import DataService from "../../../services/data.service";
import {  toast } from 'react-toastify';

const MyProfileDetail = (props) => {
    const modalcloseRef = React.useRef();
    const passwordForm = useRef();
    const [password, setPassword] = useState("");
    const [oldPassword, setoldPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [editForm, seteditForm] = useState(false);


    
    const onChangePassword = (e) => {
        const data = e.target.value;
        setPassword(data);
    }
    const onChangeOldPassword = (e) => {
        const data = e.target.value;
        setoldPassword(data);
    }
    
    const onChangeConfrimPassword = (e) => {
        const data = e.target.value;
        setconfirmPassword(data);
    }
    
    const passwordhandleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        const data = {};
        if(password===confirmPassword){
            data.oldPassword = oldPassword;
            data.newPassword = password
            data.confirmPassword = confirmPassword

            // const adminId = props?.data?._id;
            DataService.changePassword(props?.data?._id,data).then(
                () => {
                    toast.success('Request completed successfully!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setLoading(false);
                    seteditForm(false);
                    modalcloseRef.current.click();
                },
                (error) => {
                    const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.msg) ||
                    error.msg ||
                    error.toString();
                    setLoading(false);
                    toast.error(resMessage, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            );
        }else{
            toast.error('Password and confirm password do not match!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    }
    return (
        
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0 f-700">My Profile</h4>
                </div>
                {Object.keys(props.data).length > 0 ?
                    <div className="col-md-12 bg-grey p-4">
                        <h4>Info</h4>
                        <table class="table table-borderless InfoTable">
                            <tr>
                                <th>Name</th>
                                <td>{props.data?.name}</td>
                            </tr>
                          
                            <tr>
                                <th>Address</th>
                                <td>{props.data?.address}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{props.data?.email}</td>
                            </tr>

                            <tr>
                                <th>Phone Number:</th>
                                <td>+{props.data?.phoneNo}</td>
                            </tr>
                            
                            <tr>
                                <th>Address:</th>
                                <td>{props.data?.address}</td>
                            </tr>
                        </table>
                        <div className="d-flex align-items-center justify-content-between">
                        <Link to={"/edit-profile/"+props.data?._id} className="btn btn-primary">Edit</Link>
                        <div className="px-3">
                        <Link to='#' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Change Password
                        </Link>
                        </div>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header border-0 pb-0">
                                    <h1 className="modal-title fs-5 text-center w-100" id="exampleModalLabel">Change Password</h1>
                                        <button  ref={modalcloseRef }type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form  onSubmit={passwordhandleSubmit}  ref={passwordForm}>
                                        
                                        <div className="modal-body pt-0">
                                            <div className="row mt-4">
                                                <div className="mb-3 ">
                                                    <input 
                                                    type="password" 
                                                    required
                                                    onChange={onChangeOldPassword}
                                                    className="form-control bg-light-grey border-0 f-16 h-42" 
                                                    placeholder="Enter Old Password*" />
                                                </div>
                                                <div className="mb-3 ">
                                                    <input 
                                                    type="password"
                                                    required
                                                    onChange={onChangePassword}
                                                    className="form-control bg-light-grey border-0 f-16 h-42" 
                                                    placeholder="Enter New Password*" />
                                                </div>
                                                <div >
                                                    <input 
                                                    type="password"
                                                    required
                                                    onChange={onChangeConfrimPassword}
                                                    className="form-control bg-light-grey border-0 f-16 h-42" 
                                                    placeholder="Re-enter New Password*" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer border-0 pt-0">

                                            <div class="d-grid col-12 mx-auto">
                                            <button disabled={loading}  type="submit" className="btn btn-primary bg-yellow">
                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Change Password</span>
                        </button>
                                                {/* <button type="submit" class="btn btn-primary bg-yellow">Change Password</button> */}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    : <div className="container-fluid text-center no-padding">
                            <div className="col-lg-6 m-auto">
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                            </div>
                        </div>
                }
            </div>
            
        </div>
        
    );
};

export default MyProfileDetail;
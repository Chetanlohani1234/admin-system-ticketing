import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns'
import html2pdf from 'html2pdf.js';

const InvoiceDetailContent = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData()
    }, []);
    const getData = async() => {
        setLoading(true);
        await DataService.getOrderDetail(params.id).then((data) => {
            setData(data?.data?.data);
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

    const downloadInv = (e) => {
        var element = document.getElementById('invoice_details_wrap');
        html2pdf().set({ margin: 3, filename: 'order.pdf', html2canvas:  { scale: 2 }}).from(element).save();
    }

    return (
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <div className="row" id="invoice_details_wrap">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0 f-700">Invoice Details</h4>
                </div>

                {!loading?
                <><div className="col-xl-4 col-md-6">
                        <div className="bg-grey p-4 rounded-2">
                            <h4 className="f-700">Order Details (#A5{data.id})</h4>
                            <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                <span><i className="me-2"> <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0.5H2C0.89543 0.5 0 1.39543 0 2.5V14.5C0 15.6046 0.89543 16.5 2 16.5H14C15.1046 16.5 16 15.6046 16 14.5V2.5C16 1.39543 15.1046 0.5 14 0.5ZM1 4.35714C1 3.88376 1.44772 3.5 2 3.5H14C14.5523 3.5 15 3.88376 15 4.35714V14.6429C15 15.1162 14.5523 15.5 14 15.5H2C1.44772 15.5 1 15.1162 1 14.6429V4.35714Z" fill="black" />
                                    <path d="M6.5 7.5C7.05228 7.5 7.5 7.05228 7.5 6.5C7.5 5.94772 7.05228 5.5 6.5 5.5C5.94772 5.5 5.5 5.94772 5.5 6.5C5.5 7.05228 5.94772 7.5 6.5 7.5Z" fill="black" />
                                    <path d="M9.5 7.5C10.0523 7.5 10.5 7.05228 10.5 6.5C10.5 5.94772 10.0523 5.5 9.5 5.5C8.94772 5.5 8.5 5.94772 8.5 6.5C8.5 7.05228 8.94772 7.5 9.5 7.5Z" fill="black" />
                                    <path d="M12.5 7.5C13.0523 7.5 13.5 7.05228 13.5 6.5C13.5 5.94772 13.0523 5.5 12.5 5.5C11.9477 5.5 11.5 5.94772 11.5 6.5C11.5 7.05228 11.9477 7.5 12.5 7.5Z" fill="black" />
                                    <path d="M3.5 10.5C4.05228 10.5 4.5 10.0523 4.5 9.5C4.5 8.94772 4.05228 8.5 3.5 8.5C2.94772 8.5 2.5 8.94772 2.5 9.5C2.5 10.0523 2.94772 10.5 3.5 10.5Z" fill="black" />
                                    <path d="M6.5 10.5C7.05228 10.5 7.5 10.0523 7.5 9.5C7.5 8.94772 7.05228 8.5 6.5 8.5C5.94772 8.5 5.5 8.94772 5.5 9.5C5.5 10.0523 5.94772 10.5 6.5 10.5Z" fill="black" />
                                    <path d="M9.5 10.5C10.0523 10.5 10.5 10.0523 10.5 9.5C10.5 8.94772 10.0523 8.5 9.5 8.5C8.94772 8.5 8.5 8.94772 8.5 9.5C8.5 10.0523 8.94772 10.5 9.5 10.5Z" fill="black" />
                                    <path d="M12.5 10.5C13.0523 10.5 13.5 10.0523 13.5 9.5C13.5 8.94772 13.0523 8.5 12.5 8.5C11.9477 8.5 11.5 8.94772 11.5 9.5C11.5 10.0523 11.9477 10.5 12.5 10.5Z" fill="black" />
                                    <path d="M3.5 13.5C4.05228 13.5 4.5 13.0523 4.5 12.5C4.5 11.9477 4.05228 11.5 3.5 11.5C2.94772 11.5 2.5 11.9477 2.5 12.5C2.5 13.0523 2.94772 13.5 3.5 13.5Z" fill="black" />
                                    <path d="M6.5 13.5C7.05228 13.5 7.5 13.0523 7.5 12.5C7.5 11.9477 7.05228 11.5 6.5 11.5C5.94772 11.5 5.5 11.9477 5.5 12.5C5.5 13.0523 5.94772 13.5 6.5 13.5Z" fill="black" />
                                    <path d="M9.5 13.5C10.0523 13.5 10.5 13.0523 10.5 12.5C10.5 11.9477 10.0523 11.5 9.5 11.5C8.94772 11.5 8.5 11.9477 8.5 12.5C8.5 13.0523 8.94772 13.5 9.5 13.5Z" fill="black" />
                                </svg>
                                </i> Date Added</span>
                                <span><h6>{data?.createdAt?format(new Date(data?.createdAt), 'MMM dd, yyyy'):""}</h6></span>
                            </div>
                            <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                <span><i className="me-2"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 4.5C0 3.39543 0.895431 2.5 2 2.5H14C15.1046 2.5 16 3.39543 16 4.5V12.5C16 13.6046 15.1046 14.5 14 14.5H2C0.895431 14.5 0 13.6046 0 12.5V4.5ZM2 3.5C1.44772 3.5 1 3.94772 1 4.5V5.5H15V4.5C15 3.94772 14.5523 3.5 14 3.5H2ZM15 7.5H1V12.5C1 13.0523 1.44772 13.5 2 13.5H14C14.5523 13.5 15 13.0523 15 12.5V7.5Z" fill="black" />
                                    <path d="M2 10.5C2 9.94772 2.44772 9.5 3 9.5H4C4.55228 9.5 5 9.94772 5 10.5V11.5C5 12.0523 4.55228 12.5 4 12.5H3C2.44772 12.5 2 12.0523 2 11.5V10.5Z" fill="black" />
                                </svg>

                                </i> Payment Method</span>
                                <span><h6>{data?.payment_method}</h6></span>
                            </div>

                            <div className="w-100 d-flex justify-content-between align-items-center py-2">
                                <span><i className="me-2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 3.5C0 2.67157 0.671573 2 1.5 2H10.5C11.3284 2 12 2.67157 12 3.5V5H13.0194C13.4751 5 13.906 5.20713 14.1907 5.56296L15.6713 7.41374C15.8841 7.67971 16 8.01017 16 8.35078V10.5C16 11.3284 15.3284 12 14.5 12H14C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12H5C5 13.1046 4.10457 14 3 14C1.89543 14 1 13.1046 1 12C1 11.9716 1.00059 11.9434 1.00176 11.9153C0.418245 11.7098 0 11.1538 0 10.5V3.5ZM1.29396 10.9557C1.64562 10.3824 2.27815 10 3 10C3.74028 10 4.38663 10.4022 4.73244 11H10.2676C10.4432 10.6964 10.6964 10.4432 11 10.2676V3.5C11 3.22386 10.7761 3 10.5 3H1.5C1.22386 3 1 3.22386 1 3.5V10.5C1 10.7027 1.1206 10.8772 1.29396 10.9557ZM12 10C12.7403 10 13.3866 10.4022 13.7324 11H14.5C14.7761 11 15 10.7761 15 10.5V8.35078C15 8.23725 14.9614 8.12709 14.8904 8.03843L13.4098 6.18765C13.3149 6.06905 13.1713 6 13.0194 6H12V10ZM3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13C3.55228 13 4 12.5523 4 12C4 11.4477 3.55228 11 3 11ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11Z" fill="black" />
                                    </svg>

                                </i> Shipping Method</span>
                                <span><h6>Flat Shipping Rate</h6></span>
                            </div>
                        </div>
                    </div><div className="col-xl-4 col-md-6">
                            <div className="bg-grey p-4 rounded-2">
                                <h4 className="f-700">Customer Details</h4>
                                <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                    <span>
                                        <i className="me-2">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 6C11 7.65685 9.65685 9 8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6Z" fill="black" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 1C4.13401 1 1 4.13401 1 8C1 9.65343 1.57326 11.173 2.53186 12.3707C3.24293 11.2252 4.80464 10 8.00001 10C11.1954 10 12.7571 11.2252 13.4681 12.3707C14.4267 11.173 15 9.65343 15 8C15 4.13401 11.866 1 8 1Z" fill="black" />
                                            </svg>
                                        </i> Customer
                                    </span>
                                    <span><h6>{data?.User?.user_name}</h6></span>
                                </div>
                                <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                    <span><i className="me-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.0495854 3.55544C0.25173 2.66484 1.04822 2 2 2H14C14.9518 2 15.7483 2.66484 15.9504 3.55544L8 8.41403L0.0495854 3.55544ZM0 4.69708V11.8006L5.80319 8.24348L0 4.69708ZM6.7614 8.82905L0.191871 12.8559C0.512604 13.5323 1.20168 14 2 14H14C14.7983 14 15.4874 13.5323 15.8081 12.8559L9.2386 8.82905L8 9.58597L6.7614 8.82905ZM10.1968 8.24348L16 11.8006V4.69708L10.1968 8.24348Z" fill="black" />
                                        </svg>
                                    </i> Email</span>
                                    <span><h6>{data?.User?.email}</h6></span>
                                </div>

                                <div className="w-100 d-flex justify-content-between align-items-center py-2">
                                    <span><i className="me-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.65387 1.32849C3.40343 1.00649 2.92745 0.976861 2.639 1.26531L1.60508 2.29923C1.1216 2.78271 0.94387 3.46766 1.1551 4.06847C2.00338 6.48124 3.39215 8.74671 5.32272 10.6773C7.25329 12.6078 9.51876 13.9966 11.9315 14.8449C12.5323 15.0561 13.2173 14.8784 13.7008 14.3949L14.7347 13.361C15.0231 13.0726 14.9935 12.5966 14.6715 12.3461L12.3653 10.5524C12.2008 10.4245 11.9866 10.3793 11.7845 10.4298L9.59541 10.9771C9.00082 11.1257 8.37183 10.9515 7.93845 10.5181L5.48187 8.06155C5.04849 7.62817 4.87427 6.99919 5.02292 6.40459L5.57019 4.21553C5.62073 4.01336 5.57552 3.79918 5.44758 3.63468L3.65387 1.32849ZM1.88477 0.511076C2.62689 -0.231039 3.8515 -0.154797 4.49583 0.673634L6.28954 2.97983C6.6187 3.40304 6.73502 3.95409 6.60498 4.47423L6.05772 6.66329C5.99994 6.8944 6.06766 7.13888 6.2361 7.30732L8.69268 9.7639C8.86113 9.93235 9.1056 10.0001 9.33671 9.94229L11.5258 9.39502C12.0459 9.26499 12.597 9.3813 13.0202 9.71047L15.3264 11.5042C16.1548 12.1485 16.231 13.3731 15.4889 14.1152L14.455 15.1492C13.7153 15.8889 12.6089 16.2137 11.5778 15.8512C9.01754 14.9511 6.61438 13.4774 4.56849 11.4315C2.5226 9.38562 1.04895 6.98246 0.148838 4.42225C-0.213682 3.39112 0.11113 2.28472 0.85085 1.545L1.88477 0.511076Z" fill="black" />
                                        </svg>
                                    </i> Phone</span>
                                    <span><h6>{data?.User?.phone}</h6></span>
                                </div>
                            </div>
                        </div><div className="col-xl-4 col-md-6">
                            <div className="bg-grey p-4 rounded-2">
                                <h4 className="f-700">Documents</h4>
                                <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                    <span>
                                        <i className="me-2">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H5.5Z" fill="black" />
                                                <path d="M5 9.5C5 9.22386 5.22386 9 5.5 9H10.5C10.7761 9 11 9.22386 11 9.5C11 9.77614 10.7761 10 10.5 10H5.5C5.22386 10 5 9.77614 5 9.5Z" fill="black" />
                                                <path d="M5 11.5C5 11.2239 5.22386 11 5.5 11H7.5C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z" fill="black" />
                                                <path d="M9.5 0H4C2.89543 0 2 0.89543 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V4.5L9.5 0ZM9.5 1V3C9.5 3.82843 10.1716 4.5 11 4.5H13V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V2C3 1.44772 3.44772 1 4 1H9.5Z" fill="black" />
                                            </svg>

                                        </i> Invoice
                                    </span>
                                    <span><h6>#INV-000414</h6></span>
                                </div>
                                <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                    <span><i className="me-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 3.5C0 2.67157 0.671573 2 1.5 2H10.5C11.3284 2 12 2.67157 12 3.5V5H13.0194C13.4751 5 13.906 5.20713 14.1907 5.56296L15.6713 7.41374C15.8841 7.67971 16 8.01017 16 8.35078V10.5C16 11.3284 15.3284 12 14.5 12H14C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12H5C5 13.1046 4.10457 14 3 14C1.89543 14 1 13.1046 1 12C1 11.9716 1.00059 11.9434 1.00176 11.9153C0.418245 11.7098 0 11.1538 0 10.5V3.5ZM1.29396 10.9557C1.64562 10.3824 2.27815 10 3 10C3.74028 10 4.38663 10.4022 4.73244 11H10.2676C10.4432 10.6964 10.6964 10.4432 11 10.2676V3.5C11 3.22386 10.7761 3 10.5 3H1.5C1.22386 3 1 3.22386 1 3.5V10.5C1 10.7027 1.1206 10.8772 1.29396 10.9557ZM12 10C12.7403 10 13.3866 10.4022 13.7324 11H14.5C14.7761 11 15 10.7761 15 10.5V8.35078C15 8.23725 14.9614 8.12709 14.8904 8.03843L13.4098 6.18765C13.3149 6.06905 13.1713 6 13.0194 6H12V10ZM3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13C3.55228 13 4 12.5523 4 12C4 11.4477 3.55228 11 3 11ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11Z" fill="black" />
                                        </svg>

                                    </i> Payment Method</span>
                                    <span><h6>#{data?.payment_method}</h6></span>
                                </div>

                                <div className="w-100 d-flex justify-content-between align-items-center py-2">
                                    <span><i className="me-2">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1169_23739)">
                                                <path d="M15.0281 6.53258V3.00008H11.5031L8.99812 0.517578L6.53062 3.00008H2.99812V6.53258L0.515625 9.00008L2.99812 11.5051V15.0301H6.53062L8.99812 17.5126L11.5031 15.0301H15.0281V11.5051L17.5106 9.00008L15.0281 6.53258ZM6.62062 5.28758C7.35562 5.28758 7.94813 5.88008 7.94813 6.62258C7.94813 6.97465 7.80826 7.31231 7.55931 7.56126C7.31035 7.81022 6.9727 7.95008 6.62062 7.95008C5.87812 7.95008 5.28562 7.35758 5.28562 6.62258C5.28562 5.88008 5.87812 5.28758 6.62062 5.28758ZM11.4131 12.7501C10.6781 12.7501 10.0856 12.1501 10.0856 11.4151C10.0856 11.063 10.2255 10.7253 10.4744 10.4764C10.7234 10.2274 11.061 10.0876 11.4131 10.0876C12.1481 10.0876 12.7481 10.6801 12.7481 11.4151C12.7481 11.7691 12.6075 12.1087 12.3571 12.3591C12.1068 12.6094 11.7672 12.7501 11.4131 12.7501ZM6.37312 12.7726L5.24812 11.6476L11.6456 5.25008L12.7706 6.37508L6.37312 12.7726Z" fill="black" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1169_23739">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>


                                    </i> Shipping Method</span>
                                    <span><h6>Flat Shipping Rate</h6></span>
                                </div>
                            </div>
                        </div><div className="col-md-6">
                            <div className="bg-grey align-items-center justify-content-between d-flex p-4 mt-5">
                                <div className="pe-2">
                                    <h4>Billing Address</h4>
                                    <h6>
                                        {data?.BillingAddress?.first_name} {data?.BillingAddress?.last_name},<br></br>
                                        {data?.BillingAddress?.address},<br></br>
                                        {data?.BillingAddress?.city}, {data?.BillingAddress?.region} {data?.BillingAddress?.landmark ? "("+data?.BillingAddress?.landmark+")" : ""}<br></br>
                                        {data?.BillingAddress?.phone}
                                        <br></br>
                                    </h6>
                                </div>
                                <i>
                                    <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.3" d="M102.233 124.899C105.362 124.899 107.9 122.361 107.9 119.232C107.9 116.103 105.362 113.566 102.233 113.566C99.1034 113.566 96.5664 116.103 96.5664 119.232C96.5664 122.361 99.1034 124.899 102.233 124.899Z" fill="#F4AC3D" />
                                        <path opacity="0.3" d="M34.2331 124.899C37.3627 124.899 39.8997 122.361 39.8997 119.232C39.8997 116.103 37.3627 113.566 34.2331 113.566C31.1035 113.566 28.5664 116.103 28.5664 119.232C28.5664 122.361 31.1035 124.899 34.2331 124.899Z" fill="#F4AC3D" />
                                        <path opacity="0.3" d="M39.8987 90.899L108.465 85.7984C111.865 85.7984 114.132 83.5317 115.266 80.1317L123.198 47.2653C124.332 43.2986 121.498 39.8987 117.532 39.8987H30.832L39.8987 90.899Z" fill="#F4AC3D" />
                                        <path d="M107.898 113.566H28.5641C26.8641 113.566 24.5974 112.432 23.4641 110.732C22.3308 109.032 22.3308 106.766 23.4641 105.066L34.2308 84.0989L23.4641 26.2986L14.3975 21.7654C11.5641 20.632 10.4308 17.2321 12.1308 14.3987C13.2641 11.5654 16.6641 10.432 19.4975 12.132L30.8308 17.7986C32.5308 18.3653 33.6641 20.0654 33.6641 21.7654L44.9975 84.0989C44.9975 85.2322 44.9974 86.3656 44.4308 87.4989L37.0641 102.232H107.898C111.298 102.232 113.564 104.499 113.564 107.899C113.564 111.299 111.298 113.566 107.898 113.566Z" fill="black" />
                                    </svg>

                                </i>
                            </div>
                        </div><div className="col-md-6">
                            <div className="bg-grey align-items-center justify-content-between d-flex p-4 mt-5">
                                <div className="pe-2">
                                    <h4>Shipping Address</h4>
                                    <h6>
                                        {data?.Address?.first_name} {data?.Address?.last_name},<br></br>
                                        {data?.Address?.address},<br></br>
                                        {data?.Address?.city}, {data?.Address?.region} {data?.Address?.landmark ? "("+data?.Address?.landmark+")" : ""}<br></br>
                                        {data?.Address?.phone}
                                        <br></br>
                                    </h6>
                                </div>
                                <i>
                                    <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M113.335 45.3333H90.668C87.268 45.3333 85.0013 47.5999 85.0013 50.9999V90.6666H56.668V96.3333C56.668 99.7333 58.9346 102 62.3346 102H90.668C90.668 95.7666 95.768 90.6666 102.001 90.6666C108.235 90.6666 113.335 95.7666 113.335 102H119.001C122.401 102 124.668 99.7333 124.668 96.3333V73.6666L113.335 45.3333Z" fill="black" />
                                        <path opacity="0.3" d="M113.332 102C113.332 108.233 108.232 113.333 101.999 113.333C95.7654 113.333 90.6654 108.233 90.6654 102C90.6654 95.7667 95.7654 90.6667 101.999 90.6667C108.232 90.6667 113.332 95.7667 113.332 102ZM84.9987 22.6667C84.9987 19.2667 82.732 17 79.332 17H16.9987C13.5987 17 11.332 19.2667 11.332 22.6667V73.6667C11.332 77.0667 13.5987 79.3333 16.9987 79.3333H84.9987V22.6667ZM33.9987 90.6667C27.7654 90.6667 22.6654 95.7667 22.6654 102C22.6654 108.233 27.7654 113.333 33.9987 113.333C40.232 113.333 45.332 108.233 45.332 102C45.332 95.7667 40.232 90.6667 33.9987 90.6667Z" fill="#F4AC3D" />
                                    </svg>


                                </i>
                            </div>
                        </div><div className="col-12 mt-5">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">SKU</th>
                                        <th scope="col">QTY</th>
                                        <th scope="col" className="text-end">UNIT PRICE</th>
                                        <th scope="col" className="text-end">PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.OrderItems && data?.OrderItems.length > 0 ?
                                        data?.OrderItems?.map((item, i) => (
                                                    <tr style={{textDecoration: (item.status == 'inactive' ? 'line-through' : '')}}>
                                                        <td className="d-flex align-items-center">
                                                            <span className="thumb-img me-2">
                                                            <img src={item.file_path ? "opm-stream.onrender.com/" + item.file_path : ""} alt="product" srcset="" class="w-100" />
                                                                <img src="../assets/img/brand-logo.png" alt="product" />
                                                            </span>
                                                            <div><p className="mb-0">{item?.Product?.name}</p></div>
                                                        </td>
                                                        <td>{item?.Product?.sku}</td>
                                                        <td>{item.quantity}</td>
                                                        <td className="text-end">{item?.price}</td>
                                                        <td><h6 className="mb-0 text-end text-dark-grey">{item.quantity*item.price}</h6></td>
                                                    </tr>
                                        )) : ""}
                                    <tr>
                                        <td colSpan="4" className="text-end">Shipping Rate</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">{data.shipping_amount > 0 ? `KSh. ${data.shipping_amount}` : `Free`}</h6></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="text-end">Tax amount</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">KSh. {data.tax_amount}</h6></td>
                                    </tr>
                                    {data.cancel_amount > 0 && 
                                        <tr>
                                            <td colSpan="4" className="text-end">Refund</td>
                                            <td><h6 className="mb-0 text-end text-dark-grey ">KSh. {data.cancel_amount}</h6></td>
                                        </tr>
                                    }
                                    <tr>
                                        <td colSpan="4" className="text-end">Grand Total</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">KSh. {(data.cancel_amount > 0 ? (data.total_amount-data.cancel_amount) : data.total_amount)}</h6></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div></>
                :  <div className="col-lg-6 m-auto">
                {loading && (
                <span className="spinner-border spinner-border-sm"></span>
                )}
                </div>}
            </div>
            <div className="col-12 text-end mt-4">
                <button className="btn btn-primary" onClick={(e) => downloadInv(e)} >Download</button>
            </div>
        </div>
    );
};

export default InvoiceDetailContent;

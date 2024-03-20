import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns'

const InvioceListing = () => {
    const [data, setData] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
  //console.log(props)

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {;
    DataService.getOrder().then((data) => {
        setLoading(false);
      setData(data?.data?.data);
      setfilteredData(data?.data?.data)
      setLoading(false);
    }).catch((error)=>{
        setLoading(false);
        setMessage(error?.response?.data?.msg)
    });
  };
  const onChangeSearch =(e)=>{
    if(e.target.value){
        const result = data.filter(value=>{
            return value?.id.toString().includes(e.target.value.toString()) || 
            value?.total_amount.toString().includes(e.target.value.toString());
        })
        setfilteredData(result)
    }else{
        setfilteredData(data)
    }
    
  }
    return (
        <div className="row">
            <div className="col-md-12">
                <h4 className="f-700 mb-4">All Transactions</h4>
                <div className="table-header d-flex align-items-center">
                    <div className="table-search">
                        <i><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.7422 10.8439C12.5329 9.7673 13 8.4382 13 7C13 3.41015 10.0899 0.5 6.5 0.5C2.91015 0.5 0 3.41015 0 7C0 10.5899 2.91015 13.5 6.5 13.5C7.93858 13.5 9.26801 13.0327 10.3448 12.2415L10.3439 12.2422C10.3734 12.2822 10.4062 12.3204 10.4424 12.3566L14.2929 16.2071C14.6834 16.5976 15.3166 16.5976 15.7071 16.2071C16.0976 15.8166 16.0976 15.1834 15.7071 14.7929L11.8566 10.9424C11.8204 10.9062 11.7822 10.8734 11.7422 10.8439ZM12 7C12 10.0376 9.53757 12.5 6.5 12.5C3.46243 12.5 1 10.0376 1 7C1 3.96243 3.46243 1.5 6.5 1.5C9.53757 1.5 12 3.96243 12 7Z" fill="#707070" fill-opacity="0.5" />
                        </svg>
                        </i>
                        <input type="search" onChange={onChangeSearch} name="search" placeholder="Search Invoice" />
                    </div>
                </div>
                <div className="col-lg-6 m-auto">
                        {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                        )}
                 </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID </th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Price</th>
                            <th scope="col"><span className="d-flex justify-content-end">Action</span></th>



                        </tr>
                    </thead>
                    <tbody>
                    {filteredData && filteredData.length > 0
                            ? filteredData.map((item, i) => (
                        <tr>
                            <td>#{item.id}</td>
                            <td>{format(new Date(item?.createdAt), 'MMM dd, yyyy')}</td>
                            <td>{item.payment_method}</td>
                            <td >Ksh.{item.total_amount}</td>
                            <td>
                                <span className="d-flex justify-content-end">
                                    <Link to={"/invoice-details/"+item.id} className="mx-2">
                                        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.6951 6.47656C16.6951 6.47656 13.6951 0.976562 8.69507 0.976562C3.69507 0.976562 0.695068 6.47656 0.695068 6.47656C0.695068 6.47656 3.69507 11.9766 8.69507 11.9766C13.6951 11.9766 16.6951 6.47656 16.6951 6.47656ZM1.86777 6.47656C1.92469 6.38977 1.98961 6.29333 2.06234 6.18898C2.39723 5.70849 2.89138 5.06947 3.52718 4.43367C4.8161 3.14474 6.57569 1.97656 8.69507 1.97656C10.8145 1.97656 12.574 3.14474 13.863 4.43367C14.4988 5.06947 14.9929 5.70849 15.3278 6.18898C15.4005 6.29333 15.4654 6.38977 15.5224 6.47656C15.4654 6.56335 15.4005 6.65979 15.3278 6.76414C14.9929 7.24463 14.4988 7.88366 13.863 8.51946C12.574 9.80838 10.8145 10.9766 8.69507 10.9766C6.57569 10.9766 4.8161 9.80838 3.52718 8.51946C2.89138 7.88366 2.39723 7.24463 2.06234 6.76414C1.98961 6.65979 1.92469 6.56335 1.86777 6.47656Z" fill="#F4AC3D" />
                                            <path d="M8.69507 3.97656C7.31436 3.97656 6.19507 5.09585 6.19507 6.47656C6.19507 7.85727 7.31436 8.97656 8.69507 8.97656C10.0758 8.97656 11.1951 7.85727 11.1951 6.47656C11.1951 5.09585 10.0758 3.97656 8.69507 3.97656ZM5.19507 6.47656C5.19507 4.54357 6.76207 2.97656 8.69507 2.97656C10.6281 2.97656 12.1951 4.54357 12.1951 6.47656C12.1951 8.40956 10.6281 9.97656 8.69507 9.97656C6.76207 9.97656 5.19507 8.40956 5.19507 6.47656Z" fill="#F4AC3D" />
                                        </svg>
                                    </Link>
                                    {/* <div class="dropdown no-arrow">
                                        
                                        <a href="#" className="mx-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><svg width="3" height="14" viewBox="0 0 3 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 12.0798C3 12.9083 2.32843 13.5798 1.5 13.5798C0.671573 13.5798 0 12.9083 0 12.0798C0 11.2514 0.671573 10.5798 1.5 10.5798C2.32843 10.5798 3 11.2514 3 12.0798ZM3 7.07983C3 7.90826 2.32843 8.57983 1.5 8.57983C0.671573 8.57983 0 7.90826 0 7.07983C0 6.25141 0.671573 5.57983 1.5 5.57983C2.32843 5.57983 3 6.25141 3 7.07983ZM3 2.07983C3 2.90826 2.32843 3.57983 1.5 3.57983C0.671573 3.57983 0 2.90826 0 2.07983C0 1.25141 0.671573 0.579834 1.5 0.579834C2.32843 0.579834 3 1.25141 3 2.07983Z" fill="#2C5F2D" />
                                    </svg>
                                    </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Cancel Order</a></li>
                                        </ul>
                                    </div> */}
                                </span>
                            </td>
                        </tr>
                    )):!loading && (
                                <div
                                    className="container text-center no-padding"
                                >
                                    <div className="col-lg-12 m-auto">
                                        <p className="data_not_found">No data found</p>
                                    </div>
                                </div>
                            )}

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default InvioceListing;
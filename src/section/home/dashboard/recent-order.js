import React, { Fragment,useState } from "react";
import Graphics from "./graphics";
import { format } from 'date-fns'
import { Link } from "react-router-dom";
import HelperService  from "../../../services/helper.service";

const RecentOrder = (props) => {
    const [loading, setLoading] = useState(true);

    return (

        <div className="row mt-5">
            <div className="col-md-12">
                <h4 className="f-700">Recent Orders</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" width="200">ID </th>
                            <th scope="col" width="200">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            <th scope="col" width="70">&nbsp;</th>



                        </tr>
                    </thead>
                    <tbody>
                    {props?.data && props?.data.length > 0
                            ? props?.data.slice(0,4).map((item, i) => (
                        <tr>
                            <td>#A5{item.id}</td>
                            <td>{format(new Date(item?.createdAt), 'MMM dd, yyyy')}</td>
                            <td><span class="badge text-bg-success">{item.payment_method}</span></td>
                            {/* <td>
                                {
                                   item.payment_method==='Cash on delivery'? <span class="status  Inprogress">Pending</span>:<span class="badge text-bg-success">Pending</span>
                                }
                                
                            </td> */}
                            <td width="150"><span className="status Inprogress"> { HelperService.orderStatus()[item.status] } </span></td>
                            <td >Ksh.{item.total_amount}</td>
                            <td>
                                <span className="d-flex justify-content-end">
                                    <Link to={"/order-details/"+item.id} className="mx-2">
                                        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.6951 6.47656C16.6951 6.47656 13.6951 0.976562 8.69507 0.976562C3.69507 0.976562 0.695068 6.47656 0.695068 6.47656C0.695068 6.47656 3.69507 11.9766 8.69507 11.9766C13.6951 11.9766 16.6951 6.47656 16.6951 6.47656ZM1.86777 6.47656C1.92469 6.38977 1.98961 6.29333 2.06234 6.18898C2.39723 5.70849 2.89138 5.06947 3.52718 4.43367C4.8161 3.14474 6.57569 1.97656 8.69507 1.97656C10.8145 1.97656 12.574 3.14474 13.863 4.43367C14.4988 5.06947 14.9929 5.70849 15.3278 6.18898C15.4005 6.29333 15.4654 6.38977 15.5224 6.47656C15.4654 6.56335 15.4005 6.65979 15.3278 6.76414C14.9929 7.24463 14.4988 7.88366 13.863 8.51946C12.574 9.80838 10.8145 10.9766 8.69507 10.9766C6.57569 10.9766 4.8161 9.80838 3.52718 8.51946C2.89138 7.88366 2.39723 7.24463 2.06234 6.76414C1.98961 6.65979 1.92469 6.56335 1.86777 6.47656Z" fill="#c7001f" />
                                            <path d="M8.69507 3.97656C7.31436 3.97656 6.19507 5.09585 6.19507 6.47656C6.19507 7.85727 7.31436 8.97656 8.69507 8.97656C10.0758 8.97656 11.1951 7.85727 11.1951 6.47656C11.1951 5.09585 10.0758 3.97656 8.69507 3.97656ZM5.19507 6.47656C5.19507 4.54357 6.76207 2.97656 8.69507 2.97656C10.6281 2.97656 12.1951 4.54357 12.1951 6.47656C12.1951 8.40956 10.6281 9.97656 8.69507 9.97656C6.76207 9.97656 5.19507 8.40956 5.19507 6.47656Z" fill="#c7001f" />
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

export default RecentOrder;
import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../../common/Header";
import Sidebar from "../../../common/sidebar";
import Footer from "../../../common/Footer";
import { format } from 'date-fns'
import moment from "moment";


const SingleReviewDetail = () => {
    const form = React.useRef();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [disabled, setDisabled] = useState(true);
    const params = useParams();
    //console.log(props)

    useEffect(() => {
        document.title = "Review Details"
        getData();
    }, []);
    const getData = async() => {
        await DataService.getReviewDetail(params.id).then((data) => {
            setData(data?.data?.data);
        setLoading(false);
        });
        
    }
    const onChangeStatus = (e) => {
        const data = e.target.value;
        setStatus(data);
        setDisabled(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            status : status
        }
        DataService.updateReviewDetail(params?.id, data).then(
            () => {
                setLoading(false);
                toast.success('Review Status Updated Successfully!!', {
                    position: toast.POSITION.TOP_RIGHT
                });
                getData();
            },
            (error) => {
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
            }
        );
    };
    const renderStars = (item) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < item) {
            stars.push(<span key={i} className="star filled">&#9733;</span>);
          } else {
            stars.push(<span key={i} className="star empty">&#9734;</span>);
          }
        }
        return stars;
      };
    
    return (
        <div className="bg-grey h-100">
        <Header />

        <section className="content-area mt-4">
            <Sidebar />
            <div className="Right-content">
                <div className="main-content">
                <div className="row">
            <ToastContainer></ToastContainer>
            <div className="col-md-12">
                <h3 className="mb-4">{data?.Product?.name}</h3>
                <div className="row">
                    <div className="col-md-8">
                        <table class="table table-bordered tf-12 product-detail">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col" class="f-700">Customer Name</th>
                                    <th scope="col">{data?.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="f-700">Review Date</td>
                                    <td>{moment(data?.createdAt).format("MMM Do YY")}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Rating</td>
                                    <td>{renderStars(data?.rating)}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Review</td>
                                    <td>{data?.review}</td>
                                </tr>
                            </tbody>
                        </table>

                       
                    </div>

                    <div className="col-md-4">
                    {(data?.Product?.file_path ? 
                                <img src={"opm-stream.onrender.com/"+data?.Product?.file_path} className="w-100 review_img" alt={data?.Product?.name} />
                            : ""
                            )}
                    </div>
                </div>
                <div className="row">
            <div className="col-xl-3 col-md-5 col-12">
                <form onSubmit={handleSubmit} ref={form}>
                        <div class="mb-3">
                                <label class="form-label">Change Status</label>
                                <select key={data?.status} defaultValue={data?.status} className="form-select" onChange={onChangeStatus}>
                                <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>                                    
                                </select>
                            </div>  
                            <div class="mb-3">
                            <button disabled={disabled || loading} className="btn btn-primary">
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Update</span>
                                        </button>
                            </div>
                </form>
                    </div>
                </div>
            </div>
        </div>

                </div>
                <Footer />
            </div>
        </section>


    </div>
       
    );
};

export default SingleReviewDetail;
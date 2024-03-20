import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import Sidebar from "../../../common/sidebar";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductReviews = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();
    const [product, setProduct] = useState([]);


    useEffect(() => {
        document.title = "Review Details"
        getProduct();
    }, []);
    const getData = async () => {
        await DataService.getProductReview(params.id).then((data) => {
            setData(data?.data?.reviews);
            setLoading(false);
        });

    }
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
    const getProduct = async (categoryData) => {
        await DataService.getProductDetail(params.id).then((data) => {
            setLoading(false);
            const productData = data.data.category;
            productData.images = (productData.images) ? JSON.parse(productData.images) : []
            setProduct(productData)
            getData();
        }).catch((error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(resMessage, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoading(false);
        })
    }
    return (
        <div className="bg-grey h-100">
            <Header />

            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>{product?.name}</h3>
                                <div className="row mt-5">
                                    <div className="col-md-8">
                                        {data && data.length > 0
                                            ? data.map((item, i) => (
                                                <div className="row mb-5">
                                                    <div className="col-lg-auto d-flex align-items-center">
                                                        {/* {(item?.Product?.file_path ? 
                                <figure className='mb-0 rounded-img'><img src={"opm-stream.onrender.com/"+item?.Product?.file_path} alt='profie image' /></figure>
                                : <span className="thumb-img me-2"></span>
                                )}  */}

                                                    </div>
                                                    <div className="col pe-lg-5 pe-0">
                                                        <p className="mb-2">{item?.name} <i className="text-green"> - {moment(item?.createdAt).format("MMM Do YY")}</i></p>
                                                        <p className="mb-0">{item?.review}</p>
                                                    </div>
                                                    <div className="col-lg-auto">

                                                        {renderStars(item?.rating)}
                                                    </div>

                                                </div>
                                            )) : !loading && (
                                                <p className="nothing">
                                                    Data not Found
                                                </p>
                                            )}





                                    </div>

                                    <div className="col-md-4 ">
                                        <div className="bg-grey">

                                            <div className=" d-flex align-items-center justify-content-center">
                                                {(product?.file_path ?
                                                    <img src={"opm-stream.onrender.com/" + product?.file_path} alt="product image" style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
                                                    : ""
                                                )}
                                            </div>

                                        </div>
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

export default ProductReviews;
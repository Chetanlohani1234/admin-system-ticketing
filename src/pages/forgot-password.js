import React from "react";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
    React.useEffect(() => {
        document.title = "Login";
    }, []);

    return (
        <div class="container-fluid bg-grey p-0 h-100">
            <div className="row m-0">
                <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 bg-white p-4 h-100">
                    <Link to={"/"}>
                        <img src="../assets/img/adminlogo.png" className="main_logo" alt="" />
                    </Link>
                    <h3 className="mt-50">Forgot Password</h3>
                    <p>Enter Your New Password</p>
                    <form className="mt-4 login">
                        <div class="mb-4">
                            <label for="exampleFormControlInput1" class="form-label">Password</label>
                            <input type="password" class="form-control" placeholder="Enter Your Password" />
                        </div>
                        <div class="mb-4">
                            <label for="exampleFormControlInput1" class="form-label">Password</label>
                            <input type="password" class="form-control" placeholder="Re Enter Your Password" />
                        </div>
                        <div class="d-grid mt-5">
                            <Link to={"/dashboard"} class="btn btn-primary" type="submit">Change Password</Link>
                        </div>
                    </form>
                </div>
                <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-6 px-5 d-flex align-items-center justify-content-center ">
                        <img src="../assets/img/pana.png" className="img-fluid max-7" alt="" />
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;

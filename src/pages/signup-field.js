import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import SignUpFieldContent from "../section/home/signup-fields-content";
const SignUpFields = () => {
    React.useEffect(() => {
        document.title = "Returns and Refunds Policy";
    }, []);

    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <SignUpFieldContent />
                    </div>
                    <Footer />
                </div>
            </section>
        </div>
    );
};

export default SignUpFields;
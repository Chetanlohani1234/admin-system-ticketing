import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ReviewList from "../section/home/review/review-list";
const ViewReview = () => {
    React.useEffect(() => {
        document.title = "Review";
    }, []);

    return (
        <div className="bg-grey h-100">
            <Header />

            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <ReviewList />

                        <edit />

                    </div>
                    <Footer />
                </div>
            </section>


        </div>
    );
};

export default ViewReview;
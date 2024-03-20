import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
// import ViewRatingContent from "../section/home/review/review-detail-content";
const ReviewDetails = () => {
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
                        {/* <ViewRatingContent /> */}

                        <edit />

                    </div>
                    <Footer />
                </div>
            </section>


        </div>
    );
};

export default ReviewDetails;
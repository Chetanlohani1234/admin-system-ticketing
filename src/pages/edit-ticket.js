import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import EditTicketSection from "../section/home/lessons/edit-ticket-section";
const EditTicket = () => {
    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <EditTicketSection />
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </div>
    );
};

export default EditTicket;
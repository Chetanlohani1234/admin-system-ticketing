import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import PrivacyNoticeContent from "../section/home/static-pages/privacy-notice-content";
const PrivacyNotice = () => {
  React.useEffect(() => {
    document.title = "Privacy Notice";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />

      <section className="content-area mt-4">
        <Sidebar />
        <div className="Right-content">
          <div className="main-content">
            <PrivacyNoticeContent />

          </div>
          <Footer />
        </div>
      </section>


    </div>
  );
};

export default PrivacyNotice;
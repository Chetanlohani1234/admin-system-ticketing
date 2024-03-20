import React, { useEffect, useState, Fragment } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import Graphics from "../section/home/dashboard/graphics";
import TopProduct from "../section/home/dashboard/top-product";
import TopVendor from "../section/home/dashboard/top-vendor";
import StockReport from "../section/home/dashboard/stock-report";
import RecentOrder from "../section/home/dashboard/recent-order";
import DataService from "../services/data.service";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [dashdata, setDashData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState([]);
  const [topVendors, setTopVendors] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stockreport, setStockReport] = useState([]);


  // React.useEffect(() => {
  //   document.title = "Dashboard";
  //   getData();
  // }, []);

  // const getData = () => {
  //   setLoading(true);
  //   DataService.getDashboard().then((data) => {
  //     setDashData(data.data);
  //     setTopProducts(data.data.top_products);
  //     setTopVendors(data.data.top_vendors);
  //     setRecentOrders(data.data.recent_orders);
  //     setStockReport(data.data.stock_report);
  //       setLoading(false);
  //   });
  // }

  return (
    <div className="bg-grey h-100">
        <Header />
        <section className="content-area mt-4">
            <Sidebar/>
            <div className="Right-content">
              <div className="main-content">
                <div className="hp_title">
                  <h2>Hello,<br/>
                   Dashboard 🙂</h2>
                </div>
                <div className="hp_head">
                  <h4>Quick Actions</h4><br />
                </div>
                <div className="hp_quick">
                <div className="hp_inner"><Link to="/"><button>Open Ticket<i class="fas fa-long-arrow-alt-right"></i></button></Link></div>
                <div className="hp_inner"><Link to="/"><button>Close Ticket<i class="fas fa-long-arrow-alt-right"></i></button></Link></div>
                <div className="hp_inner"><Link to="/ticket"><button>All Ticket<i class="fas fa-long-arrow-alt-right"></i></button></Link></div>
                
                {/* <div className="hp_inner"><Link to="/artist"><button>All Artist<i class="fas fa-long-arrow-alt-right"></i></button></Link></div> */}
                </div>
              </div> 
              <Footer />
            </div>
        </section>
    </div>
  );
};

export default Dashboard;
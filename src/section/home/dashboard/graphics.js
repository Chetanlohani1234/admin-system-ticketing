import React, { Fragment } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

const Graphics = (props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement,
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  
  const labels = ['June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: '',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  let cancelledOrders = props?.data?.graph?.cancelled;
  let inProcessOrders = props?.data?.graph?.inprocess;
  let deliveredOrders = props?.data?.graph?.delivered;
  const piedata = {
    labels: ['Orders Delivered', 'Orders In Progress', 'Cancelled'],
    datasets: [
      {
        label: 'Total',
        data: [deliveredOrders, inProcessOrders, cancelledOrders],
        backgroundColor: [
          'rgba(244, 172, 61, 0.3)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };
  return (

    <div className="row">
      <div className="col-md-6">
        <h5>Sales Reports</h5>
        <Line options={options} data={data} />
      </div>
      <div className="col-md-3">
          <Pie data={piedata} />
      </div>
      <div className="col-md-3">
        <ul className="statics">
          <li className="bg-yellow-light p-4 rounded-3 mb-3">
            <div className="row">
              <div className="col-4 d-flex align-items-center">
                <i className="statics-icon d-flex align-items-center justify-content-center"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1C0 0.447715 0.447715 0 1 0H4C4.45887 0 4.85885 0.312297 4.97014 0.757464L5.78078 4H29C29.2975 4 29.5795 4.13245 29.7695 4.36136C29.9595 4.59028 30.0377 4.8919 29.9829 5.18429L26.9829 21.1843C26.8942 21.6573 26.4812 22 26 22H24H10H8C7.51878 22 7.10581 21.6573 7.01713 21.1843L4.02262 5.2136L3.21922 2H1C0.447715 2 0 1.55228 0 1ZM6.20492 6L8.82992 20H25.1701L27.7951 6H6.20492ZM10 22C7.79086 22 6 23.7909 6 26C6 28.2091 7.79086 30 10 30C12.2091 30 14 28.2091 14 26C14 23.7909 12.2091 22 10 22ZM24 22C21.7909 22 20 23.7909 20 26C20 28.2091 21.7909 30 24 30C26.2091 30 28 28.2091 28 26C28 23.7909 26.2091 22 24 22ZM10 24C11.1046 24 12 24.8954 12 26C12 27.1046 11.1046 28 10 28C8.89543 28 8 27.1046 8 26C8 24.8954 8.89543 24 10 24ZM24 24C25.1046 24 26 24.8954 26 26C26 27.1046 25.1046 28 24 28C22.8954 28 22 27.1046 22 26C22 24.8954 22.8954 24 24 24Z" fill="#F4AC3D" />
                </svg>
                </i>
              </div>
              <div className="col-8">
                <p className="mb-2 text-black-50">Orders</p>
                <div className="d-flex align-items-center">
                  <span>
                    <h4 className="mb-0 f-700">{props?.data?.orders}</h4>
                  </span>
                  {/* <i className="px-2"><svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35355 0.146446C4.15829 -0.0488148 3.84171 -0.0488148 3.64645 0.146446L0.464466 3.32843C0.269204 3.52369 0.269204 3.84027 0.464466 4.03553C0.659728 4.2308 0.976311 4.2308 1.17157 4.03553L4 1.20711L6.82843 4.03553C7.02369 4.2308 7.34027 4.2308 7.53553 4.03553C7.7308 3.84027 7.7308 3.52369 7.53553 3.32843L4.35355 0.146446ZM4.5 23.5L4.5 0.5H3.5L3.5 23.5H4.5Z" fill="#2C5F2D" />
                  </svg>
                  </i> */}
                  {/* <h6 className="mb-0 text-green">12.15</h6> */}
                </div>
              </div>
            </div>
          </li>

          <li className="bg-green-light p-4 rounded-3 mb-3">
            <div className="row">
              <div className="col-4 d-flex align-items-center">
                <i className="statics-icon d-flex align-items-center justify-content-center">
                  <svg width="30" height="30" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.125 22C28.125 22 30 22 30 20.1667C30 18.3333 28.125 12.8333 20.625 12.8333C13.125 12.8333 11.25 18.3333 11.25 20.1667C11.25 22 13.125 22 13.125 22H28.125ZM13.1669 20.1667C13.1604 20.1659 13.1513 20.1648 13.1403 20.163C13.1351 20.1621 13.13 20.1612 13.125 20.1603C13.1277 19.6762 13.4379 18.2727 14.5486 17.0056C15.5875 15.8205 17.405 14.6667 20.625 14.6667C23.845 14.6667 25.6625 15.8205 26.7014 17.0056C27.8121 18.2727 28.1223 19.6762 28.125 20.1603C28.12 20.1612 28.1149 20.1621 28.1097 20.163C28.0987 20.1648 28.0896 20.1659 28.0831 20.1667H13.1669Z" fill="black"></path><path d="M20.625 9.16667C22.6961 9.16667 24.375 7.52504 24.375 5.5C24.375 3.47496 22.6961 1.83333 20.625 1.83333C18.5539 1.83333 16.875 3.47496 16.875 5.5C16.875 7.52504 18.5539 9.16667 20.625 9.16667ZM26.25 5.5C26.25 8.53757 23.7316 11 20.625 11C17.5184 11 15 8.53757 15 5.5C15 2.46243 17.5184 0 20.625 0C23.7316 0 26.25 2.46243 26.25 5.5Z" fill="black"></path><path d="M13.0049 13.3466C12.3152 13.1309 11.5491 12.9741 10.6993 12.8939C10.2787 12.8543 9.83753 12.8333 9.375 12.8333C1.875 12.8333 0 18.3333 0 20.1667C0 21.3889 0.625 22 1.875 22H9.78068C9.51668 21.4792 9.375 20.8618 9.375 20.1667C9.375 18.3145 10.0823 16.423 11.4184 14.843C11.8749 14.3032 12.4047 13.7997 13.0049 13.3466ZM9.22508 14.6675C8.10479 16.3416 7.5 18.2503 7.5 20.1667H1.875C1.875 19.6887 2.18296 18.2783 3.29861 17.0056C4.32128 15.839 6.09842 14.7027 9.22508 14.6675Z" fill="black"></path><path d="M2.8125 6.41667C2.8125 3.3791 5.3309 0.916667 8.4375 0.916667C11.5441 0.916667 14.0625 3.3791 14.0625 6.41667C14.0625 9.45423 11.5441 11.9167 8.4375 11.9167C5.3309 11.9167 2.8125 9.45423 2.8125 6.41667ZM8.4375 2.75C6.36643 2.75 4.6875 4.39162 4.6875 6.41667C4.6875 8.44171 6.36643 10.0833 8.4375 10.0833C10.5086 10.0833 12.1875 8.44171 12.1875 6.41667C12.1875 4.39162 10.5086 2.75 8.4375 2.75Z" fill="black"></path></svg>
                </i>
              </div>
              <div className="col-8">
                <p className="mb-2 text-white">Customers</p>
                <div className="d-flex align-items-center">
                  <span>
                    <h4 className="mb-0 f-700">{props?.data?.customers}</h4>
                  </span>
                  {/* <i className="px-2">
                    <svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35355 0.146446C4.15829 -0.0488148 3.84171 -0.0488148 3.64645 0.146446L0.464466 3.32843C0.269204 3.52369 0.269204 3.84027 0.464466 4.03553C0.659728 4.2308 0.976311 4.2308 1.17157 4.03553L4 1.20711L6.82843 4.03553C7.02369 4.2308 7.34027 4.2308 7.53553 4.03553C7.7308 3.84027 7.7308 3.52369 7.53553 3.32843L4.35355 0.146446ZM4.5 23.5L4.5 0.5H3.5L3.5 23.5H4.5Z" fill="#2C5F2D" />
                  </svg>
                  </i> */}
                  {/* <h6 className="mb-0 text-green">7.1%</h6> */}
                </div>
              </div>
            </div>
          </li>

          <li className="ng-grey-light p-4 rounded-3 mb-3">
            <div className="row">
              <div className="col-4 d-flex align-items-center">
                <i className="statics-icon d-flex align-items-center justify-content-center">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H1.5V22.5H24V24H0V0ZM15 5.25C15 4.83579 15.3358 4.5 15.75 4.5H21.75C22.1642 4.5 22.5 4.83579 22.5 5.25V11.25C22.5 11.6642 22.1642 12 21.75 12C21.3358 12 21 11.6642 21 11.25V7.35106L15.5805 13.9749C15.4463 14.1389 15.249 14.2385 15.0374 14.2491C14.8257 14.2596 14.6195 14.1802 14.4697 14.0303L10.5903 10.151L5.10655 17.6911C4.86292 18.0261 4.39386 18.1002 4.05887 17.8566C3.72388 17.6129 3.64982 17.1439 3.89345 16.8089L9.89345 8.55887C10.0225 8.38148 10.2227 8.26945 10.4413 8.2523C10.66 8.23514 10.8752 8.31457 11.0303 8.46967L14.9443 12.3837L20.1673 6H15.75C15.3358 6 15 5.66421 15 5.25Z" fill="black"></path></svg>
                </i>
              </div>
              <div className="col-8">
                <p className="mb-2 text-yellow">Revenue</p>
                <div className="d-flex align-items-center">
                  <span>
                    <h4 className="mb-0 f-700">KSh. {props?.data?.revenue}</h4>
                  </span>
                  {/* <i className="px-2"><svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35355 0.146446C4.15829 -0.0488148 3.84171 -0.0488148 3.64645 0.146446L0.464466 3.32843C0.269204 3.52369 0.269204 3.84027 0.464466 4.03553C0.659728 4.2308 0.976311 4.2308 1.17157 4.03553L4 1.20711L6.82843 4.03553C7.02369 4.2308 7.34027 4.2308 7.53553 4.03553C7.7308 3.84027 7.7308 3.52369 7.53553 3.32843L4.35355 0.146446ZM4.5 23.5L4.5 0.5H3.5L3.5 23.5H4.5Z" fill="#2C5F2D" />
                  </svg>
                  </i> */}
                  {/* <h6 className="mb-0">12.15%</h6> */}
                </div>
              </div>
            </div>
          </li>

        </ul>
      </div>

    </div>
  );
};

export default Graphics;
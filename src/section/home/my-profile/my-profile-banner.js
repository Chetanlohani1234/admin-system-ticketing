import React, { Fragment } from "react";

const MyProfileBanner = (props) => {
    return (
        <div className="MyprofileBanner">
            <div className="profile-info">
                <figure className='mb-0'>
                {(props?.data?.file_path ? 
                                    <img src={"opm-stream.onrender.com/"+props?.data?.file_path} alt="profie image" />
                                : ""
                                )}
                    </figure>
                <div className="profile-detail">
                    <h4 className="text-white mb-1">{props?.data?.first_name}</h4>
                    <p className="text-white mb-0">{props?.data?.last_name}</p>
                    <p className="text-white mb-0"><i className="me-1"><svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1658 8.93977C9.64175 10.0015 8.93246 11.0601 8.20575 12.01C7.48132 12.957 6.75442 13.7768 6.20768 14.3605C6.13503 14.438 6.06566 14.5113 6 14.5801C5.93434 14.5113 5.86497 14.438 5.79232 14.3605C5.24558 13.7768 4.51868 12.957 3.79425 12.01C3.06754 11.0601 2.35825 10.0015 1.83423 8.93977C1.3048 7.86708 1 6.86191 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6C11 6.86191 10.6952 7.86708 10.1658 8.93977ZM6 16C6 16 12 10.3137 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 10.3137 6 16 6 16Z" fill="#F6F5FA" />
                        <path d="M6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6C8 7.10457 7.10457 8 6 8ZM6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" fill="#F6F5FA" />
                    </svg>
                    </i>{props?.data?.address}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfileBanner;
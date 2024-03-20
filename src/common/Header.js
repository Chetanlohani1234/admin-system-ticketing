import React, { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import DataService from "../services/data.service"
import Logo from "../image/logoRed.png"

const Header = () => {
  const navigate = useNavigate();

  const [noticeCount, setNoticeCount] = useState(0);

  React.useEffect(() => {
      document.title = "Profile";
      // getData();
  }, []);

  const logout = (e) => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  }
  
  // const getData = async () => {
  //   await DataService.getNotifications().then((data) => {
  //       if(data?.data?.data){
  //           if(data?.data?.data.length && data?.data?.data.length > 0){
  //               var filter = data?.data?.data.filter((item) => {
  //                   return item.is_read == 0;
  //               })
  //               setNoticeCount(filter.length);
  //           }
  //       }
  //   })
  // }

  return (
    <header>
      <div className='container-fluid' >
        <div className='row pt-3 px-3 '>
          <div className='col'><img src='../../assets/img/adminlogo.png' className="main_logo" alt='' /></div>
          {/* <div className='col'><img src={Logo} className="main_logo" alt='' /></div> */}
       
      
          
          
          <div className='col-md-6 d-flex justify-content-end align-items-center'>
            {/* <div id='search-bar'>
              <i><svg width="20"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6132 15.5158C18.7994 13.901 19.5 11.9073 19.5 9.75C19.5 4.36522 15.1348 0 9.75 0C4.36522 0 0 4.36522 0 9.75C0 15.1348 4.36522 19.5 9.75 19.5C11.9079 19.5 13.902 18.799 15.5171 17.6123L15.5158 17.6132C15.5601 17.6732 15.6093 17.7307 15.6636 17.785L21.4393 23.5607C22.0251 24.1465 22.9749 24.1465 23.5607 23.5607C24.1465 22.9749 24.1465 22.0251 23.5607 21.4393L17.785 15.6636C17.7307 15.6093 17.6732 15.5601 17.6132 15.5158ZM18 9.75C18 14.3063 14.3063 18 9.75 18C5.19365 18 1.5 14.3063 1.5 9.75C1.5 5.19365 5.19365 1.5 9.75 1.5C14.3063 1.5 18 5.19365 18 9.75Z" fill="#161616" />
              </svg>
              </i>
              <input type="search" name='search' />
              </div> */}
            <Link to={"/notification"} className='pr'>
              {/* <svg width="22"  viewBox="0 0 38 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 42C21.8995 42 24.25 39.6495 24.25 36.75H13.75C13.75 39.6495 16.1005 42 19 42Z" fill="#c7001f" />
                <path d="M19 5.03541L16.9074 5.45804C12.1107 6.42676 8.50006 10.6697 8.50006 15.75C8.50006 17.398 8.14735 21.5178 7.29553 25.5732C6.87267 27.5864 6.30692 29.6825 5.555 31.5H32.445C31.6931 29.6825 31.1274 27.5864 30.7045 25.5732C29.8527 21.5178 29.5001 17.398 29.5001 15.75C29.5001 10.6696 25.8893 6.42671 21.0927 5.45802L19 5.03541ZM35.3257 31.5C35.9117 32.6744 36.5914 33.6026 37.375 34.125H0.625C1.40863 33.6026 2.0883 32.6744 2.67434 31.5C5.03296 26.7733 5.87506 18.0578 5.87506 15.75C5.87506 9.39577 10.3905 4.09618 16.3877 2.88499C16.3793 2.79946 16.375 2.71273 16.375 2.625C16.375 1.17525 17.5503 0 19 0C20.4497 0 21.625 1.17525 21.625 2.625C21.625 2.71273 21.6207 2.79945 21.6123 2.88496C27.6095 4.09611 32.1251 9.39573 32.1251 15.75C32.1251 18.0578 32.9671 26.7733 35.3257 31.5Z" fill="#c7001f" />
              </svg> */}
              <div className='col'><img src='../../assets/img/Bell.png' className="notification_logo" alt='' /></div>
             {noticeCount > 0 && <div class="notication_count_profile"><h2>{noticeCount}</h2></div>} 
            </Link>

            <Link onClick={logout} className='ms-3'>
               Logout <svg fill="none" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m12 3c.5523 0 1 .44772 1 1v8c0 .5523-.4477 1-1 1s-1-.4477-1-1v-8c0-.55228.4477-1 1-1zm-4.54189 2.33825c.36546.41408.32606 1.04601-.08801 1.41148-1.4549 1.28411-2.3701 3.15969-2.3701 5.25027 0 3.866 3.13401 7 7 7 3.866 0 7-3.134 7-7 0-2.09058-.9152-3.96616-2.3701-5.25027-.4141-.36547-.4535-.9974-.088-1.41147.3655-.41408.9974-.45348 1.4115-.08801 1.8668 1.64766 3.0466 4.06154 3.0466 6.74975 0 4.9706-4.0294 9-9 9-4.97056 0-9-4.0294-9-9 0-2.68821 1.17984-5.10209 3.04663-6.74975.41408-.36547 1.04601-.32607 1.41148.088z" fill="rgb(0 0 0)" fill-rule="evenodd"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
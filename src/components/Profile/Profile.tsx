import {handleClearLocalStorage, Header} from '../Header';
import {useQuery} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';

import {TimezoneSelector} from './TimezoneSelect';

export const userUrl = 'http://localhost:5000/users/';

export const Profile = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');


  const {isLoading, error, data} = useQuery('userInfo',
      () => axios.get(`${userUrl}${userId}`, {headers: {Authorization: `Bearer ${token}`}}),
  );


  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.response.data.message === UNAUTHORIZED) {
      toast.error('Please login to App');
      handleClearLocalStorage();
    }
  }

  if (isLoading) {
    return (
      <>
        <Header/>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header/>
      <div className="card" style={{'width': '18rem'}}>
        {/* <img src="..." className="card-img-top" alt="..."> */}
        <div className="card-body">
          <h5 className="card-title">{data.data.username}</h5>
          <p className="card-text">{data.data.email}</p>
          <TimezoneSelector user={data.data}/>
        </div>
      </div>
    </>

  );
};

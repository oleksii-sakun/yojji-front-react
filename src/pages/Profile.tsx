import {Header} from '../components/Header';
import {TimezoneSelector} from '../components/TimezoneSelect';
import {useQuery} from 'react-query';
import {getUserInfoReq} from '../api/requests';
import {LoadingSpinner} from '../components/LoadingSpinner';


export const Profile = () => {
  const userId = localStorage.getItem('userId');

  const {isLoading, error, data} = useQuery('userInfo',
      ()=>getUserInfoReq(userId),
  );

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return (
      <LoadingSpinner/>
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

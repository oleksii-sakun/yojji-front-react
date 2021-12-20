import {Header} from '../components/Header';
import {TimezoneSelector} from '../components/ComposedComponents/TimezoneSelect';
import {useQuery} from 'react-query';
import {getUserInfoReq} from '../api/requests';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {Error} from '../components/ComposedComponents/Error/Error';


export const Profile = ():JSX.Element => {
  const userId = localStorage.getItem('userId');

  const {isLoading, error, data} = useQuery('userInfo',
      ()=>getUserInfoReq(Number(userId)),
  );

  if (error) {
    return (
      <Error error={error}/>
    );
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

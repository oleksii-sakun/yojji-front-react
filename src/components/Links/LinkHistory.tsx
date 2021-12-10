import {useQuery} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';
import {handleClearLocalStorage, Header} from '../Header';


const linksUrl = 'http://localhost:5000/links/';

export const LinkHistory = (): JSX.Element=> {
  const currentPage = window.location.href;
  const parsed = currentPage.split('/');
  const linkId = parsed[parsed.indexOf('linkhistory') + 1];


  const token = localStorage.getItem('token');
  const {isLoading, error, data} = useQuery('projectLinks',
      () => axios.get(`${linksUrl}${linkId}`, {headers: {Authorization: `Bearer ${token}`}}),
  );

  console.log(data);
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
      <div className='container'>
        <h2>Links</h2>
        <p>{data.data.linkUrl}</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date of check</th>
              <th scope="col">Check status</th>
              <th scope="col">Follow status</th>
            </tr>
          </thead>
          <tbody>
            {data && data.data.checkedLinks.map((check, i)=> {
              return (
                <tr key={check.id}>
                  <th scope="row">{i+1}</th>
                  <td>{check.dateOfCheck}</td>
                  <td>{check.linkStatus ? 'OK' : 'No link on page'}</td>
                  <td>{check.followingStatus ? 'OK' : 'Can not follow'}</td>
                </tr>

              );
            })}</tbody>
        </table>
      </div>
    </>
  );
};

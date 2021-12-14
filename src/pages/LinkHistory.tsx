import {Header} from '../components/Header';
import {useQuery} from 'react-query';
import {getLinkByIdReq} from '../api/requests';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {useParams} from 'react-router';

export const LinkHistory = (): JSX.Element=> {
  const {id: linkId} = useParams();


  const {isLoading, error, data} = useQuery('getLinkHistoryById',
      ()=>getLinkByIdReq(linkId),
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

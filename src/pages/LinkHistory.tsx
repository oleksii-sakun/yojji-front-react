import {Header} from '../components/Header';
import {useQuery} from 'react-query';
import {getLinkByIdReq} from '../api/requests';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {useParams} from 'react-router';
import {LinkHistoryTable} from '../components/ComposedComponents/LinkHistoryTable';
import {Error} from '../components/ComposedComponents/Error/Error';

export const LinkHistory = (): JSX.Element=> {
  const {id: linkId} = useParams();


  const {isLoading, error, data} = useQuery('getLinkHistoryById',
      ()=>getLinkByIdReq(Number(linkId)),
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
      <div className='container'>
        <h2>Links</h2>
        <p>{data.data.linkUrl}</p>
        <LinkHistoryTable data={data.data}/>
      </div>
    </>
  );
};

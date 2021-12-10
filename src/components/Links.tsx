import {useQuery} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';
import {handleClearLocalStorage, Header} from './Header';
import {LinkI} from './Projects/Projects';

const projectLinksUrl = 'http://localhost:5000/links/byprojectid/';

export const Links = ()=> {
  // const currentPage = window.location.href;
  const projectId = 22;
  const token = localStorage.getItem('token');
  const {isLoading, error, data} = useQuery('projectLinks',
      () => axios.get(`${projectLinksUrl}${projectId}`, {headers: {Authorization: `Bearer ${token}`}}),
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

    <div className='container'>
      <h2>Links</h2>
      {data && data.data.map((link: LinkI)=> {
        return (<div className="list-group m-2" key={link.id}>
          <a href={'#'} className="list-group-item list-group-item-action" aria-current="true">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{link.linkName}</h5>
              <div className="d-flex flex-column">
                {/* <button onClick={()=>handleRemoveProject(project.id)} type="button" className="btn btn-warning btn-sm"><i className="bi bi-trash">Remove</i></button> */}
              </div>
            </div>
            <p className="mb-1">{link.linkUrl}</p>
            <small>And some small print.</small>
          </a>
        </div>);
      })}
    </div>
  );
};

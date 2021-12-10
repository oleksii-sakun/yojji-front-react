import {useQuery} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';
import {handleClearLocalStorage, Header} from '../Header';
import {LinkI} from '../interfaces';
import {useState} from 'react';
import {AddLinkModal} from './AddLinkModal';
import {RemoveLinkModal} from './RemoveLinkModal';


const customStyles = {
  content: {
    height: '370px',
    width: '300px',
    padding: '35px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const customStylesForRemoveLinkModal = {
  content: {
    height: '150px',
    width: '285px',
    padding: '35px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const projectLinksUrl = 'http://localhost:5000/links/byprojectid/';

export const Links = (): JSX.Element=> {
  const [addLinkModalStatus, setAddLinkModalStatus] = useState(false);
  const [removeLinkModalStatus, setRemoveLinkModalStatus] = useState(false);
  const [linkToRemoveId, setLinkToRemoveId] = useState(null);

  const currentPage = window.location.href;
  const parsed = currentPage.split('/');
  const projectId = parsed[parsed.indexOf('links') + 1];

  const token = localStorage.getItem('token');
  const {isLoading, error, data} = useQuery('projectLinks',
      () => axios.get(`${projectLinksUrl}${projectId}`, {headers: {Authorization: `Bearer ${token}`}}),
  );

  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.response.data.message === UNAUTHORIZED) {
      toast.error('Please login to App');
      handleClearLocalStorage();
    }
  }

  const handleSetAddLinkModalStatus = ()=> {
    setAddLinkModalStatus(((prevState) => !prevState));
  };

  const handleRemoveLink = (linkId?: number)=> {
    setLinkToRemoveId(linkId);
    setRemoveLinkModalStatus(((prevState) => !prevState));
  };

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
      <RemoveLinkModal modalIsOpen = {removeLinkModalStatus}
        afterOpenModal = {null}
        closeModal={handleRemoveLink}
        customStyles={customStylesForRemoveLinkModal}
        linkToRemoveId = {linkToRemoveId}/>
      <AddLinkModal modalIsOpen = {addLinkModalStatus}
        afterOpenModal = {null}
        closeModal={handleSetAddLinkModalStatus}
        customStyles={customStyles}
        projectId={+projectId}/>
      <div className='container'>
        <h2>Links</h2>
        <button onClick={handleSetAddLinkModalStatus} type="button" className="btn btn-success">Add new link</button>
        {data && data.data.map((link: LinkI)=> {
          return (<div className="list-group m-2" key={link.id}>
            <div className="list-group-item list-group-item-action" aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{link.linkName}</h5>
                <div className="d-flex flex-column">
                  <button onClick={()=>handleRemoveLink(link.id)} type="button" className="btn btn-warning btn-sm"><span
                    className="material-icons">
delete
                  </span></button>
                </div>
              </div>
              <p className="mb-1">{link.linkUrl}</p>
              {link.checkedLinks.length ? <div>
                <p>Link last check date: {link.checkedLinks[link.checkedLinks.length - 1].dateOfCheck}</p>
                <p>Last check
                  status: {link.checkedLinks[link.checkedLinks.length - 1].linkStatus ? 'OK' : 'No link on page'}</p>
                <p>Last follow
                  status: {link.checkedLinks[link.checkedLinks.length - 1].followingStatus ? 'OK' : 'Can not follow'}</p>
                <button type="button" className="btn btn-info"><a href={`http://localhost:3000/linkhistory/${link.id}`}
                  style={{'color': 'black'}}>Go to link check
                  history</a></button>
              </div> : <div style={{'color': 'darkred'}}>this link has not been checked yet</div>}
            </div>
          </div>);
        })}
      </div>
    </>
  );
};

import {Header} from '../components/Header';
import {LinkI} from '../components/interfaces';
import {useState} from 'react';
import {AddLinkModal} from '../components/AddLinkModal';
import {RemoveLinkModal} from '../components/RemoveLinkModal';
import {useQuery} from 'react-query';
import {getLinkByProjectIdReq} from '../api/requests';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {useParams} from 'react-router';
import {LinkCard} from '../components/LinkCard';


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


export const Links = (): JSX.Element=> {
  const [addLinkModalStatus, setAddLinkModalStatus] = useState(false);
  const [removeLinkModalStatus, setRemoveLinkModalStatus] = useState(false);
  const [linkToRemoveId, setLinkToRemoveId] = useState(null);

  const {id: projectId} = useParams();

  const {isLoading, error, data} = useQuery('projectLinks', ()=>getLinkByProjectIdReq(projectId));

  if (error) {
    console.log(error);
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
      <LoadingSpinner/>
    );
  }

  return (
    <>
      <Header/>
      <RemoveLinkModal modalIsOpen = {removeLinkModalStatus}
        afterOpenModal = {null}
        closeModal={handleRemoveLink}
        customStyles={customStylesForRemoveLinkModal}
        linkToRemoveId = {linkToRemoveId}
      />

      <AddLinkModal modalIsOpen = {addLinkModalStatus}
        afterOpenModal = {null}
        closeModal={handleSetAddLinkModalStatus}
        customStyles={customStyles}
        projectId={+projectId}
      />

      <div className='container'>
        <h2>Links</h2>
        <button onClick={handleSetAddLinkModalStatus} type="button" className="btn btn-success">Add new link</button>
        {data && data.data.map((link: LinkI)=>
          <LinkCard link={link} handleRemoveLink={handleRemoveLink} key={link.id}/>,
        )}
      </div>
    </>
  );
};

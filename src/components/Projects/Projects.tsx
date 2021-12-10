import {useQuery} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';
import {handleClearLocalStorage, Header} from '../Header';
import {useState} from 'react';
import {AddProjectModal} from './AddProjectModal';
import {RemoveProjectModal} from './RemoveProjectModal';


export interface LinkI {
  id: number
  linkName: string
  linkUrl: string
}

export interface ProjectI {
  id: number
  projectName: string;
  projectWebsite: string;
  links: LinkI[];
}

const customStyles = {
  content: {
    height: '350px',
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

const customStylesForRemoveProjectModal = {
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

const UNAUTHORIZED = 'Unauthorized';
const usersProjectsUrl ='http://localhost:5000/projects/byuserid/';

export const Projects = (): JSX.Element => {
  const [modalStatus, setModalStatus] = useState(false);
  const [removeProjectModalStatus, setRemoveProjectModalStatus] = useState(false);
  const [projectToRemoveId, setProjectToRemoveId] = useState(null);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const {isLoading, error, data} = useQuery('usersProjects',
      () => axios.get(`${usersProjectsUrl}${userId}`, {headers: {Authorization: `Bearer ${token}`}}),
  );

  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.response.data.message === UNAUTHORIZED) {
      toast.error('Please login to App');
      handleClearLocalStorage();
    }
  }

  const handleRemoveProject = (projectId) => {
    setProjectToRemoveId(projectId);
    setRemoveProjectModalStatus(((prevState) => !prevState));
  };

  const handleSetModalStatus = ()=> {
    setModalStatus(((prevState) => !prevState));
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
      <RemoveProjectModal modalIsOpen = {removeProjectModalStatus}
        afterOpenModal = {null}
        closeModal={handleRemoveProject}
        customStyles={customStylesForRemoveProjectModal}
        projectToRemoveId = {projectToRemoveId}/>
      <AddProjectModal modalIsOpen = {modalStatus} afterOpenModal = {null} closeModal={handleSetModalStatus} customStyles={customStyles}/>
      <Header/>
      <div className='container'>
        <button onClick={handleSetModalStatus} type="button" className="btn btn-success">Add new project</button>
        {data.data.map((project)=>
          <div className="list-group m-2" key={project.id}>
            <a href={`http://localhost:3000/projects/links/${project.id}`} className="list-group-item list-group-item-action" aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{project.projectName}</h5>
                <div className="d-flex flex-column">
                  <small>Total links: {project.links.length}</small>
                  <button onClick={()=>handleRemoveProject(project.id)} type="button" className="btn btn-warning btn-sm"><i className="bi bi-trash">Remove</i></button>
                </div>
              </div>
              <p className="mb-1">{project.projectWebsite}</p>
              <small>And some small print.</small>
            </a>
          </div>)}
      </div>
    </>
  );
};

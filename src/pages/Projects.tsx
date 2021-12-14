import {useState} from 'react';
import {AddProjectModal} from '../components/AddProjectModal';
import {RemoveProjectModal} from '../components/RemoveProjectModal';
import {Header} from '../components/Header';
import {useQuery} from 'react-query';
import {getProjectsByUserIdReq} from '../api/requests';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {ProjectCard} from '../components/ProjectCard';

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


export const Projects = (): JSX.Element => {
  const [modalStatus, setModalStatus] = useState(false);
  const [removeProjectModalStatus, setRemoveProjectModalStatus] = useState(false);
  const [projectToRemoveId, setProjectToRemoveId] = useState(null);

  const userId = localStorage.getItem('userId');

  const {isLoading, error, data} = useQuery('usersProjects', ()=>getProjectsByUserIdReq(userId));


  if (error) {
    console.log(error);
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
      <LoadingSpinner/>
    );
  }


  return (
    <>
      <Header/>

      <div className='container'>
        <button onClick={handleSetModalStatus} type="button" className="btn btn-success">Add new project</button>

        {data && data.data.length ? data.data.map((project)=>
          <ProjectCard
            project={project}
            handleRemoveProject={handleRemoveProject}
            key={project.id}
          />,
        ) : null}
      </div>
      <RemoveProjectModal modalIsOpen = {removeProjectModalStatus}
        afterOpenModal = {null}
        closeModal={handleRemoveProject}
        customStyles={customStylesForRemoveProjectModal}
        projectToRemoveId = {projectToRemoveId}
      />

      <AddProjectModal modalIsOpen = {modalStatus}
        afterOpenModal = {null}
        closeModal={handleSetModalStatus}
        customStyles={customStyles}/>
    </>
  );
};

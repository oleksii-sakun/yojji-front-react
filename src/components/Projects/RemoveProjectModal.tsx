import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {toast} from 'react-toastify';


interface RemoveProjectModalPropsI {
  modalIsOpen: boolean
  afterOpenModal: ()=>void
  closeModal: (projectId: number | null)=>void
  customStyles:any
  projectToRemoveId: number
}

const projectsUrl ='http://localhost:5000/projects/';

export const RemoveProjectModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles, projectToRemoveId}: RemoveProjectModalPropsI): JSX.Element=> {
  const token = localStorage.getItem('token');


  const handleRestoreProject = (projectToRestoreId)=> {
    axios.post(`${projectsUrl}restore/${projectToRestoreId}`, {}, {headers: {Authorization: `Bearer ${token}`}})
        .then(()=> {
          toast.success(`Project with id: ${projectToRestoreId}successfully restored.`);
        })
        .catch((err) => {
          console.log(err);
          toast.error(`${err.response.data.message}`);
        });
  };

  const handleRemoveModal = ()=> {
    axios.delete(`${projectsUrl}${projectToRemoveId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(() => {
          toast.success(`Project with id: ${projectToRemoveId}successfully removed.`);
          toast.warn(<div><p>You can restore deleted project</p> <button onClick={()=>handleRestoreProject(projectToRemoveId)}>Restore</button></div>, {
            position: 'bottom-right',
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          closeModal(null);
        })
        .catch((err) => {
          console.log(err);
          toast.error(`${err.response.data.message}`);
        });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <h5>Remove project?</h5>

        <div className="d-flex justify-content-between">
          <button onClick={()=>closeModal(null)} type="button" className="btn btn-success m-1 btn-sm">Close</button>
          <button onClick={handleRemoveModal} type="button" className="btn btn-danger m-1 btn-sm">Remove</button>
        </div>
      </Modal>
    </div>
  );
};

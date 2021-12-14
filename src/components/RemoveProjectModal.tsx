import React from 'react';
import Modal from 'react-modal';
import {removeProjectReq, restoreProjectReq} from '../api/requests';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {queryClient} from '../App';
import {ResponseErrorI} from './interfaces';


interface RemoveProjectModalPropsI {
  modalIsOpen: boolean
  afterOpenModal: ()=>void
  closeModal: (projectId: number | null)=>void
  customStyles:any
  projectToRemoveId: number
}


export const RemoveProjectModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles, projectToRemoveId}: RemoveProjectModalPropsI): JSX.Element=> {
  const removeProjectMutation = useMutation(removeProjectReq, {

    onSuccess: () => {
      toast.success(`Project with id: ${projectToRemoveId}successfully removed.`);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      toast.warn(<div><p>You can restore deleted project</p> <button onClick={()=>handleRestoreProject(projectToRemoveId)}>Restore</button></div>, {
        position: 'bottom-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries('usersProjects');
      closeModal(null);
    },
    // //make normal interface
    onError: (error: ResponseErrorI)=> {
      toast.error(`${error.response.data.message}`);
    },
  });

  const restoreProjectMutation = useMutation(restoreProjectReq, {

    onSuccess: ()=> {
      toast.success(`Project with id: ${projectToRemoveId}successfully restored.`);
      queryClient.invalidateQueries('usersProjects');
    },
    onError: (error: ResponseErrorI)=> {
      toast.error(`${error.response.data.message}`);
    },

  });


  const handleRemoveModal = ()=> {
    removeProjectMutation.mutate( projectToRemoveId );
  };

  const handleRestoreProject = (projectToRemoveId)=> {
    restoreProjectMutation.mutate(projectToRemoveId);
  };


  return (

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

  );
};

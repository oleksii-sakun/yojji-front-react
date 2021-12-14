import React from 'react';
import Modal from 'react-modal';
import {removeLinkReq} from '../api/requests';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ResponseErrorI} from './interfaces';
import {queryClient} from '../App';


interface RemoveLinkModalPropsI {
  modalIsOpen: boolean
  afterOpenModal: ()=>void
  closeModal: (projectId: number | null)=>void
  customStyles:any
  linkToRemoveId: number
}


export const RemoveLinkModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles, linkToRemoveId}: RemoveLinkModalPropsI): JSX.Element=> {
  const removeLinkMutation = useMutation(removeLinkReq, {
    onSuccess: ()=> {
      toast.success(`Link with id: ${linkToRemoveId}successfully removed.`);
      queryClient.invalidateQueries('projectLinks');
      closeModal(null);
    },
    onError: (error: ResponseErrorI)=> {
      toast.error(`${error.response.data.message}`);
    },
  });


  const handleRemoveModal = ()=> {
    removeLinkMutation.mutate(linkToRemoveId);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h5>Remove link?</h5>

        <div className="d-flex justify-content-between">
          <button onClick={()=>closeModal(null)} type="button" className="btn btn-success m-1 btn-sm">Close</button>
          <button onClick={handleRemoveModal} type="button" className="btn btn-danger m-1 btn-sm">Remove</button>
        </div>
      </Modal>
    </div>
  );
};

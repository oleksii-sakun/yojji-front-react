import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {toast} from 'react-toastify';


interface RemoveLinkModalPropsI {
  modalIsOpen: boolean
  afterOpenModal: ()=>void
  closeModal: (projectId: number | null)=>void
  customStyles:any
  linkToRemoveId: number
}

const linksUrl ='http://localhost:5000/links/';

export const RemoveLinkModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles, linkToRemoveId}: RemoveLinkModalPropsI): JSX.Element=> {
  const token = localStorage.getItem('token');
  const handleRemoveModal = ()=> {
    axios.delete(`${linksUrl}${linkToRemoveId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(() => {
          toast.success(`Link with id: ${linkToRemoveId}successfully removed.`);
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

import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {toast} from 'react-toastify';

const projectsUrl ='http://localhost:5000/projects/';

export const RemoveProjectModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles, projectToRemoveId})=> {
  const token = localStorage.getItem('token');
  const handleRemoveModal = ()=> {
    axios.delete(`${projectsUrl}${projectToRemoveId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(() => {
          toast.success(`Project with id: ${projectToRemoveId}successfully created.`);
          closeModal();
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
          <button onClick={closeModal} type="button" className="btn btn-success m-1 btn-sm">Close</button>
          <button onClick={handleRemoveModal} type="button" className="btn btn-danger m-1 btn-sm">Remove</button>
        </div>
      </Modal>
    </div>
  );
};

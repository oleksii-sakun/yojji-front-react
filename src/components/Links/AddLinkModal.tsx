import {useFormik} from 'formik';
import * as Yup from 'yup';
import {CreateLinkI} from '../interfaces';
import axios from 'axios';
import {toast} from 'react-toastify';
import React from 'react';
import Modal from 'react-modal';


interface AddLinkModalPropsI {
  modalIsOpen: boolean
  afterOpenModal: ()=>void
  closeModal: ()=>void
  customStyles:any
  projectId: number
}


const linksUrl ='http://localhost:5000/links/';

export const AddLinkModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles, projectId}: AddLinkModalPropsI): JSX.Element=> {
  const token = localStorage.getItem('token');
  console.log(projectId);
  console.log(typeof projectId);
  const formik = useFormik(
      {
        initialValues: {
          linkName: '',
          linkUrl: '',
        },
        validationSchema: Yup.object({
          linkName: Yup.string()
              .max(50, 'Must be a string')
              .required('Required'),
          linkUrl: Yup.string()
              .url('Must be a valid url')
              .required('Required'),
        }),
        onSubmit: (values) => {
          const newLink: CreateLinkI = {
            ...values, project: projectId,
          };
          axios.post(linksUrl, newLink, {headers: {Authorization: `Bearer ${token}`}})
              .then(() => {
                toast.success('New link successfully added to project.');
                closeModal();
              })
              .catch((err) => {
                console.log(err);
                toast.error(`${err.response.data.message}`);
              });
        },
      },
  );

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
        <h5>Create new link</h5>

        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex w-100 mt-3 justify-content-between flex-column">
            <label className='mt-3' htmlFor="linkName">Link name</label>
            <input
              className='mt-3'
              id="linkName"
              name="linkName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.linkName}
            />
            {formik.touched.linkName && formik.errors.linkName ? (
              <div>{formik.errors.linkName}</div>
            ) : null}
            <label className='mt-3' htmlFor="linkUrl">Link url</label>
            <input
              className='mt-3'
              id="linkUrl"
              type="text"
              name="linkUrl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.linkUrl}
            />
            {formik.touched.linkUrl && formik.errors.linkUrl ? (
              <div>{formik.errors.linkUrl}</div>
            ) : null}
          </div>

          <div className="d-flex w-100 justify-content-between m-2">
            <button onClick={closeModal} type="button" className="btn btn btn-danger">Close</button>
            <button type="submit" className="btn btn-success">Create link</button>
          </div>

        </form>
      </Modal>
    </div>
  );
};

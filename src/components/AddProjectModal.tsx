import Modal from 'react-modal';
import {useFormik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {CreateProjectI} from './interfaces';
import {useMutation} from 'react-query';
import {addProjectReq} from '../api/requests';
import {toast} from 'react-toastify';
import {queryClient} from '../App';


interface AddProjectModalPropsI {
  modalIsOpen: boolean
  afterOpenModal: ()=>void
  closeModal: ()=>void
  customStyles:any
}

export const AddProjectModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles}: AddProjectModalPropsI): JSX.Element=> {
  const currentUserId = Number(localStorage.getItem('userId'));


  const mutation = useMutation(addProjectReq, {
    onSuccess: () => {
      toast.success('New project successfully created.');
      queryClient.invalidateQueries('usersProjects');
      closeModal();
    },
    onError: (error: {response:{data:{message: string}}})=> {
      toast.error(`${error.response.data.message}`);
    },
  });

  const formik = useFormik(
      {
        initialValues: {
          projectName: '',
          projectWebsite: '',
        },
        validationSchema: Yup.object({
          projectName: Yup.string()
              .max(50, 'Must be a string')
              .required('Required'),
          projectWebsite: Yup.string()
              .url('Must be a valid url')
              .required('Required'),
        }),
        onSubmit: (values) => {
          const newProject: CreateProjectI = {
            ...values, author: currentUserId,
          };

          mutation.mutate(newProject);
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
      >
        <h5>Create new project</h5>

        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex w-100 mt-3 justify-content-between flex-column">
            <label className='mt-3' htmlFor="projectName">Project name</label>
            <input
              className='mt-3'
              id="projectName"
              name="projectName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.projectName}
            />
            {formik.touched.projectName && formik.errors.projectName ? (
              <div>{formik.errors.projectName}</div>
            ) : null}
            <label className='mt-3' htmlFor="projectWebsite">Project website</label>
            <input
              className='mt-3'
              id="projectWebsite"
              type="text"
              name="projectWebsite"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.projectWebsite}
            />
            {formik.touched.projectWebsite && formik.errors.projectWebsite ? (
              <div>{formik.errors.projectWebsite}</div>
            ) : null}
          </div>

          <div className="d-flex w-100 justify-content-between m-2">
            <button onClick={closeModal} type="button" className="btn btn btn-danger">Close</button>
            <button type="submit" className="btn btn-success">Create project</button>
          </div>

        </form>
      </Modal>
    </div>
  );
};

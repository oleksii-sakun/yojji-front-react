import Modal from 'react-modal';
import {Form, useFormik, Formik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {CreateProjectI, ResponseErrorI} from '../interfaces';
import {useMutation} from 'react-query';
import {addProjectReq} from '../../api/requests';
import {toast} from 'react-toastify';
import {queryClient} from '../../App';
import {FormInput} from '../Input';


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
    onError: (error: ResponseErrorI)=> {
      toast.error(`${error.response.data.message}`);
    },
  });


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >

        <Formik
          initialValues={{
            projectName: '',
            projectWebsite: '',
          }}
          validationSchema= {Yup.object({
            projectName: Yup.string()
                .max(50, 'Must be a string')
                .required('Required'),
            projectWebsite: Yup.string()
                .url('Must be a valid url')
                .required('Required'),
          })}
          onSubmit= {(values) => {
            const newProject: CreateProjectI = {
              ...values,
              author: currentUserId,
            };

            mutation.mutate(newProject);
          }}
        >
          <Form>

            <h5>Create new project</h5>

            <div className="d-flex w-100 mt-3 justify-content-between flex-column">
              <FormInput className='mt-3' name="projectName" label ='projectName' type='text'/>
              <FormInput className='mt-3' name="projectWebsite" label ='projectWebsite' type='text'/>
            </div>

            <div className="d-flex w-100 justify-content-between m-2">
              <button onClick={closeModal} type="button" className="btn btn btn-danger">Close</button>
              <button type="submit" className="btn btn-success">Create project</button>
            </div>

          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

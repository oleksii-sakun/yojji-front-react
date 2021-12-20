import {Form, useFormik, Formik} from 'formik';
import * as Yup from 'yup';
import {CreateLinkI, ResponseErrorI} from '../interfaces';
import React from 'react';
import Modal from 'react-modal';
import {addLinkReq} from '../../api/requests';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {queryClient} from '../../App';
import {FormInput} from '../Input';


interface AddLinkModalPropsI {
  modalIsOpen: boolean
  afterOpenModal: ()=>void
  closeModal: ()=>void
  customStyles:any
  projectId: number
}


export const AddLinkModal = ({modalIsOpen, afterOpenModal, closeModal, customStyles, projectId}: AddLinkModalPropsI): JSX.Element=> {
  const addLinkMutation = useMutation(addLinkReq, {
    onSuccess: ()=> {
      toast.success('New link successfully added to project.');
      queryClient.invalidateQueries('projectLinks');
      closeModal();
    },
    onError: (error: ResponseErrorI)=> {
      toast.error(`${error.response.data.message}`);
    },

  });


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
          // add link req
          addLinkMutation.mutate(newLink);
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

        <Formik
          initialValues= {{
            linkName: '',
            linkUrl: '',
          }}
          validationSchema = {Yup.object({
            linkName: Yup.string()
                .max(50, 'Must be a string')
                .required('Required'),
            linkUrl: Yup.string()
                .url('Must be a valid url')
                .required('Required'),
          })}
          onSubmit= {(values) => {
            const newLink: CreateLinkI = {
              ...values,
              project: projectId,
            };
            addLinkMutation.mutate(newLink);
          }}
        >
          <Form>
            <h5>Create new link</h5>
            <div className="d-flex w-100 mt-3 justify-content-between flex-column">

              <FormInput className='mt-3' name="linkName" label ='linkName' type='text'/>
              <FormInput className='mt-3' name="linkUrl" label ='linkUrl' type='text'/>
            </div>

            <div className="d-flex w-100 justify-content-between m-2">
              <button onClick={closeModal} type="button" className="btn btn btn-danger">Close</button>
              <button type="submit" className="btn btn-success">Create link</button>
            </div>
          </Form>
        </Formik>


      </Modal>
    </div>
  );
};

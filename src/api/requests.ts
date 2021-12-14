import {CreateProjectI} from '../components/interfaces';
import {apiClient} from './api-client';


const linksUrl ='http://localhost:5000/links/';
const singUpUrl = 'http://localhost:5000/auth/signUp';
const singInURl = 'http://localhost:5000/auth/signIn';
const usersUrl = 'http://localhost:5000/users/';
const projectsUrl ='http://localhost:5000/projects/';


export const addLinkReq = (newLink)=> {
  return apiClient.post(linksUrl, newLink);
};

export const getLinkByIdReq = (linkId)=> {
  return apiClient.get(`${linksUrl}${linkId}`);
};

export const getLinkByProjectIdReq = (projectId) => {
  return apiClient.get(`${linksUrl}byprojectid/${projectId}`);
};


export const removeLinkReq = (linkToRemoveId)=> {
  return apiClient.delete(`${linksUrl}${linkToRemoveId}`);
};

export const signUpReq = (values)=> {
  return apiClient.post(singUpUrl, values);
};

export const signInReq = (values)=> {
  return apiClient.post(singInURl, values);
};

export const getUserInfoReq = (userId)=> {
  return apiClient.get(`${usersUrl}${userId}`);
};

export const setUserTimezoneReq = (selectedTimezone: string, userId: number)=> {
  return apiClient.post(`${usersUrl}timezone/${userId}`, {timezone: selectedTimezone});
};

export const addProjectReq = (newProject: CreateProjectI)=> {
  return apiClient.post(projectsUrl, newProject );
};

export const getProjectsByUserIdReq = (userId)=> {
  return apiClient.get(`${projectsUrl}byuserid/${userId}`);
};


export const restoreProjectReq = (projectToRestoreId: number)=> {
  return apiClient.post(`${projectsUrl}restore/${projectToRestoreId}`);
};

export const removeProjectReq = (projectToRemoveId: number)=> {
  return apiClient.delete(`${projectsUrl}${projectToRemoveId}`);
};

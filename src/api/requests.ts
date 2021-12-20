import {CreateLinkI, CreateProjectI} from '../components/interfaces';
import {apiClient} from './api-client';


const linksUrl ='http://ec2-3-71-77-80.eu-central-1.compute.amazonaws.com/links/';
const singUpUrl = 'http://ec2-3-71-77-80.eu-central-1.compute.amazonaws.com/auth/signUp';
const singInURl = 'http://ec2-3-71-77-80.eu-central-1.compute.amazonaws.com/auth/signIn';
const usersUrl = 'http://ec2-3-71-77-80.eu-central-1.compute.amazonaws.com/users/';
const projectsUrl ='http://ec2-3-71-77-80.eu-central-1.compute.amazonaws.com/projects/';


export const addLinkReq = (newLink: CreateLinkI)=> {
  return apiClient.post(linksUrl, newLink);
};

export const getLinkByIdReq = (linkId: number)=> {
  return apiClient.get(`${linksUrl}${linkId}`);
};

export const getLinkByProjectIdReq = (projectId: number) => {
  return apiClient.get(`${linksUrl}byprojectid/${projectId}`);
};


export const removeLinkReq = (linkToRemoveId: number)=> {
  return apiClient.delete(`${linksUrl}${linkToRemoveId}`);
};

export const signUpReq = (values)=> {
  return apiClient.post(singUpUrl, values);
};

export const signInReq = (values)=> {
  return apiClient.post(singInURl, values);
};

export const getUserInfoReq = (userId: number)=> {
  return apiClient.get(`${usersUrl}${userId}`);
};

export const setUserTimezoneReq = (selectedTimezone: string, userId: number)=> {
  return apiClient.post(`${usersUrl}timezone/${userId}`, {timezone: selectedTimezone});
};

export const addProjectReq = (newProject: CreateProjectI)=> {
  return apiClient.post(projectsUrl, newProject );
};

export const getProjectsByUserIdReq = (userId: number)=> {
  return apiClient.get(`${projectsUrl}byuserid/${userId}`);
};


export const restoreProjectReq = (projectToRestoreId: number)=> {
  return apiClient.post(`${projectsUrl}restore/${projectToRestoreId}`);
};

export const removeProjectReq = (projectToRemoveId: number)=> {
  return apiClient.delete(`${projectsUrl}${projectToRemoveId}`);
};

export interface LinkCheckI {
  id: number
  dateOfCheck: string
  linkStatus: string
  followingStatus: string
}

export interface LinkI {
  id: number
  linkName: string
  linkUrl: string
  checkedLinks:any[]
}

export interface ProjectI {
  id: number
  projectName: string;
  projectWebsite: string;
  links: LinkI[];
}

export interface CreateProjectI {
  projectName: string
  projectWebsite: string
  author: number
}

export interface CreateLinkI {
  linkName: string;
  linkUrl: string;
  project: number;
}

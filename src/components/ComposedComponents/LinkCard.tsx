import {LinkI} from '../interfaces';

interface LinkCardPropsI {
  link: LinkI
  handleRemoveLink: (id:number)=>void
}

export const LinkCard = ({
  link,
  handleRemoveLink,
}:LinkCardPropsI): JSX.Element => {
  return (
    <div className="list-group m-2" >
      <div className="list-group-item list-group-item-action" aria-current="true">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{link.linkName}</h5>
          <div className="d-flex flex-column">
            <button onClick={()=>handleRemoveLink(link.id)} type="button" className="btn btn-warning btn-sm">
              <span className="material-icons">delete</span></button>
          </div>
        </div>
        <p className="mb-1">{link.linkUrl}</p>
        {link.checkedLinks.length ? <div>
          <p>Link last check date: {link.checkedLinks[link.checkedLinks.length - 1].dateOfCheck}</p>
          <p>Last check
            status: {link.checkedLinks[link.checkedLinks.length - 1].linkStatus ? 'OK' : 'No link on page'}</p>
          <p>Last follow
            status: {link.checkedLinks[link.checkedLinks.length - 1].followingStatus ? 'OK' : 'Can not follow'}</p>
          <button type="button" className="btn btn-info"><a href={`http://localhost:3000/linkhistory/${link.id}`}
            style={{'color': 'black'}}>Go to link check
            history</a></button>
        </div> : <div style={{'color': 'darkred'}}>this link has not been checked yet</div>}
      </div>
    </div>
  );
};

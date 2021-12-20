export const ProjectCard = ({project, handleRemoveProject})=> {
  return (
    <div className="list-group m-2">
      <div className="list-group-item list-group-item-action" aria-current="true">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{project.projectName}</h5>
          <div className="d-flex flex-column">
            <small>Total links: {project.links.length}</small>
            <button onClick={()=>handleRemoveProject( project.id)} type="button" className="btn btn-warning btn-sm"><span
              className="material-icons">
delete
            </span></button>
          </div>
        </div>
        <p className="mb-1">{project.projectWebsite}</p>
        <button type="button" className="btn btn-info"><a
          href={`http://localhost:3000/projects/links/${project.id}`}
          style={{'color': 'black'}}>Go to project links</a></button>
      </div>
    </div>
  );
};

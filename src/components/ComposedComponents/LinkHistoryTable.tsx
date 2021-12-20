import {LinkI} from '../interfaces';

export const LinkHistoryTable = ({data}):JSX.Element => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date of check</th>
          <th scope="col">Check status</th>
          <th scope="col">Follow status</th>
        </tr>
      </thead>
      <tbody>
        {data && data.checkedLinks.map((check, i)=> {
          return (
            <tr key={check.id}>
              <th scope="row">{i+1}</th>
              <td>{check.dateOfCheck}</td>
              <td>{check.linkStatus ? 'OK' : 'No link on page'}</td>
              <td>{check.followingStatus ? 'OK' : 'Can not follow'}</td>
            </tr>

          );
        })}</tbody>
    </table>
  );
};

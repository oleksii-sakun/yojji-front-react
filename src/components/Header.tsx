import {useNavigate} from 'react-router-dom';

export const handleClearLocalStorage = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
};
export const Header = (): JSX.Element=> {
  const routes = [
    {name: 'Projects', path: 'http://localhost:3000/projects'},
    {name: 'Billing', path: 'http://localhost:3000/billing'},
    {name: 'Settings', path: 'http://localhost:3000/settings'}];
  const navigate = useNavigate();

  const handleLogout = () => {
    handleClearLocalStorage();
    navigate('/');
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"/>
          </svg>
          <span className="fs-4">Link visitor</span>
        </a>

        <ul className="nav nav-pills">
          {routes.map((route)=> {
            return (<li key ={route.path} className="nav-item"><a href={route.path} className={
              route.path === window.location.href ? 'nav-link active aria-current="page"' : 'nav-link'} >{route.name}</a></li>);
          })}
        </ul>
        <button type="button" className="btn btn-info btn-sm btn-square m-1"><a href={'http://localhost:3000/profile'} className='link-not-decorated'>Profile</a></button>
        <button onClick={handleLogout} type="button" className="btn btn btn-danger btn-sm btn-square">Log out</button>
      </header>
    </div>
  );
};

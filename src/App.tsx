import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {ToastContainer} from 'react-toastify';
import {Projects} from './components/Projects/Projects';
import {LoginPage} from './components/LoginForm/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import {PrivateRoute} from './components/PrivateRoute';
import {Billing} from './components/Billing';
import {useEffect} from 'react';
import {Links} from './components/Links/Links';
import {LinkHistory} from './components/Links/LinkHistory';
import {Profile} from './components/Profile/Profile';


// Create a client
const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const navigator = useNavigate();

  const isSinged = localStorage.getItem('token');

  useEffect(()=> {
    if (!isSinged) {
      navigator('/');
    } else if (isSinged && window.location.href === 'http://localhost:3000/') {
      navigator('projects');
    }
  }, [isSinged]);


  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="projects"
            element={<PrivateRoute isLogged={isSinged} component={Projects} />}
          />
          <Route
            path="billing"
            element={<PrivateRoute isLogged={isSinged} component={Billing} />}
          />

          <Route
            path="profile"
            element={<PrivateRoute isLogged={isSinged} component={Profile} />}
          />

          <Route
            path="projects/links/:id"
            element={<PrivateRoute isLogged={isSinged} component={Links} />}
          />

          <Route
            path="linkhistory/:id"
            element={<PrivateRoute isLogged={isSinged} component={LinkHistory} />}
          />
        </Routes>

      </div>
    </QueryClientProvider>
  );
};

export default App;

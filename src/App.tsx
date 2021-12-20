import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {ToastContainer} from 'react-toastify';
import {Projects} from './pages/Projects';
import {LoginPage} from './pages/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import {PrivateRoute} from './components/PrivateRoute';
import {Billing} from './pages/Billing';
import {useEffect} from 'react';
import {Links} from './pages/Links';
import {LinkHistory} from './pages/LinkHistory';
import {Profile} from './pages/Profile';
import {ReactQueryDevtools} from 'react-query/devtools';
import React from 'react';
import {Header} from './components/Header';


export const queryClient = new QueryClient();

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

        <Routes >
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

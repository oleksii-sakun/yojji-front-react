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
import {Links} from './components/Links';


// Create a client
const queryClient = new QueryClient();

const App = () => {
  const navigator = useNavigate();
  const isSinged = localStorage.getItem('token');

  useEffect(()=> {
    if (!isSinged) {
      navigator('/');
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
            path="projects/links/:id"
            element={<PrivateRoute isLogged={isSinged} component={Links} />}
          />
        </Routes>

      </div>
    </QueryClientProvider>
  );
};

export default App;

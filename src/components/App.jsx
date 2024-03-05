import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from '../hooks';
import { refreshUser } from '../redux/auth/operations';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute';

const HomePage = lazy(() => import('../page/Home'));
const RegisterPage = lazy(() => import('../page/Register'));
const LoginPage = lazy(() => import('../page/Login'));
const ContactsPage = lazy(() => import('../page/Contacts'));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import PrivateRoute from './pages/PrivateRoutes/PrivateRoutes';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup" />
            <SignUp />
          </>
        }
      />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Dashboard" />
                <ECommerce />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/calendar"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Calendar" />
                <Calendar />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/Users"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Users" />
                <Users />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Form Elements" />
                <FormElements />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Form Layout" />
                <FormLayout />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Reports" />
                <Reports />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Settings" />
                <Settings />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/chart"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Basic Chart" />
                <Chart />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Alerts" />
                <Alerts />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <PrivateRoute
            element={
              <DefaultLayout>
                <PageTitle title="Buttons" />
                <Buttons />
              </DefaultLayout>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;


import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "./components/Provider";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { useUserStore } from "./store/user.store";
import { useEffect, useState } from "react";
import { PageLoader } from "./components/PageLoader";
import UserPage from "./pages/User";
import axios from "./lib/axios";
import SessionPage from "./pages/Session";
import { Navbar } from "./components/Navbar";
import ExercisePage from "./pages/Exercise";
import StatisticsPage from "./pages/Statistics";
import RecordsPage from "./pages/Records";
import RoutinesPage from "./pages/Routines";

const App = () => {
  const [loading, setLoading] = useState(false);
  const client = useUserStore((state) => state.client);
  const setClient = useUserStore((state) => state.setClient);

  const fetchServerSession = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/user/check");
      if (!response.data.success) {
        return;
      }
      setClient(response.data.details);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerSession();
  }, []);
  return (
    <Provider>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                !client ? (
                  <LoginPage />
                ) : (
                  <Navigate to={`/${client.id}`} replace={true} />
                )
              }
            />
            <Route
              path="/register"
              element={
                !client ? (
                  <RegisterPage />
                ) : (
                  <Navigate to={`/${client.id}`} replace={true} />
                )
              }
            />
            <Route
              path="/:userId"
              element={
                client ? <UserPage /> : <Navigate to={"/login"} replace />
              }
            />
            <Route
              path="/workout/:workoutId"
              element={
                client ? <SessionPage /> : <Navigate to={"/login"} replace />
              }
            />
            <Route
              path="/exercise/:categoryId"
              element={
                client ? <ExercisePage /> : <Navigate to={"/login"} replace />
              }
            />
            <Route
              path="/:userId/statistics"
              element={
                client ? <StatisticsPage /> : <Navigate to={"/login"} replace />
              }
            />
            <Route
              path="/:userId/records"
              element={
                client ? <RecordsPage /> : <Navigate to={"/login"} replace />
              }
            />
            <Route
              path="/:userId/routines"
              element={
                client ? <RoutinesPage /> : <Navigate to={"/login"} replace />
              }
            />
          </Routes>
        </>
      )}
    </Provider>
  );
};

export default App;

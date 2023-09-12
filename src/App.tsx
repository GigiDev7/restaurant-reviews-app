import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ProtectRoute from "./components/ProtectRoute";
import Loading from "./components/Loading";
import { useAuth } from "./context/AuthContext";

const Restaurants = lazy(() => import("./pages/Restaurants"));
const RestaurantDetails = lazy(() => import("./pages/RestaurantDetails"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));

const router = createBrowserRouter([
  {
    path: "/signin",
    element: (
      <Suspense fallback={<Loading />}>
        <Signin />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectRoute>
          <Restaurants />
        </ProtectRoute>
      </Suspense>
    ),
  },
  {
    path: "/:restaurantId",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectRoute>
          <RestaurantDetails />
        </ProtectRoute>
      </Suspense>
    ),
  },
]);

function App() {
  const authCtx = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user")!);
      authCtx.updateUser({ ...user, token });
    }
  }, []);

  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

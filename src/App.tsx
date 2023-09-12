import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectRoute from "./components/ProtectRoute";
import Loading from "./components/Loading";

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
  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

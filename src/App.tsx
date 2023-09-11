import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import ProtectRoute from "./components/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <div>signin</div>,
  },
  {
    path: "/signup",
    element: <div>signup</div>,
  },
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Restaurants />
      </ProtectRoute>
    ),
  },
  {
    path: "/:restaurantId",
    element: (
      <ProtectRoute>
        <RestaurantDetails />
      </ProtectRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

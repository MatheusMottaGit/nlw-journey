import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CreateTripPage from "./pages/create-trip"
import TripDetails from "./pages/trip-details"

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />
  },
  {
    path: '/trips/:tripId',
    element: <TripDetails />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
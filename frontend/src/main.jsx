import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Notes from "./components/Notes.jsx";
import NotesEdit from "./components/NotesEdit.jsx";
import Home from "./components/Home.jsx";
import Error from "./components/Error.jsx";

let router = createBrowserRouter([
  {
    path: "/notes",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/notes",
        element: <Error />,
      },
      {
        path: "/notes/:id",
        element: <Notes />,
      },
      {
        path: "/notes/:id/edit",
        element: <NotesEdit />,
      },
      {
        path: "/notes/about",
        element: <h1>About</h1>,
      },
      {
        path: "/notes/imp",
        element: <h1>Imp Notes</h1>,
      },
      {
        path: "/notes/login",
        element: <h1>Login</h1>,
      },
      {
        path: "/notes/signup",
        element: <h1>Signup</h1>,
      },
      {
        path: "/notes/logout",
        element: <h1>Logout</h1>,
      },
      {
        
      }
    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

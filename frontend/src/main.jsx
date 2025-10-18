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
    path: "/notes/:id",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/notes/:id",
        element: <Notes />,
      },
      {
        path: "/notes/:id/edit",
        element : <NotesEdit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

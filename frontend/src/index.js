import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./routes/Register";
import Login from "./routes/Login";
import Sunshine from "./routes/Sunshine";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Create a router
const router = createBrowserRouter([
	{
		path: "/",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/sunshine",
		element: <Sunshine />,
	},
]);

ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById("root")
);

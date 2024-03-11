import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import Home from "./routes/home.tsx"
import RamadanDay from "./routes/day.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "day/:date",
		element: <RamadanDay />,
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)

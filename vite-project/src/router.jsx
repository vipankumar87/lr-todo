import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import Dashboard from "./views/Dashboard.jsx";
import App from './App.jsx'
import GuestLayout from "./components/GuestLayout.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";

const router = createBrowserRouter([

	{ 
		path: "/", element: <DefaultLayout/>, children: [
		{ path: "/", element: <Navigate to="/dashboard"/>},
		{ path: "/dashboard", element: <Dashboard/>},
		{ path: "/users", element: <Users/>},
		{ path: "*", element: <NotFound/>},
	]},
	{ 
		path: "/", element: <GuestLayout/>, children:[
		{ path: "/login", element: <Login/>},
		{ path: "/signup", element: <Signup/>},
	]},
]);

export default router;
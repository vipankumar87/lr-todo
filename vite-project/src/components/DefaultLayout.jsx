import { Outlet, Link,Navigate } from 'react-router-dom';
import {useStateContext} from "../context/ContextProvider.jsx";

export default function DefaultLayout() {

	const {user, token} = useStateContext();
	if(!token){
		return <Navigate to="/login"/>
	}

	return <div>
		<Outlet/>
	</div>
}
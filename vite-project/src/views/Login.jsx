import {Link} from 'react-router-dom';
import {useRef, useState} from 'react';
import axiosClient from '../axios.client.js'
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Login() {

	const emailRef = useRef();
	const passwordRef = useRef();

	const {setUser, setToken} = useStateContext();
	const [errors, setErrors] = useState(null);

	const onSubmit = (ev) =>{
		ev.preventDefault();
		let payload = {
			email: emailRef.current.value,
			password: passwordRef.current.value
		}

		axiosClient.post("/login", payload)
			.then(({data})=>{
				setUser(data.user)
				setToken(data.token)
			}).catch(err=>{
				const response = err.response
				if( response && (response.status == 422 || response.status == 401) ){
					console.log(response.data.errors)
					setErrors(response.data.errors);
				}
			})
	}
	return <>
		<div className="login-signup-form animated fadeInDown">
			<div className="form">
				<form onSubmit={onSubmit}>
					<h1 className="title">Login in your account</h1>
					{errors && <div className="alert">
		              {Object.keys(errors).map(key => (
		                <p key={key}>{errors[key][0]}</p>
		              ))}
					</div>}
					<input ref={emailRef} placeholder="Email" type="email" value="vipan@rudracomputer.com" />
					<input ref={passwordRef} placeholder="Password" type="password" value="Admin@!@#123"/>
					<button className="btn btn-block" >Login</button>
					<p className="message">
						Not Registered? <Link to="/signup">Sign Up</Link>
					</p>
				</form>
			</div>
		</div>
	</>
}
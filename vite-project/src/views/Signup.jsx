import {Link} from 'react-router-dom';
import {useRef, useState} from 'react';
import axiosClient from '../axios.client.js'
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Signup() {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmRef = useRef();
	const {setUser, setToken} = useStateContext();
	const [errors, setErrors] = useState(null);
	const onSubmit = (ev) =>{
		ev.preventDefault();
		const payload  = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			confirm: confirmRef.current.value
		}
		axiosClient.post("/signup", payload)
			.then(({data})=>{
				setUser(data.user)
				setToken(data.token)
				console.log(data.user)
			})
			.catch(err =>{
				const response = err.response
				if( response && response.status == 422 ){
					console.log(response.data.errors)
					setErrors(response.data.errors);
				}
			})
	}
	return <>
		<div className="login-signup-form animated fadeInDown">
			<div className="form">
				<form onSubmit={onSubmit}>
					<h1 className="title">Signup account</h1>
					{errors && <div className="alert">
		              {Object.keys(errors).map(key => (
		                <p key={key}>{errors[key][0]}</p>
		              ))}
					</div>}
					<input ref={nameRef} placeholder="Full Name" type="text" />
					<input ref={emailRef} placeholder="Email" type="email" />
					<input ref={passwordRef} placeholder="Password" type="password" />
					<input ref={confirmRef} placeholder="Password Confirmation" type="password" />
					<button className="btn btn-block">Sign up</button>
					<p className="message">
						Already Registered? <Link to="/login">Login</Link>
					</p>
				</form>
			</div>
		</div>
	</>
}
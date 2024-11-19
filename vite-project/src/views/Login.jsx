import {Link} from 'react-router-dom';

export default function Login() {

	const onSubmit = (ev) =>{
		ev.preventDefault();
	}
	return <>
		<div className="login-signup-form animated fadeInDown">
			<div className="form">
				<form onSubmit={onSubmit}>
					<h1 className="title">Login in your account</h1>
					<input placeholder="Email" type="email" />
					<input placeholder="Password" type="password" />
					<button className="btn btn-block">Login</button>
					<p className="message">
						Not Registered? <Link to="/signup">Sign Up</Link>
					</p>
				</form>
			</div>
		</div>
	</>
}
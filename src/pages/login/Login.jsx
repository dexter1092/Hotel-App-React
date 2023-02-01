import React from 'react';
import "./login.scss";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const Login = () => {
	const [error, setError] = useState(false);	
	const [errorMessage, setErrorMessage] = useState('');	
	const [email, setEmail] = useState('');	
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const {dispatch} = useContext(AuthContext)

	// useEffect(() => {
	// 	if (localStorage.getItem('user_info')) {
	// 		navigate("/");
	// 	}
	// },[navigate]);

	const handleLogin = async (event) => {
		event.preventDefault();

		let credentials = { 'email_id':email, password };

		let result = await fetch("http://localhost:3000/api/v1/authentication/login", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Access-Control-Allow-Origin": "*"
			},
			body: JSON.stringify(credentials)
		});
		result = await result.json();
		if (true === result.status) {
			dispatch({ type: "LOGIN", payload: JSON.stringify(jwt(result.token)), token: result.token })
			toast.success('Succesfully Logged In!!!');
			navigate("/");
		} else {
			setError(true);
			setErrorMessage(result.message);
		}
	}

	return (
		<div className="login">
			<form onSubmit={handleLogin}>
				<input type="email" placeholder="email" onChange={event=>setEmail(event.target.value)} />
				<input type="password" place="password" onChange={event=>setPassword(event.target.value)}/>
				<button type="submit"> Login</button>
				{error && <span>{errorMessage} </span>}
			</form>
		</div>
	)
}

export default Login
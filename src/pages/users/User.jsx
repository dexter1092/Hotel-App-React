import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import { toast } from 'react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';


const User = () => {

	const [users, setUsers] = useState([])
	const navigate = useNavigate();

	const fetchData = async () => {
		const response = await fetch(
			"http://localhost:3000/api/v1/users/getusers", {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Access-Control-Allow-Origin": "*",
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
			}
		});
		const result = await response.json();
		if (true === result.status) {
			setUsers( result.data)
		} else {
			localStorage.removeItem('token');
			localStorage.removeItem('user_info');
			toast.error(result.message);
			navigate("/login");
		}
	}

	useEffect(() => {
		fetchData()
	},[]);
	
	return (
		<div className="list">
      		<Sidebar/>
			<div className="listContainer">
				<Navbar />
				{users.length > 0 && (
					<Datatable users={users} />
					)}
			</div>
    		</div>
	);
}

export default User;
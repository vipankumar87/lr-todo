import {useState, useEffect} from 'react';
import axiosClient from '../axios.client.js'
import {Link} from 'react-router-dom';

export default function Users() {

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(()=>{
		getUsers();
	},[]);

	const getUsers = () => {
		setLoading(true)
		axiosClient.get('/users')
			.then(({data})=>{
				setLoading(false)
				setUsers(data.data)
			})
			.catch(err =>{
				setLoading(false)
			})
	}

	const onDeleteClick = (u)=>{
		if(!confirm("Are sure want to delet ethis user")){
			return;
		}

		axiosClient.delete(`/users/${u.id}`)
			.then(()=>{
				getUsers();
			})
	}
	return <div>
		<div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center'}}>
			<h1> Users </h1>
			<Link to="/users/new" className="btn-add">Add New </Link>
		</div>
		<div className="card animated fadeInDown">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Created At</th>
						<th>Action</th>
					</tr>
				</thead>
				{loading && 
					<tbody>
						<tr><td colSpan="5" className="text-center">Loading ...</td></tr>
					</tbody>
				}
 		        {!loading &&
 				<tbody>
					{users.map(u =>( 
						<tr key={u.id}>
							<td>{u.id}</td>
							<td>{u.name}</td>
							<td>{u.email}</td>
							<td>{u.created_at}</td>
							<td>
				                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
				                  &nbsp;
				                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
				}
			</table>
		</div>
	</div>
}
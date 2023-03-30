import { useState, useEffect } from 'react';
import './css/Vendors.css';
import { getAllUsers } from '../../../services/userService';

export default function VendorsListHeader() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getAllUsers();
			setUsers(result.data);
			console.log(users);
		};

		fetchData();
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Address</th>
					<th>Details</th>
					<th>Phone number</th>
					<th>Assigned Users</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.Id}>
						<td>{user.Id}</td>
						<td>{user.Name}</td>
						<td>{user.Address}</td>
						<td>{user.CompanyDetails}</td>
						<td>{user.Phone}</td>
						<td>{user.assignedUsers.join(', ')}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

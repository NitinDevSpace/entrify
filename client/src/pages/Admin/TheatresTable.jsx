import { useState, useEffect } from "react";
import { getAllTheaters, updateTheater } from "../../services/theaters";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message, Button, Table } from "antd";

const TheatresTable = () => {
	const [theaters, setTheaters] = useState([]);
	const dispatch = useDispatch();

	const getData = async () => {
		try {
			dispatch(ShowLoading());
			const response = await getAllTheaters();
			if (response.success) {
				const allTheatres = response.data;
				setTheaters(
					allTheatres.map(function (item) {
						return { ...item, key: `theatre${item._id}` };
					})
				);
			} else {
				message.error(response.message);
			}
			dispatch(HideLoading());
		} catch (err) {
			dispatch(HideLoading());
			message.error(err.message);
		}
	};

	const handleStatusChange = async (theater) => {
		try {
			dispatch(ShowLoading());
			let values = {
				...theaters,
				theaterId: theater._id,
				isActive: !theater.isActive,
			};
			const response = await updateTheater(values);
			//console.log(response, theater);
			if (response.success) {
				message.success(response.message);
				getData();
			}
			dispatch(HideLoading());
		} catch (err) {
			dispatch(HideLoading());
			message.error(err.message);
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Owner",
			dataIndex: "owner",
			render: (text, data) => {
				return data.owner && data.owner.name;
			},
		},
		{
			title: "Phone Number",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (status, data) => {
				if (data.isActive) {
					return "Approved";
				} else {
					return "Pending/ Blocked";
				}
			},
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (text, data) => {
				return (
					<div className="d-flex align-items-center gap-10">
						{data.isActive ? (
							<Button onClick={() => handleStatusChange(data)}>Block</Button>
						) : (
							<Button onClick={() => handleStatusChange(data)}>Approve</Button>
						)}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		getData();
	}, []);

	// console.log(theaters.length > 0 && theaters);

	return (
		<>
			{theaters && theaters.length > 0 && (
				<Table dataSource={theaters} columns={columns} />
			)}
		</>
	);
};

export default TheatresTable;

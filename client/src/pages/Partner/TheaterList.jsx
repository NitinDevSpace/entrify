import { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import TheatreFormModal from "./TheaterFormModal";
import DeleteTheatreModal from "./DeleteTheaterModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllTheaters } from "../../services/theaters";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import ShowModal from "./ShowModal";

function TheaterList() {
	const { user } = useSelector((state) => state.users);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedTheatre, setSelectedTheatre] = useState(null);
	const [formType, setFormType] = useState("add");
	const [theaters, setTheaters] = useState([]);
	const [isShowModalOpen, setIsShowModalOpen] = useState(false);
	const dispatch = useDispatch();

	const getData = async () => {
		try {
			dispatch(ShowLoading()); // state.loading = true
			const response = await getAllTheaters(user._id);
			if (response.success) {
				setTheaters(
					response.data.map((theater) => ({
						...theater,
						key: `theater${theater._id}`,
					}))
				);
			} else {
				message.error(response.message);
			}
			dispatch(HideLoading()); // state.loading = false
		} catch (err) {
			console.log(err);
			dispatch(HideLoading()); // state.loading = false
		}
	};

	useEffect(() => {
		getData();
	}, []);

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
					return `Approved`;
				} else {
					return `Pending/ Blocked`;
				}
			},
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (text, data) => {
				return (
					<div className="d-flex align-items-center gap-10">
						<Button
							onClick={() => {
								setIsModalOpen(true);
								setFormType("edit");
								setSelectedTheatre(data);
							}}
						>
							<EditOutlined />
						</Button>
						<Button
							onClick={() => {
								setIsDeleteModalOpen(true);
								setSelectedTheatre(data);
							}}
						>
							<DeleteOutlined />
						</Button>
						{data.isActive && (
							<Button
								onClick={() => {
									setIsShowModalOpen(true);
									setSelectedTheatre(data);
								}}
							>
								+ Shows
							</Button>
						)}
					</div>
				);
			},
		},
	];

	return (
		<>
			<div className="d-flex justify-content-end">
				<Button
					type="primary"
					onClick={() => {
						setIsModalOpen(true); // isModalOpen = true
						setFormType("add");
					}}
				>
					Add Theatre
				</Button>
			</div>
			<Table dataSource={theaters} columns={columns} />
			{isModalOpen && (
				<TheatreFormModal
					isModalOpen={isModalOpen}
					selectedTheatre={selectedTheatre}
					setSelectedTheatre={setSelectedTheatre}
					setIsModalOpen={setIsModalOpen}
					formType={formType}
					getData={getData}
				/>
			)}
			{isDeleteModalOpen && (
				<DeleteTheatreModal
					isDeleteModalOpen={isDeleteModalOpen}
					selectedTheatre={selectedTheatre}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					setSelectedTheatre={setSelectedTheatre}
					getData={getData}
				/>
			)}
			{isShowModalOpen && (
				<ShowModal
					isShowModalOpen={isShowModalOpen}
					setIsShowModalOpen={setIsShowModalOpen}
					selectedTheatre={selectedTheatre}
				/>
			)}
		</>
	);
}

export default TheaterList;

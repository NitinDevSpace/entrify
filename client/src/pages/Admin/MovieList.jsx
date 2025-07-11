import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import MovieForm from "./MovieForm";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../services/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";

function MovieList() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [formType, setFormType] = useState("add");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const dispatch = useDispatch();

	const [messageApi, contextHolder] = message.useMessage();

	const tableHeadings = [
		{
			title: "Poster",
			dataIndex: "poster",
			//antd method for rendering something in table
			render: (text, data) => {
				return (
					<img src={data.poster} width="120" style={{ objectFit: "cover" }} />
				);
			},
		},
		{
			title: "Movie Name",
			dataIndex: "title",
		},
		{
			title: "Description",
			dataIndex: "description",
		},
		{
			title: "Duration",
			dataIndex: "duration",
			render: (text) => `${text} Min`,
		},
		{
			title: "Genre",
			dataIndex: "genre",
		},
		{
			title: "Language",
			dataIndex: "language",
		},
		{
			title: "Realease Date",
			dataIndex: "releaseDate",
			render: (text, data) => {
				return moment(data.releaseDate).format("DD-MM-YYYY");
			},
		},
		{
			title: "Action",
			//rendering the edit and delete buttons from antd
			render: (text, data) => {
				return (
					<div>
						<Button
							onClick={() => {
								setIsModalOpen(true);
								setFormType("edit");
								setSelectedMovie(data);
							}}
						>
							<EditOutlined />
						</Button>
						<Button
							onClick={() => {
								setIsDeleteModalOpen(true);
								setSelectedMovie(data);
							}}
						>
							<DeleteOutlined />
						</Button>
					</div>
				);
			},
		},
	];

	const getData = async () => {
		dispatch(ShowLoading());
		const response = await getAllMovies();
		//giving key for react it might not be given from backend so we create it
		const allMovies = response.data;
		setMovies(
			allMovies.map((item) => {
				return { ...item, key: `movie ${item._id}` };
			})
		);
		dispatch(HideLoading());
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="d-flex justify-end">
			{contextHolder}
			<Button
				type="primary"
				onClick={() => {
					setIsModalOpen(true);
					setFormType("add");
				}}
			>
				Add Movie
			</Button>
			<Table dataSource={movies} columns={tableHeadings} />
			{isModalOpen && (
				<MovieForm
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					formType={formType}
					selectedMovie={selectedMovie}
					setSelectedMovie={setSelectedMovie}
					getData={getData}
					messageApi={messageApi}
				/>
			)}
			{isDeleteModalOpen && (
				<DeleteMovieModal
					isDeleteModalOpen={isDeleteModalOpen}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					selectedMovie={selectedMovie}
					getData={getData}
					messageApi={messageApi}
				/>
			)}
		</div>
	);
}

export default MovieList;

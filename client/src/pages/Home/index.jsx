import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { message, Row, Col, Input } from "antd";
import { getAllMovies } from "../../services/movies";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

function Home() {
	const [movies, setMovies] = useState(null);
	const [searchText, setSearchText] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function getData() {
		try {
			dispatch(ShowLoading());
			const response = await getAllMovies();
			if (response.success) {
				setMovies(response.data);
			} else {
				message.error(response.message);
			}
		} catch (error) {
			console.log(error.message);
			message.error(error);
		} finally {
			dispatch(HideLoading());
		}
	}

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Row className="justify-content-center w-100">
				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					<Input
						placeholder="Type here to search for movies"
						onChange={handleSearch}
						prefix={<SearchOutlined />}
					/>
					<br />
					<br />
					<br />
				</Col>
			</Row>
			<Row
				className="justify-content-center"
				gutter={{
					xs: 8,
					sm: 16,
					md: 24,
					lg: 32,
				}}
			>
				{movies &&
					movies
						.filter((movie) =>
							movie.title.toLowerCase().includes(searchText.toLowerCase())
						)
						.map((movie) => (
							<Col
								className="gutter-row mb-5"
								key={movie._id}
								span={{
									xs: 24,
									sm: 24,
									md: 12,
									lg: 10,
								}}
							>
								<div className="text-center">
									<img
										onClick={() => {
											navigate(
												`/movie/${movie._id}?date=${moment().format(
													"YYYY-MM-DD"
												)}`
											);
										}}
										className="cursor-pointer w-[200px] h-[300px] object-cover rounded"
										src={movie.poster}
										alt="Movie Poster"
										style={{
											boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
											transition: 'transform 0.3s',
										}}
										onMouseOver={(e) => {
											e.currentTarget.style.transform = 'scale(1.05)';
										}}
										onMouseOut={(e) => {
											e.currentTarget.style.transform = 'scale(1)';
										}}
									/>
									<h3
										onClick={() => {
											navigate(
												`/movie/${movie._id}?date=${moment().format(
													"YYYY-MM-DD"
												)}`
											);
										}}
										className="cursor-pointer text-lg mt-5 font-medium"
									>
										{movie.title}
									</h3>
								</div>
							</Col>
						))}
			</Row>
		</>
	);
}

export default Home;

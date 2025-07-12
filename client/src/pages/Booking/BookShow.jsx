import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { getShowById } from "../../services/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { bookShow, makePayment } from "../../services/booking";
import GetSeats from "./GetSeats";

const BookShow = () => {
	const { user } = useSelector((state) => {
		return state.users;
	});
	const params = useParams();
	const dispatch = useDispatch();
	const [show, setShow] = useState();
	const [selectedSeats, setSelectedSeats] = useState([]);
	const navigate = useNavigate();
	const stripePromise = loadStripe(
		"pk_test_51Rk2tPQWrCb3u4IL5VDgy6DSbsjKbBf3lKJ0LSqxi7wSgIF5KEqWOK8kXnofRiIyWI66HPd1pvo1QbxhKHAPEwiP00kS6dkbTG"
	);

	const book = async (transactionId) => {
		try {
			dispatch(ShowLoading());
			const response = await bookShow({
				show: params.id,
				transactionId,
				seats: selectedSeats,
				user: user._id,
			});
			if (response.success) {
				message.success("Show Booking done!");
				navigate("/profile");
			} else {
				message.error(response.message);
			}
			dispatch(HideLoading());
		} catch (err) {
			message.error(err.message);
			dispatch(HideLoading());
		}
	};

	const handleCheckout = async () => {
		try {
			dispatch(ShowLoading());
			const response = await createCheckoutSession(
				selectedSeats.length * show.ticketPrice,
				user.email
			);

			if (response.success) {
				const stripe = await stripePromise;
				await stripe.redirectToCheckout({
					sessionId: response.sessionId,
				});
			} else {
				message.error(response.message);
			}
			dispatch(HideLoading());
		} catch (err) {
			message.error(err.message);
			dispatch(HideLoading());
		}
	};

	const getData = async () => {
		try {
			dispatch(ShowLoading());
			const response = await getShowById({ showId: params.id });
			if (response.success) {
				setShow(response.data);
			} else {
				message.error(response.message);
			}
			dispatch(HideLoading());
		} catch (err) {
			message.error(err.message);
			dispatch(HideLoading());
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			{show && (
				<Row gutter={24}>
					<Col span={24}>
						<Card
							title={
								<div className="movie-title-details">
									<h1>{show.movie.movieName}</h1>
									<p>
										Theatre: {show.theatre.name}, {show.theatre.address}
									</p>
								</div>
							}
							extra={
								<div className="show-name py-3">
									<h3>
										<span>Show Name:</span> {show.name}
									</h3>
									<h3>
										<span>Date & Time: </span>
										{moment(show.date).format("MMM Do YYYY")} at
										{moment(show.time, "HH:mm").format("hh:mm A")}
									</h3>
									<h3>
										<span>Ticket Price:</span> Rs. {show.ticketPrice}/-
									</h3>
									<h3>
										<span>Total Seats:</span> {show.totalSeats}
										<span> &nbsp;|&nbsp; Available Seats:</span>
										{show.totalSeats - show.bookedSeats.length}
									</h3>
								</div>
							}
							style={{ width: "100%" }}
						>
							<GetSeats
								selectedSeats={selectedSeats}
								setSelectedSeats={setSelectedSeats}
								show={show}
							/>
							{selectedSeats.length > 0 && (
								<div className="max-width-600 mx-auto">
									<Button
										type="primary"
										shape="round"
										size="large"
										block
										onClick={handleCheckout}
									>
										Pay Now
									</Button>
								</div>
							)}
						</Card>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default BookShow;

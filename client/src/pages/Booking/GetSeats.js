const GetSeats = ({ selectedSeats, setSelectedSeats, show }) => {
	let columns = 12;
	let totalSeats = show.totalSeats;
	let rows = Math.ceil(totalSeats / columns);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<div className="w-100 max-width-600 mx-auto mb-25px">
				<p className="text-center mb-10px">
					Screen this side, you will be watching in this direction
				</p>
				<div className="screen-div"></div>
				<ul className="seat-ul justify-content-center">
					{Array.from(Array(rows).keys()).map((row) => {
						return Array.from(Array(columns).keys()).map((column) => {
							let seatNumber = row * columns + column + 1;
							let seatClass = "seat-btn";
							if (selectedSeats.includes(seatNumber)) {
								seatClass += " selected";
							}
							if (show.bookedSeats.includes(seatNumber)) {
								seatClass += " booked";
							}
							if (seatNumber <= totalSeats)
								return (
									<li>
										<button
											onClick={() => {
												if (selectedSeats.includes(seatNumber)) {
													setSelectedSeats(
														selectedSeats.filter(
															(curSeatNumber) => curSeatNumber !== seatNumber
														)
													);
												} else {
													setSelectedSeats([...selectedSeats, seatNumber]);
												}
											}}
											className={seatClass}
										>
											{seatNumber}
										</button>
									</li>
								);
						});
					})}
				</ul>
			</div>
		</div>
	);
};

export default GetSeats;

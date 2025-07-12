import React from "react";
import Bookings from "./Bookings";

function Profile() {
	return (
		<div>
			<h1 className="text-3xl font-bold text-center m-8">Your Bookings</h1>
			<Bookings />
		</div>
	);
}

export default Profile;

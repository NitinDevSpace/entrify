import React from "react";
import { Tabs } from "antd";
import TheaterList from "./TheaterList";

function Partner() {
	const items = [
		{
			key: "1",
			label: "Theaters",
			children: <TheaterList />,
		},
	];

	return (
		<div>
			<h1 className="text-center text-3xl font-bold mb-4">Partner Page</h1>
			<Tabs items={items} />
		</div>
	);
}

export default Partner;

import React, { Children } from "react";
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable";
import { Tabs } from "antd";

function Admin() {
	const tabItems = [
		{
			key: "1",
			label: "Movies",
			children: <MovieList />,
		},
		{
			key: "2",
			label: "Theaters",
			children: <TheatresTable />,
		},
	];

	return (
		<div className="p-5">
			<h1 className="text-2xl text-center">Admin Page</h1>

			<div className="mt-2">
				<Tabs items={tabItems} />
			</div>
		</div>
	);
}

export default Admin;

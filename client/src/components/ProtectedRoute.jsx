import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
	HomeOutlined,
	LogoutOutlined,
	ProfileOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { GetCurrentUser } from "../services/users";
import { SetUser } from "../redux/userSlice";
import { message, Layout, Menu } from "antd";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";
import logo from "../assets/logo-white.png";

const ProtectedRoute = ({ children }) => {
	const { user } = useSelector((state) => state.users); // selects the state of the user in userSlice
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const navItems = [
		{
			key: "home",
			label: "Home",
			icon: <HomeOutlined />,
		},
		{
			key: "user",
			label: `${user ? user.name : ""}`,
			icon: <UserOutlined />,
			//drop down submenu content in children
			children: [
				{
					key: "profile",
					label: (
						<span
							onClick={() => {
								if (user.role == "admin") {
									navigate("/admin");
								} else if (user.role == "partner") {
									navigate("/partner");
								} else {
									navigate("/profile");
								}
							}}
						>
							My Profile
						</span>
					),
					icon: <ProfileOutlined />,
				},
				{
					key: "logout",
					label: (
						<Link
							to="/login"
							onClick={() => {
								document.cookie = "token=; max-age=0; path=/";
							}}
						>
							Log Out
						</Link>
					),
					icon: <LogoutOutlined />,
				},
			],
		},
	];
	const { Header, Footer, Sider, Content } = Layout;

	//validating user
	const getValidUser = async () => {
		try {
			dispatch(ShowLoading()); //loading to true
			const respose = await GetCurrentUser();
			//console.log(respose);
			dispatch(SetUser(respose.data));
			dispatch(HideLoading()); // loading state to false
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
			console.log(error);
		}
	};
	useEffect(() => {
		//getting token from the cookies
		const hasToken = document.cookie
			.split("; ")
			.some((c) => c.startsWith("token="));
		if (hasToken) {
			getValidUser();
		} else {
			navigate("/login");
		}
	}, []);

	return (
		user && (
			<>
				<Layout>
					<Header
						className="d-flex justify-content-between"
						style={{
							position: "sticky",
							top: 0,
							zIndex: 1,
							width: "100%",
							display: "flex",
							alignItems: "center",
							background: "#7B61FF",
						}}
					>
						<img src={logo} alt="logo" className="h-32" />
						<Menu
							theme="dark"
							mode="horizontal"
							items={navItems}
							style={{ background: "#7B61FF" }}
						/>
					</Header>
					<div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
						{children}
					</div>
				</Layout>
			</>
		)
	);
};

export default ProtectedRoute;

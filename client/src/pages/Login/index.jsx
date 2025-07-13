import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import bgImage from "../../assets/login_bg.jpeg";
import tlogo from "../../assets/entrify_t.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginUser } from "../../services/users";

function Login() {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const onFinish = async (values) => {
		try {
			const response = await LoginUser(values);
			if (response.success) {
				document.cookie = `token=${response.token}; path=/; max-age=${
					7 * 24 * 60 * 60
				}`;
				messageApi.open({
					type: "success",
					content: response.message,
				});
				navigate("/");
			} else {
				messageApi.open({
					type: "error",
					content: response.message,
				});
			}
		} catch (error) {
			messageApi.open({
				type: "error",
				content: error.message,
			});
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1.3 }}
		>
			<div
				className="relative p-0 flex items-center justify-center md:h-screen bg-cover bg-center"
				style={{ backgroundImage: `url(${bgImage})` }}
			>
				{contextHolder}
				{/* Login Conatiner */}
				<div className="bg-white rounded-lg m-5  md:h-3/4 w-2/3 flex flex-col md:flex-row justify-center overflow-hidden relative font-mon ">
					<img
						src={tlogo}
						alt="logo"
						className="absolute top-0 md:top-1 left-2 w-18 h-20 z-10"
					/>

					{/* Left Panel */}
					<div className="md:w-2/3 flex flex-col justify-center text-center pt-16 p-5 md:p-9">
						<h1 className="text-2xl font-bold text-center mb-4 text-[#7B61FF]">
							Login to Entrify
						</h1>
						<Form layout="vertical" onFinish={onFinish}>
							<Form.Item
								label="Email"
								htmlFor="email"
								name="email"
								className="d-block flex"
								rules={[{ required: true, message: "Enter Your Email" }]}
							>
								<Input id="email" type="text" placeholder="Enter Your Email" />
							</Form.Item>
							<Form.Item
								label="Password"
								htmlFor="password"
								name="password"
								className="d-block flex"
								rules={[{ required: true, message: "Enter Password" }]}
							>
								<Input
									id="password"
									type="password"
									placeholder="Enter Your password"
								/>
							</Form.Item>
							<Form.Item>
								<button
									className="hover:text-blue-500 text-sm"
									onClick={() => {
										navigate("/forget");
									}}
								>
									Forgot your password?
								</button>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									className="bg-[#7B61FF] text-white "
									size="large"
									style={{ fontSize: "1.2rem", fontWeight: "600" }}
									htmlType="submit"
								>
									Login
								</Button>
							</Form.Item>
						</Form>
					</div>

					{/* Right Panel */}
					<div className="md:w-1/3 bg-[#7B61FF] text-white p-10 flex flex-col justify-center gap-3 text-center">
						<h2 className="text-3xl font-extrabold mb-4">Hello, Friend!</h2>
						<span className="inline-block">
							Enter your personal details here and start your journey with us
						</span>
						<Button
							ghost
							onClick={() => {
								navigate("/register");
							}}
							className=" m-3"
						>
							Register
						</Button>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default Login;

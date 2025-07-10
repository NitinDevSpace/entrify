import React from "react";
import bgImage from "../../assets/login_bg.jpeg";
import tlogo from "../../assets/logo-white.png";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { motion } from "framer-motion";
import { RegisterUser } from "../../services/users";

function Register() {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		try {
			form.resetFields();
			const response = await RegisterUser(values);
			if (response.success) {
				messageApi.open({
					type: "success",
					content: response.message,
				});
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
				className="relative p-0 flex items-center justify-center h-screen bg-cover bg-center"
				style={{ backgroundImage: `url(${bgImage})` }}
			>
				{contextHolder}
				{/* Register Conatiner */}
				<div className="bg-white rounded-lg m-5  md:h-3/4 w-2/3 flex flex-col md:flex-row justify-center overflow-hidden relative font-mon ">
					<img
						src={tlogo}
						alt="logo"
						className="absolute top-0 md:top-1 left-2 w-18 h-20 z-10"
					/>

					{/* Left Panel */}
					<div className="md:w-1/3 bg-[#7B61FF] text-white pt-16 p-6 flex flex-col justify-center text-center  md:gap-5">
						<h2 className="text-lg md:text-3xl font-bold mb-4">Welcome Back</h2>
						<span className="text-xs md:text-1l">
							To keep connected with us please login with your personal info
						</span>
						<Button
							onClick={() => {
								navigate("/login");
							}}
							className=" m-3"
							ghost
						>
							Login Here
						</Button>
					</div>

					{/* Right Panel */}
					<div className="m-0 md:w-2/3 flex flex-col justify-center p-10 text-center">
						<h1 className="md:text-2xl font-bold text-center mb-4 text-[#7B61FF]">
							Register to Entrify
						</h1>
						<Form layout="vertical" form={form} onFinish={onFinish}>
							<Form.Item
								label="Name"
								htmlFor="name"
								name="name"
								className="block"
								rules={[{ required: true, message: "Enter Name" }]}
							>
								<Input
									id="name"
									type="text"
									placeholder="Enter your Full Name"
								/>
							</Form.Item>
							<Form.Item
								label="Email"
								htmlFor="email"
								name="email"
								rules={[
									{ required: true, message: "Enter your Email" },
									{ type: "email", message: "Enter a valid email" },
								]}
							>
								<Input id="email" type="text" placeholder="Enter your Email" />
							</Form.Item>
							<Form.Item
								label="Password"
								htmlFor="password"
								name="password"
								rules={[{ required: true, message: "Enter your password" }]}
							>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
								/>
							</Form.Item>
							<Form.Item
								label="Confirm Password"
								htmlFor="confirmPassword"
								name="confirmPassword"
								rules={[
									{ required: true, message: "Please confirm your password" },
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error("Passwords do not match")
											);
										},
									}),
								]}
							>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Enter your password again"
								/>
							</Form.Item>
							<Button
								type="primary"
								className="bg-[#7B61FF] text-white"
								size="large"
								style={{ fontSize: "1.2rem", fontWeight: "600" }}
								htmlType="submit"
							>
								Register
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default Register;

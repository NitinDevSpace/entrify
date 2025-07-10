import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import store from "./redux/store";
import { Provider } from 'react-redux';

function App() {
	return (
		<div>
			<Provider store={store}>
				<BrowserRouter>
					<AnimatePresence mode="wait">
						<Routes>
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/*" element={<PageNotFound />} />
						</Routes>
					</AnimatePresence>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;

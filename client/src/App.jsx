import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import store from "./redux/store";
import { Provider } from "react-redux";
import Admin from "./pages/Admin";
import Partner from "./pages/Partner";
import Profile from "./pages/User";
import SingleMovie from "./pages/Booking/SingleMovie";
import BookShow from "./pages/Booking/BookShow";

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
							<Route
								path="/admin"
								element={
									<ProtectedRoute>
										<Admin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/partner"
								element={
									<ProtectedRoute>
										<Partner />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/movie/:id"
								element={
									<ProtectedRoute>
										<SingleMovie />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/book-show/:id"
								element={
									<ProtectedRoute>
										<BookShow />
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

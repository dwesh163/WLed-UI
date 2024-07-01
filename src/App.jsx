import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import Select from './pages/Select';
import NewPage from './pages/New';

export default function App() {
	return (
		<BrowserRouter basename="/WLed-UI">
			<AppRoutes />
		</BrowserRouter>
	);
}

function AppRoutes() {
	const navigate = useNavigate();
	const location = useLocation();
	const selected = sessionStorage.getItem('selectedProject');

	useEffect(() => {
		if (!selected && location.pathname !== '/new') {
			navigate('/select');
		}
	}, [selected, navigate, location.pathname]);

	console.log(selected);

	return (
		<Routes>
			<Route path="/select" element={<Select />} />
			<Route path="/new" element={<NewPage />} />
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="blogs" element={<Blogs />} />
				<Route path="contact" element={<Contact />} />
			</Route>
			<Route path="*" element={<NoPage />} />
		</Routes>
	);
}

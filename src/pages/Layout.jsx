import React, { useEffect, useState } from 'react';
import { Navbar, Collapse, Typography, IconButton } from '@material-tailwind/react';
import { Bars3Icon, PowerIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Outlet, Link } from 'react-router-dom';

function NavList({ onPower, power }) {
	return (
		<ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium cursor-pointer hover:text-blue-gray-800">
				<svg xmlns="http://www.w3.org/2000/svg" onClick={() => power(!onPower)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={onPower ? 'red' : 'currentcolor'} className={'w-5 h-5 ' + (onPower ? 'glow' : '')}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
				</svg>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
				<Link to="/blogs" className="flex items-center hover:text-blue-500 transition-colors">
					Pages
				</Link>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
				<Link to="/contact" className="flex items-center hover:text-blue-500 transition-colors">
					Account
				</Link>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
				<Link to="/" className="flex items-center hover:text-blue-500 transition-colors">
					Blocks
				</Link>
			</Typography>
			<Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
				<Link to="/" className="flex items-center hover:text-blue-500 transition-colors">
					Docs
				</Link>
			</Typography>
		</ul>
	);
}

function Layout() {
	const [openNav, setOpenNav] = useState(false);
	const [onPower, setOnPower] = useState(false);
	const project = JSON.parse(localStorage.getItem('projects'))[sessionStorage.getItem('selectedProject')];

	const handleWindowResize = () => {
		if (window.innerWidth >= 960) {
			setOpenNav(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	const power = async (newPowerState) => {
		console.log('Fetching power state change...');

		try {
			const response = await fetch(`${project.url}/state`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ on: newPowerState }),
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setOnPower(data.on);
			}
		} catch (error) {
			console.error('Error updating power state:', error);
		}
	};

	useEffect(() => {
		const fetchState = async () => {
			try {
				const response = await fetch(`${project.url}/state`);
				const data = await response.json();
				console.log(data);
				setOnPower(data.on);
			} catch (error) {
				console.error('Error fetching power state:', error);
			}
		};

		fetchState();

		const interval = setInterval(fetchState, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<Navbar className="max-w-full rounded-none px-6 py-3">
				<div className="flex items-center justify-between text-blue-gray-900">
					<Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5">
						WLed-UI | {project.name}
					</Typography>
					<div className="hidden lg:block">
						<NavList onPower={onPower} power={power} />
					</div>
					<IconButton variant="text" className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden" ripple={false} onClick={() => setOpenNav(!openNav)}>
						{openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
					</IconButton>
				</div>
				<Collapse open={openNav}>
					<NavList onPower={onPower} power={power} />
				</Collapse>
			</Navbar>
			<Outlet />
		</>
	);
}

export default Layout;

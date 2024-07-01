import React, { useState, useEffect } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function Select() {
	const [projects, setProjects] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		const fetchProjects = async () => {
			let storedProjects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : {};

			for (const projectId in storedProjects) {
				const project = storedProjects[projectId];
				try {
					const response = await fetch(project.url + '/status');
					console.log(response);
					storedProjects[projectId]['online'] = response.ok;
				} catch (error) {
					storedProjects[projectId]['online'] = false;
				}
			}
			setProjects(storedProjects);
		};

		fetchProjects();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Typography variant="h1" color="blue-gray" className="mb-6 mt-10">
				Select a project
			</Typography>
			<div className="flex flex-col items-center justify-center gap-6 h-3/5">
				{Object.keys(projects).map((projectId) => (
					<Card
						key={projectId}
						className="w-96 cursor-pointer hover:bg-blue-gray-50 hover:bg-opacity-50"
						onClick={() => {
							sessionStorage.setItem('selectedProject', projectId);
							navigate('/');
						}}>
						<CardBody className="flex justify-between">
							<div className="w-3/4">
								<Typography variant="h5" color="blue-gray">
									{projects[projectId].name}
								</Typography>
								<Typography>{projects[projectId].description}</Typography>
							</div>
							<div className="w-1/4 flex items-center justify-end">{projects[projectId].online == true ? <CheckCircleIcon className="w-8 h-8 text-green-500" /> : <XCircleIcon className="w-8 h-8 text-red-500" />}</div>
						</CardBody>
					</Card>
				))}
				<Link to="/new">
					<Card className="w-96 cursor-pointer hover:bg-blue-gray-50 hover:bg-opacity-50">
						<CardBody className="flex items-center justify-center">
							<PlusIcon className="w-8 h-8" />
						</CardBody>
					</Card>
				</Link>
			</div>
		</div>
	);
}

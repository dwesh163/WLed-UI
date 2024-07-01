import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPage() {
	const [url, setUrl] = useState('');
	const [token, setToken] = useState('');
	const [urlError, setUrlError] = useState('');
	const [tokenError, setTokenError] = useState('');
	const [fetchError, setFetchError] = useState('');

	const navigate = useNavigate();

	const handleConnect = async (e) => {
		e.preventDefault();
		setUrlError('');
		setTokenError('');
		setFetchError('');

		if (!url) {
			setUrlError('Project URL is required.');
			return;
		}

		if (!token) {
			setTokenError('Project Token is required.');
			return;
		}

		try {
			const response = await fetch(url + '/connect', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to connect to the project.');
			}

			const data = await response.json();
			const localProjects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : {};
			localProjects[data.id] = { name: data.name, description: data.description, url: url };
			localStorage.setItem('projects', JSON.stringify(localProjects));
			navigate('/select');
		} catch (error) {
			setFetchError(error.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Card color="transparent" shadow={false}>
				<Typography variant="h4" color="blue-gray">
					Connect to a <strong>project</strong>
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Please fill the following form to connect to a project.
				</Typography>
				<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleConnect}>
					<div className="mb-1 flex flex-col gap-6">
						<div>
							<Typography variant="h6" color="blue-gray" className="mb-1">
								Project URL
							</Typography>
							<Input
								size="lg"
								placeholder="http://127.0.0.1"
								className={urlError ? '!border-red-500' : '!border-t-blue-gray-200 focus:!border-t-gray-900'}
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								error={Boolean(urlError)}
							/>

							{urlError && (
								<Typography variant="small" color="red" className="mt-2 flex items-center gap-1 font-normal">
									<ExclamationCircleIcon className="h-5 w-5 -mt-0.5" />
									{urlError}
								</Typography>
							)}
						</div>
						<div>
							<Typography variant="h6" color="blue-gray" className="mb-1">
								Project Token
							</Typography>
							<Input
								size="lg"
								placeholder="********"
								className={tokenError ? '!border-red-500' : '!border-t-blue-gray-200 focus:!border-t-gray-900'}
								value={token}
								onChange={(e) => setToken(e.target.value)}
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								error={Boolean(tokenError)}
							/>
							{tokenError && (
								<Typography variant="small" color="red" className="mt-2 flex items-center gap-1 font-normal">
									<ExclamationCircleIcon className="h-5 w-5 -mt-0.5" />
									{tokenError}
								</Typography>
							)}
						</div>
					</div>
					{fetchError && (
						<Typography variant="small" color="red" className="mt-4 flex items-center gap-1 font-normal">
							<ExclamationCircleIcon className="h-5 w-5 -mt-0.5" />
							{fetchError}
						</Typography>
					)}
					<Button className="mt-6" fullWidth type="submit">
						Connect
					</Button>
				</form>
			</Card>
		</div>
	);
}

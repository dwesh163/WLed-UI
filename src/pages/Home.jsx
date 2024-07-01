import { useEffect, useState } from 'react';
import { EffectList } from '../components/EffectList';

export default function Home() {
	const [state, setState] = useState();

	const project = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects'))[sessionStorage.getItem('selectedProject')] : {};

	async function updateState(toUpdate) {
		console.log('toUpdate', toUpdate);
		const response = await fetch(`${project.url}/state`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(toUpdate),
		});
		if (response.ok) {
			const data = await response.json();
			setState(data);
		}
	}

	useEffect(() => {
		const fetchState = async () => {
			try {
				const response = await fetch(`${project.url}/state`);
				const data = await response.json();
				setState(data);
			} catch (error) {
				console.error('Error fetching power state:', error);
			}
		};

		fetchState();

		const interval = setInterval(fetchState, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<EffectList state={state} updateState={updateState} />
		</div>
	);
}

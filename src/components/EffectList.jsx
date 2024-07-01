import { List, ListItem, Card, Typography, CardBody, Input } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import convert from '../../lib/convert';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function EffectList({ state, updateState }) {
	console.log(state, updateState);
	const [effects, setEffects] = useState([]);
	const [filteredEffects, setFilteredEffects] = useState([]);
	const [effect, setEffect] = useState({});
	const [selectedEffect, setSelectedEffect] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		if (state != null && state != undefined && state['seg'] != undefined && state['seg'] != null && state['seg'].length != 0) {
			console.log('ouiiii');
			console.log(state['seg'][0]['fx']);
			setSelectedEffect(state['seg'][0]['fx']);
		}
	}, [state]);

	const project = (() => {
		const projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : {};
		const selectedProject = sessionStorage.getItem('selectedProject');
		return projects[selectedProject] || {};
	})();

	useEffect(() => {
		const fetchEffects = async () => {
			try {
				const response = await fetch(project.url + '/effects');
				const data = await response.json();

				setEffects(data);
				setFilteredEffects(data);
			} catch (error) {
				console.error('Error fetching effects:', error);
			}
		};

		if (project.url) {
			fetchEffects();
		}
	}, [project.url]);

	useEffect(() => {
		if (effects == null || effects == undefined || effects.length == 0) {
			return;
		}
		const effect = {
			info: convert(effects[selectedEffect].info),
			name: effects[selectedEffect].name,
			id: selectedEffect,
		};
		setEffect(effect);
		updateState({ seg: [{ fx: selectedEffect }] });
	}, [selectedEffect, effects]);

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredEffects(effects);
		} else {
			const filtered = effects.filter((effect) => effect.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredEffects(filtered);
		}
	}, [searchQuery, effects]);

	return (
		<div className="flex flex-col gap-3">
			<Card className="mt-6 w-96">
				<CardBody className="p-4">
					<Typography variant="h5" color="blue-gray" className="mb-2">
						Effect : {effect.name}
					</Typography>
					{JSON.stringify(effect)}
				</CardBody>
			</Card>
			<Card className="w-96">
				<Typography variant="h5" color="blue-gray" className="mx-4 my-2">
					All effects
				</Typography>
				<div className="mx-4 mb-4">
					<Input label="Search" icon={<MagnifyingGlassIcon />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
				</div>
				<div className="overflow-scroll h-[calc(100vh-80px)]">
					<List className="">
						{filteredEffects.map((effect, index) => (
							<ListItem key={index} selected={effect.id == selectedEffect} onClick={() => setSelectedEffect(effect.id)}>
								<span className="w-[13%] text-gray-500 select-none">#{effect.id}</span>
								{effect.name}
							</ListItem>
						))}
					</List>
				</div>
			</Card>
		</div>
	);
}

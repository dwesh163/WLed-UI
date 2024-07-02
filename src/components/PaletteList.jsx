import { List, ListItem, Card, Typography, CardBody, Input } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import convert from '../../lib/convert';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import gradient from '../assets/gradient.json';

export function PaletteList({ state, updateState }) {
	console.log(state, updateState);
	const [palettes, setPalettes] = useState([]);
	const [filteredPalettes, setFilteredPalettes] = useState([]);
	const [palette, setPalette] = useState({});
	const [selectedPalette, setSelectedPalette] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		if (state != null && state != undefined && state['seg'] != undefined && state['seg'] != null && state['seg'].length != 0) {
			console.log(state['seg'][0]['pal']);
			setSelectedPalette(state['seg'][0]['pal']);
		}
	}, [state]);

	const project = (() => {
		const projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : {};
		const selectedProject = sessionStorage.getItem('selectedProject');
		return projects[selectedProject] || {};
	})();

	useEffect(() => {
		const fetchPalettes = async () => {
			try {
				const response = await fetch(project.url + '/palettes');
				const data = await response.json();

				setPalettes(data);
				setFilteredPalettes(data);
			} catch (error) {
				console.error('Error fetching palettes:', error);
			}
		};

		if (project.url) {
			fetchPalettes();
		}
	}, [project.url]);

	useEffect(() => {
		if (palettes == null || palettes == undefined || palettes.length == 0) {
			return;
		}
		const palette = {
			name: palettes[selectedPalette].name,
			id: selectedPalette,
		};
		setPalette(palette);
		updateState({ seg: [{ pal: selectedPalette }] });
	}, [selectedPalette, palettes]);

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredPalettes(palettes);
		} else {
			const filtered = palettes.filter((palette) => palette.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredPalettes(filtered);
		}
	}, [searchQuery, palettes]);

	return (
		<div className="flex flex-col gap-3">
			<Card className="mt-6 w-96 h-52">
				<CardBody className="p-4">
					<Typography variant="h5" color="blue-gray" className="mb-2">
						Palette : {palette.name}
					</Typography>
					{JSON.stringify(palette)}
				</CardBody>
			</Card>
			<Card className="w-96">
				<Typography variant="h5" color="blue-gray" className="mx-4 my-2">
					All palettes
				</Typography>
				<div className="mx-4 mb-4">
					<Input label="Search" icon={<MagnifyingGlassIcon />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
				</div>
				<div className="overflow-scroll h-[calc(100vh-430px)]">
					<List className="flex gap-2">
						{filteredPalettes.map((palette, index) => (
							<ListItem key={index} selected={palette.id == selectedPalette} onClick={() => setSelectedPalette(palette.id)} className="relative">
								<span className="w-[13%] text-gray-500 select-none">#{palette.id}</span>
								{palette.name}
								<div className="absolute bottom-0 left-0 w-full h-2 rounded-b-md" style={{ background: gradient[index] }}></div>
							</ListItem>
						))}
					</List>
				</div>
			</Card>
		</div>
	);
}

const rawData = ['!,!;!,!;!;01'];

function parseRawData(line) {
	console.log('line', line);
	// Supprimer les préfixes et suffixes indésirables
	const metadata = line.replace(/^\d+\t\"/, '').replace(/\"$/, '');

	const sections = metadata.split(';');
	const effectParams = sections[0] || ''; // Effect parameters
	const colors = sections[1] || ''; // Colors
	const palette = sections[2] || ''; // Palette
	const flags = sections[3] || ''; // Flags
	const defaults = sections[4] || ''; // Defaults

	// Parse effect parameters
	console.log(sections);
	console.log(effectParams);
	const paramLabels = effectParams.split(',');
	const parameters = {
		sx: paramLabels[0] || 'Effect speed',
		ix: paramLabels[1] || 'Effect intensity',
		c1: paramLabels[2] || '',
		c2: paramLabels[3] || '',
		c3: paramLabels[4] || '',
		o1: paramLabels[5] || '',
		o2: paramLabels[6] || '',
		o3: paramLabels[7] || '',
	};

	// Parse colors
	const colorLabels = colors.split(',');
	const colorControls = {
		fx: colorLabels[0] || 'Fx',
		bg: colorLabels[1] || 'Bg',
		cs: colorLabels[2] || 'Cs',
	};

	// Parse flags
	const flagLabels = flags.split('');
	const effectFlags = {
		singleLED: flagLabels.includes('0'),
		optimized1D: flagLabels.includes('1'),
		requires2D: flagLabels.includes('2'),
		requires3D: flagLabels.includes('3'),
		audioReactiveVolume: flagLabels.includes('v'),
		audioReactiveFrequency: flagLabels.includes('f'),
	};

	// Construct object for current effect metadata
	const effectMetadata = {
		parameters: parameters,
		colorControls: colorControls,
		paletteEnabled: palette === '!',
		flags: effectFlags,
		defaults: defaults,
	};

	return effectMetadata;
}

export default function convert(data) {
	return parseRawData(data);
}

const mentionsInputStyle = {
	control: {
		fontSize: 16,
		minHeight: '100px',
	},

	'&multiLine': {
		control: {
			fontFamily: 'DM Sans, sans-serif',
		},
		highlighter: {
			padding: 7,
			border: '1px solid transparent',
		},
		input: {
			padding: 10,
			border: 'none',
			fontFamily: 'DM Sans, sans-serif',
			fontSize: 14,
		},
	},

	'&singleLine': {
		display: 'inline-block',
		width: '100%',
		minHeight: '100px',
		highlighter: {
			padding: 1,
			border: '2px inset transparent',
		},
		input: {
			padding: 1,
			border: 'none',
		},
	},

	suggestions: {
		list: {
			backgroundColor: 'transparent',
			fontSize: 14,
			width: '243px',
			zIndex: 9999,
			boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
			overflowY: 'auto',
			height: 'fit-content',
			marginTop: '20px',
			overflowX: 'hidden',
			position: 'relative',
			left: '-50px',
			borderRadius: '4px',
			maxHeight: '400px',
		},
		item: {
			width: '100%',
			borderBottom: '1px solid #dadada',
			padding: '6px 10px',
			fontWeight: 400,
			display: 'flex',
			backgroundColor: 'red',
			'&focused': {
				backgroundColor: '#7289da',
				color: '#fff',
				display: 'flex',
			},
		},
	},
};

export default mentionsInputStyle;

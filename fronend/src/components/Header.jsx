import React from 'react';

export default function Header() {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			{/* eslint-disable-next-line */}
			<a className='navbar-brand' href={'/'}>
				Navbar
			</a>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarColor02'
				aria-controls='navbarColor02'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarColor02'></div>
		</nav>
	);
}

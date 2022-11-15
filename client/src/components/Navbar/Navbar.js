import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
// import logo from '../../assets/logo.webp';
import logo from '../../assets/logo1.png';
import './Navbar.css'
import { Link } from '@mui/material';

const NavBar = () => {
  return (
	<div className='main-nav'>
		<Navbar>
			<Container>
				<Navbar.Brand>
					{/* <Nav.Link href={`${window.location.protocol}//${window.location.host}`}> */}
					<Nav.Link href='/'>
						<Image fluid 
						className='App-logo shadow-sm' alt='logo' 
						src={logo} 
						/>
            			{/* <b>Sample</b> */}
					</Nav.Link>
				</Navbar.Brand>
			</Container>
			{/* <Navbar.Toggle /> */}

			{/* <Navbar.Collapse className='justify-content-end'>
					<Button variant='contained' href='/login' id='nav-btn' size='lg'>
						Login/Register
					</Button>
			</Navbar.Collapse> */}
			<Navbar.Collapse className='justify-content-end'>
				<Link href='/login' id='nav-link' underline='none'>Login</Link>
			</Navbar.Collapse>
		</Navbar>

		<Outlet />
	</div>
	)
};

export default NavBar;
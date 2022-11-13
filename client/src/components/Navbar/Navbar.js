import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.webp';
import './Navbar.css'

const NavBar = () => {
  return (
	<div className='main-nav'>
		<Navbar>
			<Container>
				<Navbar.Brand>
					{/* <Nav.Link href={`${window.location.protocol}//${window.location.host}`}> */}
					<Nav.Link href='/'>
						<Image fluid roundedCircle src={logo} className='App-logo shadow-sm' alt='logo' />
            <b>Sample Restaurant</b>
					</Nav.Link>
				</Navbar.Brand>
			</Container>
			{/* <Navbar.Toggle /> */}

			<Navbar.Collapse className='justify-content-end'>
					<Button variant='contained' href='/login' id='nav-btn' size='lg'>
						Login/Register
					</Button>
			</Navbar.Collapse>
		</Navbar>

		<Outlet />
	</div>
	)
};

export default NavBar;
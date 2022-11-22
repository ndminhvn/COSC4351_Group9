import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Link } from '@mui/material';
// import logo from '../../assets/logo.webp';

import logo from '../../assets/logo1.png';

import './Navbar.css'

const NavBar = () => {
  return (
	<>
	<Navbar className='main-nav' fluid='true' collapseOnSelect expand='lg'>
		<Navbar.Brand href='/' style={{marginLeft:'10vw'}}>
			<Image 
				fluid 
				className='App-logo shadow-sm' alt='logo' 
				src={logo} 
			/>
		</Navbar.Brand>

		<Navbar.Toggle aria-controls='responsive-navbar-nav'>
			{' '}
			<i className='fas fa-bars fa-lg'></i>
		</Navbar.Toggle>

		<Navbar.Collapse className='justify-content-end'>
			<Nav>
				<Link href='/login' className='nav-link' underline='none'>Login</Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>

	<Outlet />
	</>
	)
};

export default NavBar;
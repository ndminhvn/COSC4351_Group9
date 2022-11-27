import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link, Tooltip, Menu, MenuItem, Typography } from '@mui/material';

import logo from '../../assets/logo1.png';

import './Navbar.css'

// const settings = {
// 	'Profile':'/user',
// 	'Dashboard':'/', 
// 	'Logout':'/'
// };

const settings = ['Profile', 'Dashboard', 'Logout'];

const NavBar = () => {
	const [token, setToken] = useState();

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

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
					<Link href='/reserve' className='nav-link' underline='none'>Reservation</Link>
					{(!token) ? 
						<Link href='/login' className='nav-link' underline='none'>Login</Link>
						: 
						<>
						<Tooltip title='Open settings'>
							<Link 
								className='nav-link' underline='none'
								onClick={handleOpenUserMenu}
								// onMouseOver={handleOpenUserMenu} 
							>
								User
							</Link>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
              				onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
						</>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>

		<Outlet />
		</>
	)
};

export default NavBar;
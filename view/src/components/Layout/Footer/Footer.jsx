import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Phone } from '../../../assets/icons/phone.svg';
import { ReactComponent as Mail } from '../../../assets/icons/mail.svg';
import './Footer.css';

function Footer() {
	return (
		<footer className='py-5'>
			<div className='container-fluid container-min-max-width
                            d-flex justify-content-between'>
				<div className='footer-group'>
					<h3 className='h5'>Quick Links:</h3>
					<p className='mb-1'>
						<Link to='/about'>About</Link>
					</p>
					<p className='m-0'>
						<Link to='/terms-and-conditions'>Terms And Conditions</Link>
					</p>
				</div>
				<div className='footer-group'>
					<h3 className='h5'>Contact Us:</h3>
					<p className='mb-1'>
						<a href='mailto:razvan.cirlugea@gmail.com'>
							<Mail className='mr-1 mb-1 footer-icon' />
							sharpedge@gmail.com
						</a>
					</p>
					<p className='m-0'>
						<Phone className='mr-1 footer-icon' />+40741426612
					</p>
				</div>
			</div>
			<div className='text-center py-3'>&copy; Sharpedge SRL, 2020</div>
		</footer>
	);
}

export default Footer;

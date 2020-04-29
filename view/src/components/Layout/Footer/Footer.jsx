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
				<div>
					<h3 className='h5'>Link-uri rapide:</h3>
					<p className='mb-1'>
						<Link to='/about'>Despre</Link>
					</p>
					<p className='m-0'>
						<Link to='/terms-and-conditions'>Termeni și condiții</Link>
					</p>
				</div>
				<div>
					<h3 className='h5'>Contactati-ne:</h3>
					<p className='mb-1'>
						<a href='mailto:razvan.cirlugea@gmail.com'>
							<Mail className='mr-1 mb-1 footer-icon' />
							aligocomex@gmail.com
						</a>
					</p>
					<p className='m-0'>
						<Phone className='mr-1 footer-icon' />+37379620471
					</p>
				</div>
			</div>
			<div className='text-center py-3'>&copy; Aligocomex SRL, 2020</div>
		</footer>
	);
}

export default Footer;

import React from 'react';

import './Home.css';
import Slider from '../../components/Slider/Slider';

import Layout from '../../components/Layout/Layout';
import Banner from '../../components/Banner/Banner';
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';

function Home() {
	return (
		<Layout>
			<Slider />
		</Layout>
	);
}

export default Home;

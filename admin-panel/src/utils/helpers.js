import axios from 'axios';

export function fetchCategories() {
	const authToken = localStorage.getItem('Authorization');
	axios.defaults.headers.common = { Authorization: `${authToken}` };
	axios
		.get('/admin/categories')
		.then((response) => {
			this.setState({
				fetchedCategories: response.data,
				loading: false
			});
		})
		.catch((error) => {
			this.setState({
				displayModal: true,
				modalError: error.response.data.error
			});
			setTimeout(() => {
				this.setState({
					displayModal: false,
					modalError: ''
				});
			}, 1500);
		});
}

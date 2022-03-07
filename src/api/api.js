import axios from "axios";

const api = axios.create(
	{
		baseURL: 'https://chl0e-g-news-app.herokuapp.com/api',
	}

);

export default api;
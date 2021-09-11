import React, { useContext } from 'react';
import axios from 'axios';
import { Context } from '../hooks/context';
import { REMOVE_ARTICLE, GET_ARTICLE } from '../reducers/articles';

export default function Article({ article = {} }) {
	const { dispatch } = useContext(Context);

	const getDetails = async (id) => {
		try {
			const result = await axios.get(`http://127.0.0.1:5000/get/${id}/`);
			dispatch({ type: GET_ARTICLE, payload: result.data });
		} catch (error) {
			console.log(error);
		}
	};

	const removeArticlesInList = async (id) => {
		try {
			await axios.delete(`http://127.0.0.1:5000/delete/${id}/`);
			dispatch({ type: REMOVE_ARTICLE, payload: id });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<li>
			<div className='form-check' style={{ cursor: 'pointer' }} onClick={() => getDetails(article.id)}>
				<h5> {article.title}</h5>
			</div>
			<i className='remove mdi mdi-close-circle-outline' onClick={() => removeArticlesInList(article.id)} />
		</li>
	);
}

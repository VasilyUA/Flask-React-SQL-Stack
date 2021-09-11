import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ADD_ARTICLE } from '../reducers/articles';
import { Context } from '../hooks/context';

export default function AddArticles() {
	const { dispatch } = useContext(Context);
	const [state, setState] = useState({ title: '', description: '' });
	const [err, setError] = useState({ title: '', description: '' });

	const addArticle = async () => {
		if (state.title.length < 3) setError({ ...err, title: 'Enter title!' });
		if (state.description.length < 3) setError({ ...err, description: 'Enter description!' });

		try {
			const result = await axios.post(`http://127.0.0.1:5000/add`, state);
			dispatch({ type: ADD_ARTICLE, payload: result.data });
			setState({ title: '', description: '' });
			setError({ title: '', description: '' });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='add-items d-flex'>
			<input
				type='text'
				value={state.title}
				onChange={(e) => setState({ ...state, title: e.target.value })}
				className='form-control todo-list-input'
				placeholder={err.title !== '' ? err.title : 'Enter min 5 simbols title article!'}
			/>
			<input
				type='text'
				value={state.description}
				onChange={(e) => setState({ ...state, description: e.target.value })}
				className='form-control todo-list-input'
				placeholder={err.description !== '' ? err.description : 'Enter min 5 simbols description article!'}
			/>
			<button className='add btn btn-primary font-weight-bold todo-list-add-btn' onClick={addArticle}>
				Add
			</button>
		</div>
	);
}

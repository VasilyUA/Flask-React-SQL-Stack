import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Articles from './components/Articles';

import { reducer, initialState, GET_LIST } from './reducers/articles';

import { Context } from './hooks/context';

import './App.scss';

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getList = async () => {
		try {
			const result = await axios.get('http://127.0.0.1:5000/get');
			dispatch({ type: GET_LIST, payload: result.data });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<Context.Provider value={{ dispatch }}>
			<Header />
			<br />
			<Articles {...state} />
		</Context.Provider>
	);
}

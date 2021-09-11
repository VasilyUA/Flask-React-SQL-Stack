import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../hooks/context';
import { UPDATE_ARTICLE, CLOSE_ARTICLE } from '../reducers/articles';

export default function DatailArticle({ article = {} }) {
	const { dispatch } = useContext(Context);
	const [card, setCard] = useState({ title: '', description: '' });
	const [err, setError] = useState({ title: '', description: '' });
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		setCard(article);
	}, [article]);

	const handlerSave = async (id) => {
		if (card.title.length < 3) setError({ ...err, title: 'Enter title!' });
		if (card.description.length < 3) setError({ ...err, description: 'Enter description!' });

		try {
			const result = await axios.put(`http://127.0.0.1:5000/update/${id}/`, { title: card.title, description: card.description });
			dispatch({ type: UPDATE_ARTICLE, payload: { id, card: result.data } });
			setError({ title: '', description: '' });
			setUpdate(false);
			dispatch({ type: CLOSE_ARTICLE });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='card' style={{ width: '18rem' }}>
			<div className='card-body'>
				{update ? (
					<>
						<input type='text' value={card.title} onChange={(e) => setCard({ ...card, title: e.target.value })} />
						<br />
						<textarea value={card.description} onChange={(e) => setCard({ ...card, description: e.target.value })} cols='21' rows='5'></textarea>
					</>
				) : (
					<>
						<h3>{card.title}</h3>
						<p className='card-text'>{card.description}</p>
					</>
				)}
				<button
					className={`btn btn-${update ? 'secondary' : 'primary'} btn-block btn-sm`}
					placeholder='Enter title'
					onClick={() => setUpdate(!update)}
				>
					{update ? 'Back' : 'Update'}
				</button>
				<button
					className={`btn btn-${update ? 'success' : 'secondary'} btn-block btn-sm`}
					placeholder='Enter title'
					onClick={update ? () => handlerSave(card.id) : () => dispatch({ type: CLOSE_ARTICLE })}
				>
					{update ? 'Save' : 'Close'}
				</button>
			</div>
		</div>
	);
}

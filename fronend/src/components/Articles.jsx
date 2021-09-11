import React from 'react';
import AddArticles from './AddArticles';
import Article from './Article';
import DatailArticle from './DatailArticle';

export default function Articles({ articles = [], oneArticle = {}, isArticles }) {
	return (
		<div className='page-content page-container' id='page-content'>
			<div className='padding'>
				<div className='container d-flex justify-content-center'>
					<div className='col-md-9'>
						<div className='card px-3'>
							<div className='card-body'>
								<h1>Articles list</h1>
								<AddArticles />
								<div className='list-wrapper'>
									<ul className='d-flex flex-column-reverse todo-list'>
										{articles.map((item) => (
											<Article key={item.id} article={item} />
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
					{isArticles ? <DatailArticle article={oneArticle} /> : null}
				</div>
			</div>
		</div>
	);
}

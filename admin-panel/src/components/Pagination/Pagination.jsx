import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ total, active, size, style, alignment, show, pageLink }) {
	total = Number(total);
	active = Number(active);
	show = Number(show);
	let previousPageNo = active > 1 && active - 1;
	let nextPageNo = total > active && active + 1;
	let previousPageDisabled = previousPageNo ? {} : { disabled: 'disabled' };
	let nextPageDisabled = nextPageNo ? {} : { disabled: 'disabled' };

	let listItems = [];

	const range = (start, end) => {
		let rangeStart = start;
		let arr = new Array(end - rangeStart + 1);
		for (let i = 0; i < arr.length; i++, rangeStart++) {
			arr[i] = rangeStart;
		}
		return arr;
	};
	let delta = Math.floor(show / 2);
	let start = Math.max(active - delta, 1);
	let end = Math.min(active + delta, total);
	let pages = range(start, end);
	listItems = [ ...pages ];
	if (start > 2) {
		listItems = [ 1, `&hellip;`, ...pages ];
	} else if (start === 2) {
		listItems = [ 1, ...pages ];
	}
	if (end < total - 1) {
		listItems = [ ...listItems, `&hellip;`, total ];
	} else if (end === total - 1) {
		listItems = [ ...listItems, total ];
	}

	const isCurrent = (element) => element === active;

	return (
		<nav className={`pagination is-${size} is-${style} is-${alignment}`} role='navigation' aria-label='pagination'>
			<Link
				to={previousPageNo ? `${pageLink(previousPageNo)}` : `javascript:void(0)`}
				className='pagination-previous'
				{...previousPageDisabled}>
				Previous
			</Link>

			<Link
				to={nextPageNo ? `${pageLink(nextPageNo)}` : `javascript:void(0)`}
				className='pagination-next'
				{...nextPageDisabled}>
				Next page
			</Link>

			<ul className='pagination-list'>
				{listItems.map((item) => {
					return (
						<li key={item}>
							{item !== `&hellip;` ? (
								<Link
									to={pageLink(item)}
									className={`pagination-link ${isCurrent(item) ? 'is-current' : ''} `}
									{...(isCurrent(item)
										? { 'aria-label': `Page ${item}`, 'aria-current': 'page' }
										: { 'aria-label': `Goto page ${item}` })}>
									{item}
								</Link>
							) : (
								<span className='pagination-ellipsis'>&hellip;</span>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default Pagination;

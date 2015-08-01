import * as React from 'react';
import * as $ from 'jquery';
import LibraryItem = require('./LibraryItem');
import MpdActions = require('../actions/MpdActions');

interface Props {
	_down: () => void;
	artists: string[];
}

class Artists extends React.Component<Props, any> {
	constructor() {
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		var artists: JSX.Element[] = [];

		this.props.artists.forEach((artist, i) => {
			artists.push(
				<LibraryItem item={artist} key={i} showArrow={true} />
			);
		});

		return (
			<ul className='list artists'>
				{artists}
			</ul>
		);
	}

	componentDidMount() {
		// When putting onClick on the ul element
		// clicking would not work after switching back
		// to the Playlist tab, this fixes it.
		$('.artists').click(this._onClick);
	}

	_onClick() {
		var elem = $(event.target);
		var itemID = elem.closest('li').data('id');
		// Clicked element is one of the two buttons
		if (elem.hasClass('fa-plus')) {
			MpdActions.addArtist(itemID);
		} else if (elem.hasClass('fa-chevron-right')) {
			// Change state of library
			this.props._down();
			MpdActions.getAlbums(itemID);
		}
	}
}

export = Artists;

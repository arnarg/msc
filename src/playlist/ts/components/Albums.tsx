import * as React from 'react';
import * as $ from 'jquery';
import LibraryItem = require('./LibraryItem');
import MpdActions = require('../actions/MpdActions');

interface Props {
	_up: () => void;
	_down: () => void;
	albums: IAlbums;
}

class Albums extends React.Component<Props, any> {
	constructor() {
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		var albums: JSX.Element[] = [];

		this.props.albums.albums.forEach((artist, i) => {
			albums.push(
				<LibraryItem item={artist} key={i} showArrow={true} />
			);
		});

		return (
			<ul className='list albums'>
				{albums}
			</ul>
		);
	}

	componentDidMount() {
		// When putting onClick on the ul element
		// clicking would not work after switching back
		// to the Playlist tab, this fixes it.
		$('.albums').click(this._onClick);
	}

	_onClick() {
		var elem = $(event.target);
		var itemID = elem.closest('li').data('id');
		// Clicked element is one of the two buttons
		if (elem.hasClass('fa-plus')) {
			MpdActions.addAlbum(this.props.albums.artist, itemID);
		} else if (elem.hasClass('fa-chevron-right')) {
			// Change state of library
			this.props._down();
			MpdActions.getSongs(this.props.albums.artist, itemID);
		}
	}
}

export = Albums;

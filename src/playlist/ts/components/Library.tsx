import * as React from 'react';
import * as $ from 'jquery';
import MpdActions = require('../actions/MpdActions');
import LibraryItem = require('./LibraryItem');

enum Page {ARTISTS = 0, ALBUMS, SONGS}

interface State {
	activePage: Page;
}

interface Props {
	library: {
		artists: string[];
		albums: string[];
		songs: string[];
	}
}

class Library extends React.Component<Props, State> {
	constructor() {
		this.state = {activePage: Page.ARTISTS};
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		var items: string[];
		switch(this.state.activePage) {
			case Page.ARTISTS:
				items = this.props.library.artists;
				break;
			case Page.ALBUMS:
				items = this.props.library.albums;
				break;
			case Page.SONGS:
				items = this.props.library.songs;
				break;
		}

		var list: JSX.Element[] = [];
		items.forEach((item, i) => {
			list.push(
				<LibraryItem item={item} key={i} />
			);
		});
		return (
			<ul className='list library'>
				{list}
			</ul>
		);
	}

	componentDidMount() {
		// When putting onClick on the ul element
		// clicking would not work after switching back
		// to the Playlist tab, this fixes it.
		$('.library').click(this._onClick);
	}

	_onClick(event) {
		var elem = $(event.target);
		var itemID = elem.closest('li').data('id');
		switch(this.state.activePage) {
			case Page.ARTISTS:
				this._handleArtist(elem, itemID);
				break;
			case Page.ALBUMS:
				this._handleAlbum(elem, itemID);
				break;
			case Page.SONGS:
				this._handleSong(elem, itemID);
				break;
		}
	}

	_handleArtist(elem, id) {
		if (elem.hasClass('fa-plus')) {
			MpdActions.addArtist(id);
		}	else if (elem.hasClass('fa-chevron-right')) {
			this.state = {activePage: Page.ALBUMS};
			MpdActions.getAlbums(id);
		}
	}

	_handleAlbum(elem, id) {
		if (elem.hasClass('fa-plus')) {

		}	else if (elem.hasClass('fa-chevron-right')) {

		}
	}

	_handleSong(elem, id) {
		if (elem.hasClass('fa-plus')) {

		}	else if (elem.hasClass('fa-chevron-right')) {

		}
	}
}

export = Library;

import * as React from 'react';
import * as $ from 'jquery';
import LibraryItem = require('./LibraryItem');
import BackBtn = require('./BackBtn');
import MpdActions = require('../actions/MpdActions');

interface Props {
	_up: () => void;
	songs: ISongs;
}

class Songs extends React.Component<Props, any> {
	constructor() {
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		var songs: JSX.Element[] = [];

		this.props.songs.songs.forEach((song, i) => {
			songs.push(
				<LibraryItem item={song} key={i} showArrow={false} />
			);
		});

		return (
			<ul className='list songs'>
				<BackBtn back={this._onBack} />
				{songs}
			</ul>
		);
	}

	componentDidMount() {
		// When putting onClick on the ul element
		// clicking would not work after switching back
		// to the Playlist tab, this fixes it.
		$('.songs').click(this._onClick);
	}

	_onClick() {
		var elem = $(event.target);
		var itemID = elem.closest('li').data('id');
		// Clicked element is one of the two buttons
		if (elem.hasClass('fa-plus')) {
			MpdActions.addSong(this.props.songs.artist,
			                   this.props.songs.album,
			                   itemID);
		}
	}

	_onBack() {
		this.props._up();
		MpdActions.getAlbums(this.props.songs.artist);
	}
}

export = Songs;

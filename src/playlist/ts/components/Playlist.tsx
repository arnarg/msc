import * as React from 'react';
import * as $ from 'jquery';
import PlaylistItem = require('./PlaylistItem');
import MpdActions = require('../actions/MpdActions');

interface Props {
	playlist: IListItem[];
}

class Playlist extends React.Component<Props, any> {
	constructor() {
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		var playlist: JSX.Element[] = [];

		this.props.playlist.forEach((song: IListItem) => {
			playlist.push(
				<PlaylistItem song={song} key={song.id} />
			);
		});

		return (
			<ul className='playlist'>
				{playlist}
			</ul>
		);
	}

	componentDidMount() {
		// When putting onClick on the ul element
		// clicking would not work after switching back
		// to the Playlist tab, this fixes it.
		$('.playlist').click(this._onClick);
	}

	_onClick(event) {
		var elem = $(event.target);
		var songID = elem.closest('li').data('id');
		// Clicked element is one of the two buttons
		if (elem.hasClass('fa-play')) {
			MpdActions.playSong({id: songID});
		} else if (elem.hasClass('fa-minus-circle')) {
			MpdActions.removeSong({id: songID});
		}
	}
}

export = Playlist;

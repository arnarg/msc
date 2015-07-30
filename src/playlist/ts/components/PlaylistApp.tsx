import * as React from 'react';
import MpdStore = require('../stores/MpdStore');

interface State {
	playlist: listItem[];
}

function getPlaylistState(): State {
	return {
		playlist: MpdStore.getState().playlist
	};
}

class PlaylistApp extends React.Component<any, State> {
	constructor() {
		let _state = getPlaylistState();
		this.state = _state;
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onChange = this._onChange.bind(this);
		super();
	}

	render() {
		var title: string = '';
		if (this.state.playlist.length > 0) {
			title = this.state.playlist[0].title;
		}

		return (
			<div className="flex-container">
				{title}
			</div>
			);
	}

	componentDidMount() {
		MpdStore.listen(this._onChange);
	}

	componentWillUnmount() {
		MpdStore.unlisten(this._onChange);
	}

	_onChange() {
		this.setState(getPlaylistState());
	}
}

export = PlaylistApp;

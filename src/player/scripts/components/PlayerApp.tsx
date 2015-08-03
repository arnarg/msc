/// <reference path="../typings/player.d.ts"/>

import * as React from 'react';
import MpdStore = require('../stores/MpdStore');
import CoverStore = require('../stores/CoverStore');
import MpdActions = require('../actions/MpdActions');
import CoverActions = require('../actions/CoverActions');
import Cover = require('./Cover');
import ProgressBar = require('./ProgressBar');
import Controls = require('./Controls');

interface State {
	status: IStatusObj;
	cover: string;
	settings: ISettingsObj;
}

function getPlayerState(): State {
	return {
		status: MpdStore.getState().status,
		cover: CoverStore.getState().cover,
		settings: {host: 'localhost', port: 6600}
	};
}

class PlayerApp extends React.Component<any, State> {
	constructor() {
		let _state = getPlayerState();
		this.state = _state;
		MpdActions.getStatus();
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onChange = this._onChange.bind(this);
		super();
	}

	render() {
		var songData = {
			artist: this.state.status.artist,
			title: this.state.status.title
		};
		return (
			<div className='flex-container'>
				<Cover songData={songData}
				       cover={this.state.cover}
				       repeat={this.state.status.repeat}
				       random={this.state.status.random} />
				<ProgressBar elapsed={this.state.status.elapsed}
				             duration={this.state.status.time} />
				<Controls state={this.state.status.state} />
			</div>
		);
	}

	componentDidMount() {
		MpdStore.listen(this._onChange);
		CoverStore.listen(this._onChange);
	}

	componentWillUnmount() {
		MpdStore.unlisten(this._onChange);
		CoverStore.unlisten(this._onChange);
	}

	_onChange() {
		this.setState(getPlayerState());
	}
}

export = PlayerApp;

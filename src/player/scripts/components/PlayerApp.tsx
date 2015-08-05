/// <reference path="../typings/player.d.ts"/>

import * as React from 'react';
import MpdStore = require('../stores/MpdStore');
import CoverStore = require('../stores/CoverStore');
import MpdActions = require('../actions/MpdActions');
import CoverActions = require('../actions/CoverActions');
import Cover = require('./Cover');
import ProgressBar = require('./ProgressBar');
import Controls = require('./Controls');
import Menu = require('./Menu');

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
		return (
			<div className='flex-container'>
				<Cover songData={this.state.status.currentSong}
				       cover={this.state.cover}
				       repeat={this.state.status.stats.repeat}
				       random={this.state.status.stats.random} />
				<ProgressBar elapsed={this.state.status.stats.elapsed}
				             duration={this.state.status.stats.duration} />
				<Controls state={this.state.status.stats.state} />
				<Menu />
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

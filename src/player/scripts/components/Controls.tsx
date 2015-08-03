/// <reference path="../typings/player.d.ts"/>

import * as React from 'react';
import MpdActions = require('../actions/MpdActions');

interface Props {
	state: string;
}

class Controls extends React.Component<Props, any> {
	constructor() {
		this._togglePlayback = this._togglePlayback.bind(this);
		this._prevSong = this._prevSong.bind(this);
		this._nextSong = this._nextSong.bind(this);
		super();
	}

	render() {
		var btnClass: string = this.props.state === 'play' ? 'fa-pause':'fa-play';
		return (
			<div className="controls">
				<i className="fa fa-step-backward control"
				onClick={this._prevSong}
				id="prevBtn"></i>
				<i className={'fa control ' + btnClass}
				onClick={this._togglePlayback}
				id="playBtn"></i>
				<i className="fa fa-step-forward control"
				onClick={this._nextSong}
				id="nextBtn"></i>
			</div>
		);
	}

	_togglePlayback() {
		MpdActions.togglePlayback(this.props.state);
	}

	_prevSong() {
		MpdActions.prevSong();
	}

	_nextSong() {
		MpdActions.nextSong();
	}
}

export = Controls;

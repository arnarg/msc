/// <reference path="../typings/player.d.ts"/>

import * as React from 'react';
import * as $ from 'jquery';
import MpdActions = require('../actions/MpdActions');

interface Props {
	elapsed: number;
	duration: number;
}

class ProgressBar extends React.Component<Props, any> {
	constructor() {
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		var cssWidth = {
			width: ((this.props.elapsed / this.props.duration) * 100) + '%'
		};

		return (
			<div className="progress-bar" onClick={this._onClick}>
				<div className="progress" style={cssWidth} />
			</div>
		);
	}

	_onClick(e) {
		var windowWidth: number = $(window).width();
		MpdActions.seekPos((e.pageX / windowWidth) * this.props.duration);
	}
}

export = ProgressBar;

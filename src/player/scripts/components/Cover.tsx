/// <reference path="../typings/player.d.ts"/>

import * as React from 'react';
import * as $ from 'jquery';

interface Props {
	songData: {artist: string, title: string};
	cover: string;
	random: number;
	repeat: number;
}

interface State {
	hudActive: boolean;
}

class Cover extends React.Component<Props, State> {
	_timeout: number;
	constructor() {
		this.state = {hudActive: false};
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		var coverCss = {backgroundImage: 'url(' + this.props.cover + ')'};
		var active = this.state.hudActive ? ' active' : '';
		return (
			<div className='cover' style={coverCss} onClick={this._onClick}>
				<div className={'song-info' + active}>
					<div className='artist'>
						{this.props.songData.artist.toUpperCase()}
					</div>
					<div className='title'>
						{this.props.songData.title}
					</div>
					<div className='playback-options'>

					</div>
				</div>
			</div>
		);
	}

	_onClick(e) {
		this.setState({hudActive: !this.state.hudActive});
	}

	_mouseLeave(e) {

	}

	_mouseEnter(e) {

	}
}

export = Cover;

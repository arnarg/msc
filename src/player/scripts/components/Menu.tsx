/// <reference path="../typings/player.d.ts"/>

import * as React from 'react';
import * as $ from 'jquery';

interface State {
	active: boolean;
}

class Menu extends React.Component<any, State> {
	constructor() {
		let _state = {active: false};
		this.state = _state;
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		this._show = this._show.bind(this);
		this._hide = this._hide.bind(this);
		this._onPlaylist = this._onPlaylist.bind(this);
		this._onSettings = this._onSettings.bind(this);
		super();
	}

	render() {
		var classString: string = 'menu' + (this.state.active ? ' active':'');
		return (
			<div>
				<ul className={classString}>
					<li onClick={this._onPlaylist}>
						<i className='fa fa-list'></i> Playlist
					</li>
					<li onClick={this._onSettings}>
						<i className='fa fa-cog'></i> Settings
					</li>
				</ul>
				<i className='fa fa-bars'
				   id='menu-btn'
				   onClick={this._onClick}></i>
			</div>
		);
	}

	_onClick() {
		if (!this.state.active) {
			this._show();
		} else {
			this._hide();
		}
	}

	_show() {
		this.setState({active: true});
	}

	_hide() {
		this.setState({active: false});
	}

	_onPlaylist() {
		console.log('playlist clicked');
		this._hide();
	}

	_onSettings() {
		$('.settings').addClass('active');
		this._hide();
	}
}

export = Menu;

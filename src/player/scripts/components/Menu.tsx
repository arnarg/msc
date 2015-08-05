/// <reference path="../typings/player.d.ts"/>

import * as React from 'react';

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
						<i className='fa fa-list'></i> Settings
					</li>
				</ul>
				<i className='fa fa-bars'
				   id='menu-btn'
				   onClick={this._onClick}></i>
			</div>
		);
	}

	_onClick() {
		this.setState({active: !this.state.active});
	}

	_onPlaylist() {
		console.log('playlist clicked');
	}

	_onSettings() {
		console.log('settings clicked');
	}
}

export = Menu;

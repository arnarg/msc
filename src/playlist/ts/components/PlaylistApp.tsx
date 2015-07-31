import * as React from 'react';
import MpdStore = require('../stores/MpdStore');
import TabStore = require('../stores/TabStore');
import MpdActions = require('../actions/MpdActions');
import Tabs = require('./Tabs');
import Content = require('./Content');

interface State {
	playlist: IListItem[];
	tabData: ITabStoreState;
}

function getPlaylistState(): State {
	return {
		playlist: MpdStore.getState().playlist,
		tabData: TabStore.getState()
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
		return (
			<div className="flex-container">
				<Tabs active={this.state.tabData.activeTab}
				      tabs={this.state.tabData.tabs} />
				<Content activeTab={this.state.tabData.activeTab}
				         playlist={this.state.playlist} />
			</div>
			);
	}

	componentDidMount() {
		MpdStore.listen(this._onChange);
		TabStore.listen(this._onChange);
	}

	componentWillUnmount() {
		MpdStore.unlisten(this._onChange);
		TabStore.unlisten(this._onChange);
	}

	_onChange() {
		this.setState(getPlaylistState());
	}
}

export = PlaylistApp;

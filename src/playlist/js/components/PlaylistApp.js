var React    = require('react');
var MpdStore = require('../stores/MpdStore');
var Playlist = require('./Playlist');
var Tabs     = require('./Tabs');
var Library  = require('./Library');

var tabData = {
	activeTab: 0,
	tabList: [
		{
			icon: 'fa fa-list',
			title: 'Playlist',
			active: true
		},
		{
			icon: 'fa fa-music',
			title: 'Library',
			active: false
		}
	]
};

var components;

function getPlaylistState() {
	return {
		playlist: MpdStore.getPlaylist()
	};
}

var PlaylistApp = React.createClass({

	_updateTab: function(id) {
		tabData.tabList[tabData.activeTab].active = false;
		tabData.activeTab = id;
		tabData.tabList[tabData.activeTab].active = true;
		this.forceUpdate();
	},

	getInitialState: function() {
		return getPlaylistState();
	},

	componentWillMount: function() {
		components = [
			<Playlist list={this.state.playlist} />,
			<Library />
		];
	},

	componentDidMount: function() {
		MpdStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MpdStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var playlist = this.state.playlist;
		var component;

		if (tabData.activeTab === 0) {
			component = (<Playlist list={playlist} />);
		} else if (tabData.activeTab === 1) {
			component = (<Library />);
		}

		return (
			<div className='flex-container'>
				<Tabs tabList={tabData.tabList} updateTab={this._updateTab} />
				<div className='main'>
					{component}
				</div>
			</div>
		);
	},

	_onChange: function() {
		this.setState(getPlaylistState());
	}

});

module.exports = PlaylistApp;

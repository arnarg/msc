var Controls   = require('./Controls');
var Cover      = require('./Cover')
var SongInfo   = require('./SongInfo');
var Settings   = require('./Settings');
var React      = require('react');
var MpdStore   = require('../stores/MpdStore');

function getMscState() {
	return {
		status: MpdStore.getStatus()
	};
}

var MscApp = React.createClass({

	getInitialState: function() {
		return getMscState();
	},

	componentDidMount: function() {
		MpdStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MpdStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var state = this.state.status.State;
		var song = {
			Artist: this.state.status.Artist,
			Title:  this.state.status.Title
		};

		return (
			<div>
				<div className="background"></div>
				<Cover />
				<SongInfo song={song} />
				<Controls state={state} />
				<Settings />
			</div>
		);
	},

	_onChange: function() {
		this.setState(getMscState());
	}

});

module.exports = MscApp;

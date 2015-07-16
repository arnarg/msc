var Controls    = require('./Controls');
var Cover       = require('./Cover')
var SongInfo    = require('./SongInfo');
var Menu        = require('./Menu');
var ProgressBar = require('./ProgressBar');
var Settings    = require('./Settings');
var React       = require('react');
var MpdStore    = require('../stores/MpdStore');

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
		console.log(this.state.status);
		var state = this.state.status.state;
		var overlay = {
			Artist: this.state.status.artist,
			Title:  this.state.status.title,
			Repeat: this.state.status.repeat,
			Random: this.state.status.random
		};
		var progress = {
			Elapsed: this.state.status.elapsed,
			Duration: this.state.status.time
		};

		return (
			<div className="flex-container">
				<Cover overlay={overlay} />
				<ProgressBar progress={progress} />
				<Controls state={state} />
				<Menu />
				<Settings />
			</div>
		);
	},

	_onChange: function() {
		this.setState(getMscState());
	}

});

module.exports = MscApp;

var Controls   = require('./Controls');
var Cover      = require('./Cover')
var React      = require('react');
var MpdStore   = require('../stores/MpdStore');
var CoverStore = require('../stores/CoverStore');

function getMscState() {
	return {
		status: MpdStore.getStatus(),
		cover:  CoverStore.getCover()
	};
}

var MscApp = React.createClass({

	getInitialState: function() {
		return getMscState();
	},

	componentDidMount: function() {
		MpdStore.addChangeListener(this._onChange);
		CoverStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MpdStore.removeChangeListener(this._onChange);
		CoverStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div>
				<div className="background"></div>
				<Cover cover={this.state.cover} />
				<Controls status={this.state.status} />
			</div>
		);
	},

	_onChange: function() {
		this.setState(getMscState());
	}

});

module.exports = MscApp;

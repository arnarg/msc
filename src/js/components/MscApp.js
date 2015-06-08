var Controls   = require('./Controls');
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
		return (
			<div>
				<div className="background"></div>
				<Controls status={this.state.status} />
			</div>
		);
	},

	_onChange: function() {
		this.setState(getMscState());
	}

});

module.exports = MscApp;

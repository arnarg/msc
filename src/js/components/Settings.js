var React         = require('react');
var $             = require('jquery');
var SettingsStore = require('../stores/SettingsStore');
var MscActions    = require('../actions/MscActions');

var active = false;

function getSettingsState() {
	return SettingsStore.getSettings();
}

var Settings = React.createClass({

	getInitialState: function() {
		return getSettingsState();
	},

	componentDidMount: function() {
		SettingsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SettingsStore.removeChangeListener(this._onChange);
	},

	handleChange: function(event) {
		var currentState = this.state;
		var value = event.target.value;
		switch(event.target.id) {
			case 'host':
				currentState.host = value;
				break;
			case 'port':
				currentState.port = value;
				break;
		}
		this.setState(currentState);
	},

	toggleSettings: function(event) {
		var button = $(event.currentTarget);
		if (active) { // Closing
			button[0].classList.remove('active');
			button.siblings()[0].classList.remove('active');
			MscActions.saveSettings({
				host: this.state.host,
				port: this.state.port
			});
			MscActions.connect();
		} else { // Opening
			button[0].classList.add('active');
			button.siblings()[0].classList.add('active')
		}
		active = !active;
	},

	render: function() {
		return (
			<div>
				<div className="settings">
					<p>HOST</p>
					<input type="text"
					       id="host"
					       value={this.state.host}
					       onChange={this.handleChange} />
					<p>PORT</p>
					<input type="text"
					       id="port"
					       value={this.state.port}
					       onChange={this.handleChange} />
				</div>
				<i className="fa fa-cog"
				   onClick={this.toggleSettings}
				   id="settingsBtn">
				</i>
			</div>
		);
	},

	_onChange: function() {
		this.setState(getSettingsState());
	}

});

module.exports = Settings;

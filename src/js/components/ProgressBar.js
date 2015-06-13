var React      = require('react');
var MscActions = require('../actions/MscActions');
var $          = require('jquery');

var ProgressBar = React.createClass({

	_onClick: function(event) {
		var windowWidth = $(document).width();
		MscActions.seekPos({
			percent: event.pageX / windowWidth
		});
	},

	render: function() {
		console.log('before');
		var width = ((this.props.progress.Time / this.props.progress.Duration) * 100) + '%';
		console.log('after');
		return (
			<div className="progress-bar" onClick={this._onClick}>
				<div className="progress" style={{width: width}} />
			</div>
		);
	}

});

module.exports = ProgressBar;

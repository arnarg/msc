var React = require('react');

var ProgressBar = React.createClass({

	render: function() {
		var width = ((this.props.progress.Time / this.props.progress.Duration) * 100) + '%';

		return (
			<div className="progress-bar">
				<div className="progress" style={{width: width}} />
			</div>
		);
	}

});

module.exports = ProgressBar;

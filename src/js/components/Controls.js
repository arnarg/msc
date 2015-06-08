var React      = require('react');
var MscActions = require('../actions/MscActions');

var Controls = React.createClass({

	togglePlayback: function() {
		MscActions.togglePlayback();
	},

	prevSong: function() {
		MscActions.prevSong();
	},

	nextSong: function() {
		MscActions.nextSong();
	},

	render: function() {
		var status = this.props.status;
		var btnClass = "fa control" + (status.State === 'play' ? 'fa-pause' : 'fa-play');

		return (
			<div className="controls">
				<i className="fa fa-step-backward control"
				onClick={this.prevSong}
				id="prevBtn"></i>
				<i className={btnClass}
				onclick={this.togglePlayback}
				id="playBtn"></i>
				<i className="fa fa-step-forward control"
				onclick={this.nextSong}
				id="nextBtn"></i>
			</div>
		);
	}

});

module.exports = Controls;

var React      = require('react');
var CoverStore = require('../stores/CoverStore');

function getCoverState() {
	var cover = CoverStore.getCover();
	return {
		cover: (cover === 'none' ? 'img/background.png' : cover)
	};
}

var Cover = React.createClass({

	getInitialState: function() {
		return getCoverState();
	},

	componentDidMount: function() {
		CoverStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CoverStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var cover = this.state.cover;
		var style = {
			backgroundImage: 'url(' + cover + ')'
		}
		return (
			<div className="cover" style={style}>
			</div>
		);
	},

	_onChange: function() {
		var self = this;
		var cover = getCoverState();
		var img = new Image();
		img.onload = function() {
			self.setState(cover);
		};
		img.src = cover.cover;
	}

});

module.exports = Cover;

var React      = require('react');
var CoverStore = require('../stores/CoverStore');

function getCoverState() {
	var cover = CoverStore.getCover();
	return {
		cover: (cover === 'none' ? 'img/background.png' : cover)
	};
}

var Cover = React.createClass({

	_mouseEnter: function(event) {
		event.currentTarget.children.songInfo.classList.add('shown');
	},

	_mouseLeave: function(event) {
		event.currentTarget.children.songInfo.classList.remove('shown');
	},

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
		var song = this.props.song;
		var style = {
			backgroundImage: 'url(' + cover + ')'
		}
		return (
			<div className="cover" style={style}
			     onMouseEnter={this._mouseEnter}
			     onMouseLeave={this._mouseLeave}>
				<div className="song-info" id="songInfo">
					<div className="artist">{ song.Artist.toUpperCase() }</div>
					<div className="title">{ song.Title }</div>
				</div>
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

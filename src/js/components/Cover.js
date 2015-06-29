var React      = require('react');
var CoverStore = require('../stores/CoverStore');
var $          = require('jquery');

function getCoverState() {
	var cover = CoverStore.getCover();
	return {
		cover: (cover === 'none' ? 'img/background.png' : cover)
	};
}

var Cover = React.createClass({

	_mouseEnter: function(event) {
		event.currentTarget.children.songInfo.classList.add('active');
	},

	_mouseLeave: function(event) {
		event.currentTarget.children.songInfo.classList.remove('active');
	},

	_onClick: function(event) {
		var songInfo = $(event.currentTarget.children.songInfo);

		if (songInfo.hasClass('active')) {
			songInfo.removeClass('active');
			songInfo.off('mouseleave');
		} else {
			songInfo.addClass('active');
			songInfo.on('mouseleave', function() {
				setTimeout(function() {
					songInfo.removeClass('active');
				}, 5000);
			});
		}
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
		};
		var optElems = [];
		options.forEach(function(option) {
			optElems.push(
				<div className="option">
					<i className={option.Class} onClick={option.Func}></i>
				</div>
			);
		});
		return (
			<div className="cover" style={style}
			     onClick={this._onClick}>
				<div className="song-info" id="songInfo">
					<div className="artist">{ song.Artist.toUpperCase() }</div>
					<div className="title">{ song.Title }</div>
					<div className="playback-options">
						{optElems}
					</div>
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

var options = [
	{
		Class: "fa fa-random",
		Func:  function(event) {
			console.log('shuffle clicked');
			event.stopPropagation();
		}
	},
	{
		Class: "fa fa-repeat",
		Func: function(event) {
			console.log('repeat clicked');
			event.stopPropagation();
		}
	}
];

module.exports = Cover;

var React = require('react');

var PlaylistItem = React.createClass({

	render: function() {
		var song = this.props.song;

		return (
			<li data-id={song.id}>
				<div className='playBtn'>
					<i className='fa fa-play'>
					</i>
				</div>
				<div className='info'>
					<div className='artist'>{song.artist}</div>
					<div className='title'>{song.title}</div>
				</div>
				<div className='rmBtn'>
					<i className='fa fa-minus-circle'>
					</i>
				</div>
				<div className='time'>{song.time}</div>
			</li>
		);
	}

});

module.exports = PlaylistItem;

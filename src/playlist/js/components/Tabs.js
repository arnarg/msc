var React = require('react');

var Tabs = React.createClass({

	render: function() {
		return (
			<div className='tabBar'>
				<div className='tab active'>
					<i className='fa fa-list'></i> Playlist
				</div>
				<div className='tab'>
					<i className='fa fa-music'></i> Library
				</div>
			</div>
		);
	}

});

module.exports = Tabs;

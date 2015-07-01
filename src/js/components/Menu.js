var React = require('react');
var $     = require('jquery');

var Menu = React.createClass({

	_onClick: function(event) {
		var button = $(event.currentTarget);
		var menu   = $(button.siblings()[0]);

		if (menu.css('display') === 'none') {
			menu.show();
			menu.on('click', function(event) {
				event.stopPropagation();
			});
			$('.flex-container').on('click', function(event) {
				menu.hide();
				menu.off('click');
				$('.flex-container').off('click');
			});
		} else {
			menu.hide();
			menu.off('click');
			$('.flex-container').off('click');
		}
	},

	render: function() {
		return (
			<div>
				<ul className="menu">
					<li><i className="fa fa-list"></i> Playlist</li>
					<li><i className="fa fa-cog"></i> Settings</li>
				</ul>
				<i className="fa fa-bars"
				   id="menu-btn"
				   onClick={this._onClick}></i>
			</div>
		);
	}

});

module.exports = Menu;

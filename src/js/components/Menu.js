var React = require('react');
var $     = require('jquery');

var Menu = React.createClass({

	_show: function(menuElem) {
		var self = this;
		menuElem.show();
		menuElem.on('click', function() {
			event.stopPropagation();
		});
		$('.flex-container').on('click', function() {
			self._hide(menuElem);
		});
	},

	_hide: function(menuElem) {
		menuElem.hide();
		menuElem.off('click');
		$('.flex-container').off('click');
	},

	_onClick: function(event) {
		var menu = $($(event.currentTarget).siblings()[0]);

		if (menu.css('display') === 'none') {
			this._show(menu);
		} else {
			this._hide(menu);
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

var React = require('react');
var $     = require('jquery');

var Tabs = React.createClass({

	_selectTab: function(event) {
		var tab = $(event.target).closest('.tab');
		this.props.updateTab(parseInt(tab.data('id')));
		// Component doesn't update without calling this
		this.forceUpdate();
	},

	render: function() {
		var tabs = [];

		this.props.tabList.forEach(function(tab, i) {
			var className = 'tab' + (tab.active ? ' active' : '');

			tabs.push(
				<div className={className} key={i} data-id={i}>
					<i className={tab.icon}></i> {tab.title}
				</div>
			);
		});

		return (
			<div className='tabBar' onClick={this._selectTab}>
				{tabs}
			</div>
		);
	}

});

module.exports = Tabs;

var React      = require('react');
var CoverStore = require('../stores/CoverStore');

function getCoverState() {
	return {
		cover: CoverStore.getCover()
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
			backgroundImage: (cover !== 'none' ? 'url(' + cover + ')' : cover)
		}
		return (
			<div className="cover" style={style}>
			</div>
		);
	},

	_onChange: function() {
		this.setState(getCoverState());
	}

});

module.exports = Cover;

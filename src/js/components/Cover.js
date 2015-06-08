var React = require('react');

var Cover = React.createClass({

	render: function() {
		var cover = this.props.cover;
		var style = {
			backgroundImage: (cover !== 'none' ? 'url(' + cover + ')' : cover)
		}
		return (
			<div className="cover" style={style}>
			</div>
		);
	}

});

module.exports = Cover;

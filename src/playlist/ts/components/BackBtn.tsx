import * as React from 'react';
import * as $ from 'jquery';

interface Props {
	back: () => void;
}

class BackBtn extends React.Component<Props, any> {
	constructor() {
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		return (
			<li className='backBtn'>
				<div className='backText'>
					<i className='fa fa-ellipsis-h'></i>
				</div>
			</li>
		);
	}

	componentDidMount() {
		// When putting onClick on the ul element
		// clicking would not work after switching back
		// to the Playlist tab, this fixes it.
		$('.backBtn').click(this._onClick);
	}

	_onClick(event) {
		event.stopPropagation();
		this.props.back();
	}
}

export = BackBtn;

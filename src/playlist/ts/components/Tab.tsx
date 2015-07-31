import * as React from 'react';
import TabActions = require('../actions/TabActions');

interface Props {
	active: boolean;
	tab: ITab;
	key: number;
}

class Tab extends React.Component<Props, any> {
	constructor() {
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._onClick = this._onClick.bind(this);
		super();
	}

	render() {
		return (
			<li className={this.props.active ? 'active':''}
			    onClick={this._onClick}>
				<i className={this.props.tab.icon}></i> {this.props.tab.title}
			</li>
		);
	}

	_onClick() {
		TabActions.selectTab(this.props.tab.id);
	}
}

export = Tab;

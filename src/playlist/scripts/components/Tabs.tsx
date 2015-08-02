import * as React from 'react';
import * as $ from 'jquery';
import Tab = require('./Tab');
import TabActions = require('../actions/TabActions');

interface Props {
	active: number;
	tabs: ITab[];
}

class Tabs extends React.Component<Props, any> {
	render() {
		var tabs: JSX.Element[] = [];

		this.props.tabs.forEach((tab: ITab) => {
			tabs.push(
				<Tab tab={tab} active={tab.id === this.props.active} key={tab.id} />
			);
		});

		return (
			<ul className='tabBar'>
				{tabs}
			</ul>
		);
	}
}

export = Tabs;

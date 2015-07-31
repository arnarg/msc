import * as React from 'react';
import Playlist = require('./Playlist');

interface Props {
	activeTab: number;
	playlist: IListItem[];
}

class Content extends React.Component<Props, any> {
	render() {
		var component: JSX.Element;

		if (this.props.activeTab === 0) {
			component = <Playlist playlist={this.props.playlist} />
		} else if (this.props.activeTab === 1) {
			component = <div>Library</div>
		}

		return (
			<div className='main'>
				{component}
			</div>
		);
	}
}

export = Content;

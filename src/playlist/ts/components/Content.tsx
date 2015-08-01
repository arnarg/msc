import * as React from 'react';
import Playlist = require('./Playlist');
import Library = require('./Library');

interface Props {
	activeTab: number;
	playlist: IListItem[];
	library: {
		artists: string[];
		albums: IAlbums;
		songs: ISongs;
	}
}

class Content extends React.Component<Props, any> {
	render() {
		var component: JSX.Element;

		if (this.props.activeTab === 0) {
			component = <Playlist playlist={this.props.playlist} />
		} else if (this.props.activeTab === 1) {
			component = <Library library={this.props.library} />
		}

		return (
			<div className='main'>
				{component}
			</div>
		);
	}
}

export = Content;

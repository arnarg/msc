import * as React from 'react';

interface Props {
	song: IPlaylistItem;
	key: number;
}

class PlaylistItem extends React.Component<Props, any> {
	render() {
		var song = this.props.song;
		return (
			<li data-id={song.id}>
				<div className='leftBtn'>
					<i className='fa fa-play'>
					</i>
				</div>
				<div className='info'>
					<div className='artist'>{song.artist}</div>
					<div className='title'>{song.title}</div>
				</div>
				<div className='rightBtn'>
					<i className='fa fa-minus-circle'>
					</i>
				</div>
				<div className='time'>{song.time}</div>
			</li>
		);
	}
}

export = PlaylistItem;

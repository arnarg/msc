import * as React from 'react';

interface Props {
	song: ISong;
}

class Song extends React.Component<Props, any> {
	render() {
		var song = this.props.song;
		return (
			<li data-id={song.title}>
				<div className='leftBtn'>
					<i className='fa fa-plus'>
					</i>
				</div>
				<div className='libraryText'>
					{song.track} - {song.title}
				</div>
			</li>
		);
	}
}

export = Song;

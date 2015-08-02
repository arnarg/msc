import * as React from 'react';
import * as $ from 'jquery';
import MpdActions = require('../actions/MpdActions');
import Artists = require('./Artists');
import Albums = require('./Albums');
import Songs = require('./Songs');

enum Page {ARTISTS = 0, ALBUMS, SONGS}

interface Props {
	library: {
		artists: string[];
		albums: IAlbums;
		songs: ISongs;
	}
}

class Library extends React.Component<Props, any> {
	activePage: Page;
	constructor() {
		this.activePage = Page.ARTISTS;
		/**
		bind es6 methods so they are referenced properly when executed by jsx
		*/
		this._up = this._up.bind(this);
		this._down = this._down.bind(this);
		MpdActions.getArtists();
		super();
	}

	render() {
		switch(this.activePage) {
			case Page.ARTISTS:
				return (
					<Artists artists={this.props.library.artists}
					         _down={this._down} />
				);
				break;
			case Page.ALBUMS:
				return (
					<Albums albums={this.props.library.albums}
					        _up={this._up} _down={this._down} />
				);
				break;
			case Page.SONGS:
				return (
					<Songs songs={this.props.library.songs}
					       _up={this._up} />
				);
				break;
		}
	}

	_up(): void {
		if (this.activePage > Page.ARTISTS) this.activePage--;
	}

	_down(): void {
		if (this.activePage < Page.SONGS) this.activePage++;
	}
}

export = Library;

interface IMpdStoreState {
	playlist: IPlaylistItem[];
	artists: string[];
	albums: IAlbums;
	songs: ISongs;
}

interface ITab {
	id: number;
	icon: string;
	title: string;
}

interface ITabStoreState {
	activeTab: number;
	tabs: ITab[];
}

interface ISongData {
	id: number;
}

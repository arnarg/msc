interface IAlbums {
	artist: string;
	albums: string[];
}

interface ISong {
	artist: string;
	album: string;
	title: string;
	track: number;
	time: string;
	id: number;
}

interface ISongs {
	artist: string;
	album: string;
	songs: ISong[];
}

interface ISettingsObj {
	host: string;
	port: number;
}

interface IStats {
	volume: number;
	state: string;
	elapsed: number;
	duration: number;
	repeat: number;
	random: number;
}

interface IStatusObj {
	stats: IStats;
	currentSong: ISong;
}

interface IPlaylistItem {
	file: string;
	artist: string;
	album: string;
	genre: string;
	title: string;
	time: number;
	id: number
}

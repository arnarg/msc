interface IAlbums {
	artist: string;
	albums: string[];
}

interface ISongs {
	artist: string;
	album: string;
	songs: string[];
}

interface IStatusObj {
	volume: number;
	state: string;
	artist: string;
	album: string;
	title: string;
	elapsed: number;
	duration: number;
	repeat: number;
	random: number;
	time: number;
}

interface ISettingsObj {
	host: string;
	port: number;
}

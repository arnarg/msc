interface MpdStoreState {
	playlist: listItem[];
}

interface songData {
	id: number;
}

interface listItem {
	file: string;
	artist: string;
	album: string;
	genre: string;
	title: string;
	time: number;
	id: number;
}

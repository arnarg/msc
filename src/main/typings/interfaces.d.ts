/// <reference path="../../shared/ts/typings/interfaces.d.ts"/>

interface ISettingsObj {
	host: string;
	port: number;
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

interface IPlaylistItem {
	file: string;
	artist: string;
	album: string;
	genre: string;
	title: string;
	time: number;
	id: number
}

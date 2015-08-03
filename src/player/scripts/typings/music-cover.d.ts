declare module MusicCover {
	export interface CoverObj {
		artist: string;
		album?: string;
		size: string;
	}

	export function Init(api_key: string): Cover;

	export class Cover {
		search(obj: CoverObj, cb: (err, res) => void): void;
	}
}

declare module 'music-cover' {
	var _cover: MusicCover.Init;
	export = _cover;
}

declare module 'mpd' {
	export interface IOptions {
		host: string;
		port: number;
	}
	export interface ICommand {
		name: string;
		args: string[];
	}
	export interface MpdClient {
		on(event: string, cb: (data: any) => void): void
		sendCommand(command: ICommand, cb?: (err: any, msg: any) => void): void;
		sendCommands(commands: string[], cb?: (err: any, msg: any) => void): void;
	}

	export function connect(options: IOptions): MpdClient;
	export function cmd(name: string, args: string[]): ICommand;
}

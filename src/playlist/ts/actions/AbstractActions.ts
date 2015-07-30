/// <reference path="../typings/playlist.d.ts" />

class AbstractActions implements AltJS.ActionsClass {
    constructor( alt:AltJS.Alt) {}
    actions:any;
    dispatch: ( ...payload:Array<any>) => void;
    generateActions:( ...actions:Array<string>) => void;
}

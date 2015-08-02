class AbstractActions implements AltJS.ActionsClass {
    constructor( alt:AltJS.Alt) {}
    actions:any;
    dispatch: ( ...payload:Array<any>) => void;
    generateActions:( ...actions:Array<string>) => void;
}

export = AbstractActions;

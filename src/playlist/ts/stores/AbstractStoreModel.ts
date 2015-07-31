class AbstractStoreModel<S> implements AltJS.StoreModel<S> {
	bindActions:( ...actions:Array<Object>) => void;
	bindAction:( ...args:Array<any>) => void;
	bindListeners:(obj:any)=> void;
	exportPublicMethods:(config:{[key:string]:(...args:Array<any>) => any}) => any;
	exportAsync:( source:any) => void;
	waitFor:any;
	exportConfig:any;
	getState:() => S;
}

export = AbstractStoreModel;

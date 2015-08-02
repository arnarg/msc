var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var MpdStore = require('../stores/MpdStore');
var TabStore = require('../stores/TabStore');
var Tabs = require('./Tabs');
var Content = require('./Content');
function getPlaylistState() {
    var MpdState = MpdStore.getState();
    return {
        playlist: MpdState.playlist,
        library: {
            artists: MpdState.artists,
            albums: MpdState.albums,
            songs: MpdState.songs
        },
        tabData: TabStore.getState()
    };
}
var PlaylistApp = (function (_super) {
    __extends(PlaylistApp, _super);
    function PlaylistApp() {
        var _state = getPlaylistState();
        this.state = _state;
        this._onChange = this._onChange.bind(this);
        _super.call(this);
    }
    PlaylistApp.prototype.render = function () {
        return (React.createElement("div", {"className": "flex-container"}, React.createElement(Tabs, {"active": this.state.tabData.activeTab, "tabs": this.state.tabData.tabs}), React.createElement(Content, {"activeTab": this.state.tabData.activeTab, "playlist": this.state.playlist, "library": this.state.library})));
    };
    PlaylistApp.prototype.componentDidMount = function () {
        MpdStore.listen(this._onChange);
        TabStore.listen(this._onChange);
    };
    PlaylistApp.prototype.componentWillUnmount = function () {
        MpdStore.unlisten(this._onChange);
        TabStore.unlisten(this._onChange);
    };
    PlaylistApp.prototype._onChange = function () {
        this.setState(getPlaylistState());
    };
    return PlaylistApp;
})(React.Component);
module.exports = PlaylistApp;

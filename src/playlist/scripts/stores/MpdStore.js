/// <reference path="../typings/playlist.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var alt = require('../alt');
var MpdActions = require('../actions/MpdActions');
var AbstractStoreModel = require('./AbstractStoreModel');
var MpdStore = (function (_super) {
    __extends(MpdStore, _super);
    function MpdStore() {
        _super.call(this);
        this.playlist = [];
        this.artists = [];
        this.albums = {
            artist: '',
            albums: []
        };
        this.songs = {
            artist: '',
            album: '',
            songs: []
        };
        this.bindActions(MpdActions);
    }
    MpdStore.prototype.onUpdatePlaylist = function (playlist) {
        this.playlist = playlist;
    };
    MpdStore.prototype.onGetArtists = function (artists) {
        this.artists = artists;
    };
    MpdStore.prototype.onGetAlbums = function (albums) {
        this.albums = albums;
    };
    MpdStore.prototype.onGetSongs = function (songs) {
        this.songs = songs;
    };
    MpdStore.prototype.onRemoveSong = function () {
        MpdActions.updatePlaylist();
    };
    MpdStore.prototype.onAddArtist = function () {
        MpdActions.updatePlaylist();
    };
    MpdStore.prototype.onAddAlbum = function () {
        MpdActions.updatePlaylist();
    };
    MpdStore.prototype.onAddSong = function () {
        MpdActions.updatePlaylist();
    };
    return MpdStore;
})(AbstractStoreModel);
module.exports = alt.createStore(MpdStore, 'MpdStore');

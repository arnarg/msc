/// <reference path="../typings/playlist.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var alt = require('../alt');
var MpdUtils = require('../utils/MpdUtils');
var AbstractActions = require('./AbstractActions');
var MpdActions = (function (_super) {
    __extends(MpdActions, _super);
    function MpdActions() {
        _super.apply(this, arguments);
    }
    MpdActions.prototype.playSong = function (data) {
        MpdUtils.playSong(data.id);
    };
    MpdActions.prototype.removeSong = function (data) {
        MpdUtils.removeSong(data.id);
    };
    MpdActions.prototype.updatePlaylist = function (playlist) {
        this.dispatch(playlist);
    };
    MpdActions.prototype.getArtists = function () {
        var _this = this;
        MpdUtils.fetchArtists().then(function (artists) {
            _this.dispatch(artists);
        }).catch(function () {
            console.log('error');
        });
    };
    MpdActions.prototype.getAlbums = function (artist) {
        var _this = this;
        MpdUtils.fetchAlbums(artist).then(function (albums) {
            _this.dispatch(albums);
        }).catch(function () {
            console.log('error');
        });
    };
    MpdActions.prototype.getSongs = function (artist, album) {
        var _this = this;
        MpdUtils.fetchSongs(artist, album).then(function (songs) {
            _this.dispatch(songs);
        }).catch(function () {
            console.log('error');
        });
    };
    MpdActions.prototype.addArtist = function (artist) {
        MpdUtils.addArtist(artist);
    };
    MpdActions.prototype.addAlbum = function (artist, album) {
        MpdUtils.addAlbum(artist, album);
    };
    MpdActions.prototype.addSong = function (artist, album, song) {
        MpdUtils.addSong(artist, album, song);
    };
    return MpdActions;
})(AbstractActions);
module.exports = alt.createActions(MpdActions);

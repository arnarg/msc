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
        MpdUtils.playSong(data.id).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.removeSong = function (data) {
        var _this = this;
        MpdUtils.removeSong(data.id).then(function () {
            _this.dispatch();
        }).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.updatePlaylist = function () {
        var _this = this;
        MpdUtils.fetchPlaylist().then(function (playlist) {
            _this.dispatch(playlist);
        }).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.getArtists = function () {
        var _this = this;
        MpdUtils.fetchArtists().then(function (artists) {
            _this.dispatch(artists);
        }).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.getAlbums = function (artist) {
        var _this = this;
        MpdUtils.fetchAlbums(artist).then(function (albums) {
            _this.dispatch(albums);
        }).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.getSongs = function (artist, album) {
        var _this = this;
        MpdUtils.fetchSongs(artist, album).then(function (songs) {
            _this.dispatch(songs);
        }).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.addArtist = function (artist) {
        var _this = this;
        MpdUtils.addArtist(artist).then(function () {
            _this.dispatch();
        }).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.addAlbum = function (artist, album) {
        var _this = this;
        MpdUtils.addAlbum(artist, album).then(function () {
            _this.dispatch();
        }).catch(function (e) {
            console.log(e);
        });
    };
    MpdActions.prototype.addSong = function (artist, album, song) {
        var _this = this;
        MpdUtils.addSong(artist, album, song).then(function () {
            _this.dispatch();
        }).catch(function (e) {
            console.log(e);
        });
    };
    return MpdActions;
})(AbstractActions);
module.exports = alt.createActions(MpdActions);

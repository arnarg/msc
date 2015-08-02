/// <reference path="../typings/playlist.d.ts" />
var ipc = require('ipc');
var MpdUtils = {
    fetchArtists: function () {
        return new Promise(function (resolve, reject) {
            ipc.on('artists', function (artists) {
                resolve(artists);
            });
            ipc.send('get-artists');
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    fetchAlbums: function (artist) {
        return new Promise(function (resolve, reject) {
            ipc.on('albums', function (albums) {
                resolve(albums);
            });
            ipc.send('get-albums', { artist: artist });
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    fetchSongs: function (artist, album) {
        return new Promise(function (resolve, reject) {
            ipc.on('songs', function (songs) {
                resolve(songs);
            });
            ipc.send('get-songs', { artist: artist, album: album });
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    fetchPlaylist: function () {
        return new Promise(function (resolve, reject) {
            ipc.on('playlist', function (playlist) {
                resolve(playlist);
            });
            ipc.send('get-playlist');
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    playSong: function (id) {
        ipc.send('play-song', id);
    },
    removeSong: function (id) {
        ipc.send('remove-song', id);
    },
    addArtist: function (artist) {
        ipc.send('add-artist', { artist: artist });
    },
    addAlbum: function (artist, album) {
        ipc.send('add-album', { artist: artist, album: album });
    },
    addSong: function (artist, album, song) {
        ipc.send('add-song', { artist: artist, album: album, song: song });
    }
};
module.exports = MpdUtils;

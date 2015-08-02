/// <reference path="../typings/playlist.d.ts" />
var ipc = require('ipc');
var MpdUtils = {
    id: 0,
    fetchArtists: function () {
        return new Promise(function (resolve, reject) {
            ipc.once('artists', function (artists) {
                resolve(artists);
            });
            ipc.send('get-artists');
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    fetchAlbums: function (artist) {
        return new Promise(function (resolve, reject) {
            ipc.once('albums', function (albums) {
                resolve(albums);
            });
            ipc.send('get-albums', { artist: artist });
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    fetchSongs: function (artist, album) {
        return new Promise(function (resolve, reject) {
            ipc.once('songs', function (songs) {
                resolve(songs);
            });
            ipc.send('get-songs', { artist: artist, album: album });
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    fetchPlaylist: function () {
        return new Promise(function (resolve, reject) {
            ipc.once('playlist', function (playlist) {
                resolve(playlist);
            });
            ipc.send('get-playlist');
            setTimeout(function () { return reject(); }, 2000);
        });
    },
    sendCommand: function (cmd) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var command = {
                id: _this.id++,
                command: cmd
            };
            ipc.once('cmd ' + command.id, function (status) {
                if (status === 'OK')
                    resolve();
                else
                    reject(status);
            });
            ipc.send('mpd-command', command);
        });
    },
    playSong: function (id) {
        return this.sendCommand('playid ' + id);
    },
    removeSong: function (id) {
        return this.sendCommand('deleteid ' + id);
    },
    addArtist: function (artist) {
        return this.sendCommand('findadd artist "' + artist + '"');
    },
    addAlbum: function (artist, album) {
        return this.sendCommand('findadd album "' + album + '" artist "' + artist + '"');
    },
    addSong: function (artist, album, song) {
        return this.sendCommand('findadd title "' + song +
            '" album "' + album +
            '" artist "' + artist + '"');
    }
};
module.exports = MpdUtils;

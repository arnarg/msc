var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var $ = require('jquery');
var LibraryItem = require('./LibraryItem');
var BackBtn = require('./BackBtn');
var MpdActions = require('../actions/MpdActions');
var Songs = (function (_super) {
    __extends(Songs, _super);
    function Songs() {
        this._onClick = this._onClick.bind(this);
        _super.call(this);
    }
    Songs.prototype.render = function () {
        var songs = [];
        this.props.songs.songs.forEach(function (song, i) {
            songs.push(React.createElement(LibraryItem, {"item": song, "key": i, "showArrow": false}));
        });
        return (React.createElement("ul", {"className": 'list songs'}, React.createElement(BackBtn, {"back": this._onBack}), songs));
    };
    Songs.prototype.componentDidMount = function () {
        $('.songs').click(this._onClick);
    };
    Songs.prototype._onClick = function () {
        var elem = $(event.target);
        var itemID = elem.closest('li').data('id');
        if (elem.hasClass('fa-plus')) {
            MpdActions.addSong(this.props.songs.artist, this.props.songs.album, itemID);
        }
    };
    Songs.prototype._onBack = function () {
        this.props._up();
        MpdActions.getAlbums(this.props.songs.artist);
    };
    return Songs;
})(React.Component);
module.exports = Songs;

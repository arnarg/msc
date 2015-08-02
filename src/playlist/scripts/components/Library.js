var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var MpdActions = require('../actions/MpdActions');
var Artists = require('./Artists');
var Albums = require('./Albums');
var Songs = require('./Songs');
var Page;
(function (Page) {
    Page[Page["ARTISTS"] = 0] = "ARTISTS";
    Page[Page["ALBUMS"] = 1] = "ALBUMS";
    Page[Page["SONGS"] = 2] = "SONGS";
})(Page || (Page = {}));
var Library = (function (_super) {
    __extends(Library, _super);
    function Library() {
        this.activePage = Page.ARTISTS;
        this._up = this._up.bind(this);
        this._down = this._down.bind(this);
        MpdActions.getArtists();
        _super.call(this);
    }
    Library.prototype.render = function () {
        switch (this.activePage) {
            case Page.ARTISTS:
                return (React.createElement(Artists, {"artists": this.props.library.artists, "_down": this._down}));
                break;
            case Page.ALBUMS:
                return (React.createElement(Albums, {"albums": this.props.library.albums, "_up": this._up, "_down": this._down}));
                break;
            case Page.SONGS:
                return (React.createElement(Songs, {"songs": this.props.library.songs, "_up": this._up}));
                break;
        }
    };
    Library.prototype._up = function () {
        if (this.activePage > Page.ARTISTS)
            this.activePage--;
    };
    Library.prototype._down = function () {
        if (this.activePage < Page.SONGS)
            this.activePage++;
    };
    return Library;
})(React.Component);
module.exports = Library;

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
var Albums = (function (_super) {
    __extends(Albums, _super);
    function Albums() {
        this._onClick = this._onClick.bind(this);
        this._onBack = this._onBack.bind(this);
        _super.call(this);
    }
    Albums.prototype.render = function () {
        var albums = [];
        this.props.albums.albums.forEach(function (artist, i) {
            albums.push(React.createElement(LibraryItem, {"item": artist, "key": i, "showArrow": true}));
        });
        return (React.createElement("ul", {"className": 'list albums'}, React.createElement(BackBtn, {"back": this._onBack}), albums));
    };
    Albums.prototype.componentDidMount = function () {
        $('.albums').click(this._onClick);
    };
    Albums.prototype._onClick = function () {
        var elem = $(event.target);
        var itemID = elem.closest('li').data('id');
        if (elem.hasClass('fa-plus')) {
            MpdActions.addAlbum(this.props.albums.artist, itemID.toString());
        }
        else if (elem.hasClass('fa-chevron-right')) {
            this.props._down();
            MpdActions.getSongs(this.props.albums.artist, itemID.toString());
        }
    };
    Albums.prototype._onBack = function () {
        this.props._up();
        MpdActions.getArtists();
    };
    return Albums;
})(React.Component);
module.exports = Albums;

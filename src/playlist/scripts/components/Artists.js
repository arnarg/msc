var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var $ = require('jquery');
var LibraryItem = require('./LibraryItem');
var MpdActions = require('../actions/MpdActions');
var Artists = (function (_super) {
    __extends(Artists, _super);
    function Artists() {
        this._onClick = this._onClick.bind(this);
        _super.call(this);
    }
    Artists.prototype.render = function () {
        var artists = [];
        this.props.artists.forEach(function (artist, i) {
            artists.push(React.createElement(LibraryItem, {"item": artist, "key": i, "showArrow": true}));
        });
        return (React.createElement("ul", {"className": 'list artists'}, artists));
    };
    Artists.prototype.componentDidMount = function () {
        $('.artists').click(this._onClick);
    };
    Artists.prototype._onClick = function () {
        var elem = $(event.target);
        var itemID = elem.closest('li').data('id');
        if (elem.hasClass('fa-plus')) {
            MpdActions.addArtist(itemID.toString());
        }
        else if (elem.hasClass('fa-chevron-right')) {
            this.props._down();
            MpdActions.getAlbums(itemID.toString());
        }
    };
    return Artists;
})(React.Component);
module.exports = Artists;

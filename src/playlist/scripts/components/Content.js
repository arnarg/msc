var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Playlist = require('./Playlist');
var Library = require('./Library');
var Content = (function (_super) {
    __extends(Content, _super);
    function Content() {
        _super.apply(this, arguments);
    }
    Content.prototype.render = function () {
        var component;
        if (this.props.activeTab === 0) {
            component = React.createElement(Playlist, {"playlist": this.props.playlist});
        }
        else if (this.props.activeTab === 1) {
            component = React.createElement(Library, {"library": this.props.library});
        }
        return (React.createElement("div", {"className": 'main'}, component));
    };
    return Content;
})(React.Component);
module.exports = Content;

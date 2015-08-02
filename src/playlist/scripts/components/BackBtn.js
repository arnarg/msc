var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var $ = require('jquery');
var BackBtn = (function (_super) {
    __extends(BackBtn, _super);
    function BackBtn() {
        this._onClick = this._onClick.bind(this);
        _super.call(this);
    }
    BackBtn.prototype.render = function () {
        return (React.createElement("li", {"className": 'backBtn'}, React.createElement("div", {"className": 'backText'}, React.createElement("i", {"className": 'fa fa-ellipsis-h'}))));
    };
    BackBtn.prototype.componentDidMount = function () {
        $('.backBtn').click(this._onClick);
    };
    BackBtn.prototype._onClick = function (event) {
        event.stopPropagation();
        this.props.back();
    };
    return BackBtn;
})(React.Component);
module.exports = BackBtn;

/// <reference path="../typings/playlist.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var alt = require('../alt');
var AbstractActions = require('./AbstractActions');
var TabActions = (function (_super) {
    __extends(TabActions, _super);
    function TabActions() {
        _super.apply(this, arguments);
    }
    TabActions.prototype.selectTab = function (id) {
        this.dispatch(id);
    };
    return TabActions;
})(AbstractActions);
module.exports = alt.createActions(TabActions);

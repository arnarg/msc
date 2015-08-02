/// <reference path="../typings/playlist.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var alt = require('../alt');
var TabActions = require('../actions/TabActions');
var AbstractStoreModel = require('./AbstractStoreModel');
var TabStore = (function (_super) {
    __extends(TabStore, _super);
    function TabStore() {
        _super.call(this);
        this.activeTab = 0;
        this.tabs = [
            {
                id: 0,
                icon: 'fa fa-list',
                title: 'Playlist'
            },
            {
                id: 1,
                icon: 'fa fa-music',
                title: 'Library'
            }
        ];
        this.bindActions(TabActions);
    }
    TabStore.prototype.onSelectTab = function (id) {
        if (id >= 0 && id < this.tabs.length) {
            this.activeTab = id;
        }
    };
    return TabStore;
})(AbstractStoreModel);
module.exports = alt.createStore(TabStore, 'TabStore');

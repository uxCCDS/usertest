import Vue from 'vue';
import Vuex from 'vuex';

import Store from '../data/data.js';

import Desktop from '../vue/desktop.vue';
import Signin from '../vue/signin.vue';
import MainClient from '../vue/mainclient.vue';
import ConTop from '../vue/con-top.vue';
import ConMain from '../vue/con-main.vue';
import ConPanel from '../vue/con-panel.vue';
import Splitter from '../vue/splitter.vue';
import VideoItem from '../vue/video-item.vue';
import SelfVideo from '../vue/self-video.vue';
import Controls from '../vue/controls.vue';
import Poptip from '../vue/poptip.vue';
import PopmenuPanel from '../vue/popmenu-panel.vue';
import PopmenuMore from '../vue/popmenu-more.vue';
import PopmenuSwitchSharing from '../vue/popmenu-switchsharing.vue';
import PopInfo from '../vue/pop-info.vue';
import PopAudio from '../vue/pop-audio.vue';
import PopVideo from '../vue/pop-video.vue';
import PopAVConnection from '../vue/pop-avconnection.vue';
import PopShare from '../vue/pop-share.vue';
import PopRecord from '../vue/pop-record.vue';
import PopLockPeople from '../vue/pop-lockpeople.vue';
import PanelHeader from '../vue/panel-header.vue';
import PanelPlist from '../vue/panel-plist.vue';
import PanelChat from '../vue/panel-chat.vue';
import PlistItem from '../vue/plist-item.vue';
import ChatItem from '../vue/chat-item.vue';
import LockPeopleItem from '../vue/lockpeople-item.vue';

import SvgIcoActivespeaker from '../vue/svg-ico-activespeaker.vue';
import SvgIcoFullscreen from '../vue/svg-ico-fullscreen.vue';
import SvgIcoGrid from '../vue/svg-ico-grid.vue';
import SvgIcoInfo from '../vue/svg-ico-info.vue';
import SvgIcoPanel from '../vue/svg-ico-panel.vue';
import SvgIcoSidebyside from '../vue/svg-ico-sidebyside.vue';
import SvgIcoStrip from '../vue/svg-ico-strip.vue';
import SvgIcoStripBot from '../vue/svg-ico-strip-bot.vue';
import SvgIcoPlist from '../vue/svg-ico-plist.vue';
import SvgIcoChat from '../vue/svg-ico-chat.vue';
import SvgIcoNotes from '../vue/svg-ico-notes.vue';
import SvgIcoPolling from '../vue/svg-ico-polling.vue';
import SvgIcoMultimedia from '../vue/svg-ico-multimedia.vue';
import SvgIcoTools from '../vue/svg-ico-tools.vue';
import SvgIcoRemote from '../vue/svg-ico-remote.vue';
import SvgIcoSwitchFloating from '../vue/svg-ico-switch-floating.vue';
import SvgIcoFloatingCls from '../vue/svg-ico-floating-cls.vue';
import SvgIcoPin from '../vue/svg-ico-pin.vue';

Vue.component('desktop',Desktop);
Vue.component('Signin',Signin);
Vue.component('mainclient',MainClient);
Vue.component('con-top',ConTop);
Vue.component('con-main',ConMain);
Vue.component('con-panel',ConPanel);
Vue.component('splitter',Splitter);
Vue.component('video-item',VideoItem);
Vue.component('self-video',SelfVideo);
Vue.component('controls',Controls);
Vue.component('poptip',Poptip);
Vue.component('popmenu-panel',PopmenuPanel);
Vue.component('popmenu-more',PopmenuMore);
Vue.component('popmenu-switchsharing',PopmenuSwitchSharing);
Vue.component('pop-info',PopInfo);
Vue.component('pop-audio',PopAudio);
Vue.component('pop-video',PopVideo);
Vue.component('pop-avconnection',PopAVConnection);
Vue.component('pop-share',PopShare);
Vue.component('pop-record',PopRecord);
Vue.component('pop-lockpeople',PopLockPeople);
Vue.component('panel-header',PanelHeader);
Vue.component('panel-plist',PanelPlist);
Vue.component('panel-chat',PanelChat);
Vue.component('plist-item',PlistItem);
Vue.component('chat-item',ChatItem);
Vue.component('lockpeople-item',LockPeopleItem);

Vue.component('svg-ico-activespeaker',SvgIcoActivespeaker);
Vue.component('svg-ico-fullscreen',SvgIcoFullscreen);
Vue.component('svg-ico-grid',SvgIcoGrid);
Vue.component('svg-ico-info',SvgIcoInfo);
Vue.component('svg-ico-panel',SvgIcoPanel);
Vue.component('svg-ico-sidebyside',SvgIcoSidebyside);
Vue.component('svg-ico-strip',SvgIcoStrip);
Vue.component('svg-ico-strip-bot',SvgIcoStripBot);
Vue.component('svg-ico-plist',SvgIcoPlist);
Vue.component('svg-ico-chat',SvgIcoChat);
Vue.component('svg-ico-notes',SvgIcoNotes);
Vue.component('svg-ico-polling',SvgIcoPolling);
Vue.component('svg-ico-multimedia',SvgIcoMultimedia);
Vue.component('svg-ico-tools',SvgIcoTools);
Vue.component('svg-ico-remote',SvgIcoRemote);
Vue.component('svg-ico-switch-floating',SvgIcoSwitchFloating);
Vue.component('svg-ico-floating-cls',SvgIcoFloatingCls);
Vue.component('svg-ico-pin',SvgIcoPin);

Vue.use(Vuex);
const store = new Vuex.Store(Store);

// tooltip
import Tooltip from 'vue-directive-tooltip';
Vue.use(Tooltip, {
    delay: 0,
    placement: 'auto',
    triggers: ['hover', 'click'],
    offset: 0
});


const vm = new Vue({ store }); 

window.onload = function() {
	vm.$mount('#app');
};

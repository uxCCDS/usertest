/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	state: {
		inMeeting: false,
		videoLayoutMode: 'strip', //strip, grid, active-speaker, side-by-side, fullscreen
		videoFloatingLayoutMode: null, //strip, grid, active-speaker
		videoSharingSwitched: false, //in sharing mode. switch floating video/sharing content
		floatingCollapsed: false,
		videoLayoutPrepareMode: 'strip',
		audioConnected: false,
		videoConnected: false,
		muted: false,
		cameraOn: true,
		lockedPeopleName: null,
		meetingTitle: 'WebEx Zero Kick Off Meeting',
		activeSpeakerName: 'Adrian Delamico',
		headerHeight: 60,
		fullscreen: false,
		recording: false,
		recordingTime: 0,
		locked: false,
		currentSharing: null, // doc, screen
		popStartPoint: [0, 0],
		poptipVisible: false,
		poptipText: null,
		popmenuPanelVisible: false,
		popmenuMoreVisible: false,
		popInfoVisible: false,
		popRecordVisible: false,
		popAudioVisible: false,
		popVideoVisible: false,
		popAVConnectionVisible: false,
		popShareVisible: false,
		popLockPeopleVisible: false,
		popmenuSwitchSharingVisible: false,
		rightPanelMinWidth: 220,
		rightPanelMaxWidth: 795,
		rightPanelContentWidth: 320,
		rightPanelWidth: 0,
		sideBySideVideoColumn: 2,
		panelVisible: false,
		plistPanelVisible: false,
		plistPanelClsed: false,
		chatPanelVisible: false,
		chatPanelClsed: false,
		notesPanelVisible: false,
		annotationToolsVisible: false,
		docThumbsVisible: false,
		floatVideoOriSize: [120, 68],
		floatVideoSize: [120, 68],
		peopleList: [{
			name: 'Alison Cassidy',
			me: true,
			avatar: 'me.png',
			video: null,
			audio: 'pc',
			muted: false
		}],
		peopleNotJoinedList: [{
			name: 'Adrian Delamico',
			host: true,
			avatar: '1.png',
			video: '1.mp4',
			audio: 'pc',
			muted: false
		}, {
			name: 'Catherine Sinu',
			avatar: '2.png',
			video: '2.mp4',
			audio: 'pc',
			muted: true
		}, {
			name: 'Sherry Mckenna',
			avatar: '3.png',
			video: '3.mp4',
			audio: 'pc',
			muted: false
		}, {
			name: 'Brenda Song',
			avatar: '4.png',
			video: '4.mp4',
			audio: 'pc',
			muted: false
		}, {
			name: 'Elizabeth Wu',
			avatar: null,
			video: '5.mp4',
			audio: 'phone',
			muted: true
		}, {
			name: 'Barbara German',
			avatar: null,
			video: '6.mp4',
			audio: 'pc',
			muted: false
		}, {
			name: 'Emma Hirst',
			avatar: '7.png',
			video: null,
			audio: 'mobile',
			muted: false
		}, {
			name: 'Giacomo Edwards',
			avatar: null,
			video: null,
			audio: 'pc',
			muted: false
		}],
		chatMsgList: [
			/*
   {
                name: 'Emma Hirst',
                to: 'everyone',
                msg: 'Just a heads up to everyone, the new roadmap for the upcoming quarter will be out soon',
                unread: false,
            },
            {
                name: 'Elizabeth Wu',
                to: 'you',
                msg: 'Hi, Alison~ Could you please start sharing your PowerPoint slides?',
                unread: true,
            },
   {
   	name: 'Alison Cassidy',
   	to: 'everyone',
   	msg: 'Thanks',
   	unread: false,
   }
   */
		],
		avatarPath: '../../static/webex/avatar/',
		videoPath: '../../static/webex/video/'
	},
	getters: {
		activeSpeaker(state) {
			let p = state.peopleList.find(people => people.name == state.activeSpeakerName);
			let p2 = state.peopleNotJoinedList.find(people => people.name == state.activeSpeakerName);
			if (p) {
				return p;
			} else {
				return p2;
			}
		},
		host(state) {
			let p = state.peopleList.find(people => people.host);
			let p2 = state.peopleNotJoinedList.find(people => people.host);
			if (p) {
				return p;
			} else {
				return p2;
			}
		},
		people: state => name => {
			return state.peopleList.find(people => people.name == name);
		},
		me(state) {
			return state.peopleList.find(people => people.me);
		},
		anyOpenPanel(state) {
			return state.plistPanelVisible || state.chatPanelVisible || state.notesPanelVisible;
		},
		unreadMessages(state) {
			return state.chatMsgList.filter(msg => msg.unread);
		}
	},
	mutations: {
		inMeeting(state, newVal) {
			state.inMeeting = newVal;
		},
		videoLayoutMode(state, newVal) {
			state.videoLayoutMode = newVal;
		},
		videoFloatingLayoutMode(state, newVal) {
			state.videoFloatingLayoutMode = newVal;
		},
		videoSharingSwitched(state, newVal) {
			state.videoSharingSwitched = newVal;
		},
		floatingCollapsed(state, newVal) {
			state.floatingCollapsed = newVal;
		},
		videoLayoutPrepareMode(state, newVal) {
			state.videoLayoutPrepareMode = newVal;
		},
		audioConnected(state, newVal) {
			state.audioConnected = newVal;
		},
		videoConnected(state, newVal) {
			state.videoConnected = newVal;
		},
		muted(state, newVal) {
			state.muted = newVal;
		},
		cameraOn(state, newVal) {
			state.cameraOn = newVal;
		},
		lockedPeopleName(state, newVal) {
			state.lockedPeopleName = newVal;
		},
		activeSpeakerName(state, newVal) {
			state.activeSpeakerName = newVal;
		},
		fullscreen(state, newVal) {
			state.fullscreen = newVal;
		},
		recording(state, newVal) {
			state.recording = newVal;
		},
		recordingTime(state, newVal) {
			state.recordingTime = newVal;
		},
		locked(state, newVal) {
			state.locked = newVal;
		},
		currentSharing(state, newVal) {
			state.currentSharing = newVal;
		},
		popStartPoint(state, newVal) {
			state.popStartPoint = newVal;
		},
		poptipVisible(state, newVal) {
			state.poptipVisible = newVal;
		},
		poptipText(state, newVal) {
			state.poptipText = newVal;
		},
		popmenuPanelVisible(state, newVal) {
			state.popmenuPanelVisible = newVal;
		},
		popmenuMoreVisible(state, newVal) {
			state.popmenuMoreVisible = newVal;
		},
		popInfoVisible(state, newVal) {
			state.popInfoVisible = newVal;
		},
		popRecordVisible(state, newVal) {
			state.popRecordVisible = newVal;
		},
		popAudioVisible(state, newVal) {
			state.popAudioVisible = newVal;
		},
		popVideoVisible(state, newVal) {
			state.popVideoVisible = newVal;
		},
		popAVConnectionVisible(state, newVal) {
			state.popAVConnectionVisible = newVal;
		},
		popShareVisible(state, newVal) {
			state.popShareVisible = newVal;
		},
		popLockPeopleVisible(state, newVal) {
			state.popLockPeopleVisible = newVal;
		},
		popmenuSwitchSharingVisible(state, newVal) {
			state.popmenuSwitchSharingVisible = newVal;
		},
		rightPanelContentWidth(state, newVal) {
			state.rightPanelContentWidth = newVal;
		},
		rightPanelWidth(state, newVal) {
			state.rightPanelWidth = newVal;
		},
		sideBySideVideoColumn(state, newVal) {
			state.sideBySideVideoColumn = newVal;
		},
		panelVisible(state, newVal) {
			state.panelVisible = newVal;
		},
		plistPanelVisible(state, newVal) {
			state.plistPanelVisible = newVal;
		},
		plistPanelClsed(state, newVal) {
			state.plistPanelClsed = newVal;
		},
		chatPanelVisible(state, newVal) {
			state.chatPanelVisible = newVal;
		},
		chatPanelClsed(state, newVal) {
			state.chatPanelClsed = newVal;
		},
		notesPanelVisible(state, newVal) {
			state.notesPanelVisible = newVal;
		},
		annotationToolsVisible(state, newVal) {
			state.annotationToolsVisible = newVal;
		},
		docThumbsVisible(state, newVal) {
			state.docThumbsVisible = newVal;
		},
		peopleList(state, newVal) {
			state.peopleList = newVal;
		},
		peopleNotJoinedList(state, newVal) {
			state.peopleNotJoinedList = newVal;
		},
		chatMsgList(state, newVal) {
			state.chatMsgList = newVal;
		},
		floatVideoSize(state, newVal) {
			state.floatVideoSize = newVal;
		}
	}

});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(136)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(184),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7f4e62e4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/chat-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] chat-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f4e62e4", Component.options)
  } else {
    hotAPI.reload("data-v-7f4e62e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(116)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(165),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-40381150",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/con-main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] con-main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40381150", Component.options)
  } else {
    hotAPI.reload("data-v-40381150", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(122)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(171),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-54567016",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/con-panel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] con-panel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54567016", Component.options)
  } else {
    hotAPI.reload("data-v-54567016", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(100)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(56),
  /* template */
  __webpack_require__(149),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0d8df106",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/con-top.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] con-top.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d8df106", Component.options)
  } else {
    hotAPI.reload("data-v-0d8df106", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(107)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(156),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1f7e442c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/controls.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] controls.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f7e442c", Component.options)
  } else {
    hotAPI.reload("data-v-1f7e442c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(108)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(157),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-25734198",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/desktop.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] desktop.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25734198", Component.options)
  } else {
    hotAPI.reload("data-v-25734198", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(59),
  /* template */
  __webpack_require__(151),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-107e5602",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/lockpeople-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] lockpeople-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-107e5602", Component.options)
  } else {
    hotAPI.reload("data-v-107e5602", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(119)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(60),
  /* template */
  __webpack_require__(168),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4ad073f8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/mainclient.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mainclient.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ad073f8", Component.options)
  } else {
    hotAPI.reload("data-v-4ad073f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(101)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(61),
  /* template */
  __webpack_require__(150),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0dd21035",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/panel-chat.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] panel-chat.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0dd21035", Component.options)
  } else {
    hotAPI.reload("data-v-0dd21035", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(148),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0d6180ac",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/panel-header.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] panel-header.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d6180ac", Component.options)
  } else {
    hotAPI.reload("data-v-0d6180ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(134)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(63),
  /* template */
  __webpack_require__(182),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7ca50701",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/panel-plist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] panel-plist.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ca50701", Component.options)
  } else {
    hotAPI.reload("data-v-7ca50701", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(118)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(64),
  /* template */
  __webpack_require__(167),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-436a02b4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/plist-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] plist-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-436a02b4", Component.options)
  } else {
    hotAPI.reload("data-v-436a02b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(137)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(65),
  /* template */
  __webpack_require__(185),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7fd9dad6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/pop-audio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pop-audio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7fd9dad6", Component.options)
  } else {
    hotAPI.reload("data-v-7fd9dad6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(66),
  /* template */
  __webpack_require__(178),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-67819183",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/pop-avconnection.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pop-avconnection.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-67819183", Component.options)
  } else {
    hotAPI.reload("data-v-67819183", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(67),
  /* template */
  __webpack_require__(162),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-37981bde",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/pop-info.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pop-info.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37981bde", Component.options)
  } else {
    hotAPI.reload("data-v-37981bde", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(110)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(159),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2de68aaa",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/pop-lockpeople.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pop-lockpeople.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2de68aaa", Component.options)
  } else {
    hotAPI.reload("data-v-2de68aaa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(120)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(69),
  /* template */
  __webpack_require__(169),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4d761401",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/pop-record.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pop-record.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d761401", Component.options)
  } else {
    hotAPI.reload("data-v-4d761401", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(104)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(70),
  /* template */
  __webpack_require__(153),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1656625f",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/pop-share.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pop-share.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1656625f", Component.options)
  } else {
    hotAPI.reload("data-v-1656625f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(131)
  __webpack_require__(132)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(71),
  /* template */
  __webpack_require__(180),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-77d50e0a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/pop-video.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pop-video.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-77d50e0a", Component.options)
  } else {
    hotAPI.reload("data-v-77d50e0a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(111)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(72),
  /* template */
  __webpack_require__(160),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-33f4c1f4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/popmenu-more.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] popmenu-more.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33f4c1f4", Component.options)
  } else {
    hotAPI.reload("data-v-33f4c1f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(106)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(73),
  /* template */
  __webpack_require__(155),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-18db2a23",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/popmenu-panel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] popmenu-panel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18db2a23", Component.options)
  } else {
    hotAPI.reload("data-v-18db2a23", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(103)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(74),
  /* template */
  __webpack_require__(152),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-12042372",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/popmenu-switchsharing.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] popmenu-switchsharing.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12042372", Component.options)
  } else {
    hotAPI.reload("data-v-12042372", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(123)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(75),
  /* template */
  __webpack_require__(172),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-551454de",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/poptip.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] poptip.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-551454de", Component.options)
  } else {
    hotAPI.reload("data-v-551454de", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(138)
  __webpack_require__(139)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(76),
  /* template */
  __webpack_require__(186),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-82b66624",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/self-video.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] self-video.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-82b66624", Component.options)
  } else {
    hotAPI.reload("data-v-82b66624", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(77),
  /* template */
  __webpack_require__(174),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-582c3054",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/signin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] signin.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-582c3054", Component.options)
  } else {
    hotAPI.reload("data-v-582c3054", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(144)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(78),
  /* template */
  __webpack_require__(191),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-f604850a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/splitter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] splitter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f604850a", Component.options)
  } else {
    hotAPI.reload("data-v-f604850a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(79),
  /* template */
  __webpack_require__(181),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7886ae54",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-activespeaker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-activespeaker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7886ae54", Component.options)
  } else {
    hotAPI.reload("data-v-7886ae54", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(128)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(80),
  /* template */
  __webpack_require__(177),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5fbd6ee6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-chat.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-chat.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5fbd6ee6", Component.options)
  } else {
    hotAPI.reload("data-v-5fbd6ee6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(112)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(81),
  /* template */
  __webpack_require__(161),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-36669598",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-floating-cls.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-floating-cls.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36669598", Component.options)
  } else {
    hotAPI.reload("data-v-36669598", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(105)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(82),
  /* template */
  __webpack_require__(154),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-18291db0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-fullscreen.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-fullscreen.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18291db0", Component.options)
  } else {
    hotAPI.reload("data-v-18291db0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(142)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(83),
  /* template */
  __webpack_require__(189),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e52ccd0a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-grid.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-grid.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e52ccd0a", Component.options)
  } else {
    hotAPI.reload("data-v-e52ccd0a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(143)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(84),
  /* template */
  __webpack_require__(190),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-f5e1023a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-info.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-info.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f5e1023a", Component.options)
  } else {
    hotAPI.reload("data-v-f5e1023a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(141)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(85),
  /* template */
  __webpack_require__(188),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-92185f80",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-multimedia.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-multimedia.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-92185f80", Component.options)
  } else {
    hotAPI.reload("data-v-92185f80", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(117)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(86),
  /* template */
  __webpack_require__(166),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-414a1ddc",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-notes.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-notes.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-414a1ddc", Component.options)
  } else {
    hotAPI.reload("data-v-414a1ddc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(135)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(87),
  /* template */
  __webpack_require__(183),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7dba7f9f",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-panel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-panel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7dba7f9f", Component.options)
  } else {
    hotAPI.reload("data-v-7dba7f9f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(114)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(88),
  /* template */
  __webpack_require__(163),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3c014920",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-pin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-pin.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c014920", Component.options)
  } else {
    hotAPI.reload("data-v-3c014920", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(98)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(89),
  /* template */
  __webpack_require__(147),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-043cd9a9",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-plist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-plist.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-043cd9a9", Component.options)
  } else {
    hotAPI.reload("data-v-043cd9a9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(126)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(90),
  /* template */
  __webpack_require__(175),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5d6685c4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-polling.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-polling.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d6685c4", Component.options)
  } else {
    hotAPI.reload("data-v-5d6685c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(109)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(91),
  /* template */
  __webpack_require__(158),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2ce4533b",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-remote.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-remote.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ce4533b", Component.options)
  } else {
    hotAPI.reload("data-v-2ce4533b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(127)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(92),
  /* template */
  __webpack_require__(176),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5e7d198c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-sidebyside.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-sidebyside.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e7d198c", Component.options)
  } else {
    hotAPI.reload("data-v-5e7d198c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(124)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(93),
  /* template */
  __webpack_require__(173),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-57756ead",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-strip-bot.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-strip-bot.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57756ead", Component.options)
  } else {
    hotAPI.reload("data-v-57756ead", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(130)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(94),
  /* template */
  __webpack_require__(179),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6a3a629a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-strip.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-strip.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a3a629a", Component.options)
  } else {
    hotAPI.reload("data-v-6a3a629a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(115)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(95),
  /* template */
  __webpack_require__(164),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3c6e46da",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-switch-floating.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-switch-floating.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c6e46da", Component.options)
  } else {
    hotAPI.reload("data-v-3c6e46da", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(140)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(96),
  /* template */
  __webpack_require__(187),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-83510814",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/svg-ico-tools.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] svg-ico-tools.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-83510814", Component.options)
  } else {
    hotAPI.reload("data-v-83510814", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(121)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(97),
  /* template */
  __webpack_require__(170),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4d8b6dd9",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/cisco/Github/WebExClient/vue/video-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] video-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d8b6dd9", Component.options)
  } else {
    hotAPI.reload("data-v-4d8b6dd9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.11
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      if (process.env.NODE_ENV !== 'production' && isPlainObject(val)) {
        validatePropObject(name, val, vm);
      }
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Validate whether a prop object keys are valid.
 */
var propOptionsRE = /^(type|default|required|validator)$/;

function validatePropObject (
  propName,
  prop,
  vm
) {
  for (var key in prop) {
    if (!propOptionsRE.test(key)) {
      warn(
        ("Invalid key \"" + key + "\" in validation rules object for prop \"" + propName + "\"."),
        vm
      );
    }
  }
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production' && inject) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.11';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$1 = 0; i$1 < postTransforms.length; i$1++) {
        postTransforms[i$1](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim().replace(stripParensRE, '');
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = alias.replace(forIteratorRE, '');
      el.iterator1 = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        el.iterator2 = iteratorMatch[2].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1), __webpack_require__(2), __webpack_require__(146).setImmediate))

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vueDirectiveTooltip = factory());
}(this, (function () { 'use strict';

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var nativeHints = ['native code', '[object MutationObserverConstructor]'];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @method
 * @memberof Popper.Utils
 * @argument {Function | undefined} fn the function to check
 * @returns {Boolean}
 */
var isNative = function isNative(fn) {
  return nativeHints.some(function (hint) {
    return (fn || '').toString().indexOf(hint) > -1;
  });
};

var isBrowser = typeof window !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var scheduled = false;
  var i = 0;
  var elem = document.createElement('span');

  // MutationObserver provides a mechanism for scheduling microtasks, which
  // are scheduled *before* the next task. This gives us a way to debounce
  // a function but ensure it's called *before* the next paint.
  var observer = new MutationObserver(function () {
    fn();
    scheduled = false;
  });

  observer.observe(elem, { attributes: true });

  return function () {
    if (!scheduled) {
      scheduled = true;
      elem.setAttribute('x-index', i);
      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
    }
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
    return window.document.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return window.document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return window.document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = window.document.documentElement;
    var scrollingElement = window.document.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function isIE10$1() {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var computedStyle = isIE10$1() && window.getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) { descriptor.writable = true; }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) { defineProperties(Constructor.prototype, protoProps); }
    if (staticProps) { defineProperties(Constructor, staticProps); }
    return Constructor;
  };
}();

var defineProperty = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$1 = Object.assign || function (target) {
  var arguments$1 = arguments;

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$1({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = +styles.marginTop.split('px')[0];
    var marginLeft = +styles.marginLeft.split('px')[0];

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = window.document.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(popper));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = window.document.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = window.document.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$1({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier.function) {
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier.function || modifier.fn;
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update$1() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length - 1; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? window : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  window.addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  window.removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    window.cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$1({}, attributes, data.attributes);
  data.styles = _extends$1({}, styles, data.styles);
  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var popperMarginSide = getStyleComputedProperty(data.instance.popper, 'margin' + sideCapitalized).replace('px', '');
  var sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = {};
  data.offsets.arrow[side] = Math.round(sideValue);
  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$1({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$1({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference.jquery ? reference[0] : reference;
    this.popper = popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$1({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update$1.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */

Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

var _extends = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE_CLASS$1 = 'h-tooltip';
var PLACEMENT = ['top', 'left', 'right', 'bottom', 'auto'];
var SUB_PLACEMENT = ['start', 'end'];

var EVENTS = {
    ADD: 1,
    REMOVE: 2
};

var DEFAULT_OPTIONS = {
    container: false,
    delay: 200,
    instance: null, // the popper.js instance
    eventsEnabled: true,
    html: false,
    modifiers: {
        arrow: {
            element: '.tooltip-arrow'
        }
    },
    placement: '',
    placementPostfix: null, // start | end
    removeOnDestroy: true,
    title: '',
    class: '', // ex: 'tooltip-custom tooltip-other-custom'
    triggers: ['hover', 'focus'],
    offset: 5
};

var includes = function includes(stack, needle) {
    return stack.indexOf(needle) > -1;
};

var Tooltip$2 = function () {
    function Tooltip(el) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Tooltip);

        // Tooltip._defaults = DEFAULT_OPTIONS;
        this._options = _extends({}, Tooltip._defaults, {
            onCreate: function onCreate(data) {
                _this.content(_this.tooltip.options.title);
                _this._$tt.update();
            },
            onUpdate: function onUpdate(data) {
                _this.content(_this.tooltip.options.title);
                _this._$tt.update();
            }
        }, Tooltip.filterOptions(options));

        var $tpl = this._createTooltipElement(this.options);
        document.querySelector('body').appendChild($tpl);

        this._$el = el;
        this._$tt = new Popper(el, $tpl, this._options);
        this._$tpl = $tpl;
        this._disabled = false;
        this._visible = false;
        this._clearDelay = null;
        this._setEvents();
        // this._$tt.disableEventListeners();
    }

    Tooltip.prototype.destroy = function destroy() {
        this._cleanEvents();
        document.querySelector('body').removeChild(this._$tpl);
    };

    Tooltip.prototype._createTooltipElement = function _createTooltipElement(options) {
        // wrapper
        var $popper = document.createElement('div');
        $popper.setAttribute('id', 'tooltip-' + randomId());
        $popper.setAttribute('class', BASE_CLASS$1 + ' ' + this._options.class);
        $popper.style.display = 'none';

        // make arrow
        var $arrow = document.createElement('div');
        $arrow.setAttribute('class', 'tooltip-arrow');
        $arrow.setAttribute('x-arrow', '');
        $popper.appendChild($arrow);

        // make content container
        var $content = document.createElement('div');
        $content.setAttribute('class', 'tooltip-content');
        $popper.appendChild($content);

        return $popper;
    };

    Tooltip.prototype._events = function _events() {
        var _this2 = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EVENTS.ADD;

        var evtType = type === EVENTS.ADD ? 'addEventListener' : 'removeEventListener';
        if (!Array.isArray(this.options.triggers)) {
            console.error('trigger should be an array', this.options.triggers);
            return;
        }

        var lis = function lis() {
            var _$el;

            return (_$el = _this2._$el)[evtType].apply(_$el, arguments);
        };

        if (includes(this.options.triggers, 'manual')) {
            lis('click', this._onToggle.bind(this), false);
        } else {
            this.options.triggers.map(function (evt) {
                switch (evt) {
                    case 'click':
                        lis('click', _this2._onToggle.bind(_this2), false);
                        document[evtType]('click', _this2._onDeactivate.bind(_this2), false);
                        break;
                    case 'hover':
                        lis('mouseenter', _this2._onActivate.bind(_this2), false);
                        lis('mouseleave', _this2._onDeactivate.bind(_this2), true);
                        break;
                    case 'focus':
                        lis('focus', _this2._onActivate.bind(_this2), false);
                        lis('blur', _this2._onDeactivate.bind(_this2), true);
                        break;
                }
            });

            if (includes(this.options.triggers, 'hover') || includes(this.options.triggers, 'focus')) {
                this._$tpl[evtType]('mouseenter', this._onMouseOverTooltip.bind(this), false);
                this._$tpl[evtType]('mouseleave', this._onMouseOutTooltip.bind(this), false);
            }
        }
    };

    Tooltip.prototype._setEvents = function _setEvents() {
        this._events();
    };

    Tooltip.prototype._cleanEvents = function _cleanEvents() {
        this._events(EVENTS.REMOVE);
    };

    Tooltip.prototype._onActivate = function _onActivate(e) {
        this.show();
    };

    Tooltip.prototype._onDeactivate = function _onDeactivate(e) {
        this.hide();
    };

    Tooltip.prototype._onToggle = function _onToggle(e) {
        e.stopPropagation();
        e.preventDefault();
        this.toggle();
    };

    Tooltip.prototype._onMouseOverTooltip = function _onMouseOverTooltip(e) {
        this.toggle(true, false);
    };

    Tooltip.prototype._onMouseOutTooltip = function _onMouseOutTooltip(e) {
        this.toggle(false);
    };

    Tooltip.prototype.content = function content(_content) {
        var wrapper = this.tooltip.popper.querySelector('.tooltip-content');
        if (typeof _content === 'string') {
            this.tooltip.options.title = _content;
            wrapper.textContent = _content;
        } else if (isElement$1(_content)) {
            if (_content !== wrapper.children[0]) {
                wrapper.innerHTML = '';
                wrapper.appendChild(_content);
            }
            // var clonedNode = content.cloneNode(true);
            // this.tooltip.options.title = clonedNode;
            // if (isElement(content.parentNode)) {
            //     content.parentNode.removeChild(content);
            // }
        } else {
            console.error('unsupported content type', _content);
        }
    };

    Tooltip.filterOptions = function filterOptions(options) {
        var opt = _extends({}, options);

        opt.modifiers = {};
        var head = null;
        var tail = null;
        if (opt.placement.indexOf('-') > -1) {
            var _opt$placement$split = opt.placement.split('-');

            head = _opt$placement$split[0];
            tail = _opt$placement$split[1];

            opt.placement = includes(PLACEMENT, head) && includes(SUB_PLACEMENT, tail) ? opt.placement : Tooltip._defaults.placement;
        } else {
            opt.placement = includes(PLACEMENT, opt.placement) ? opt.placement : Tooltip._defaults.placement;
        }

        opt.modifiers.offset = {
            fn: Tooltip._setOffset
        };

        return opt;
    };

    Tooltip._setOffset = function _setOffset(data, opts) {
        var offset = data.instance.options.offset;

        if (window.isNaN(offset) || offset < 0) {
            offset = Tooltip._defaults.offset;
        }

        if (data.placement.indexOf('top') !== -1) {
            data.offsets.popper.top -= offset;
        } else if (data.placement.indexOf('right') !== -1) {
            data.offsets.popper.left += offset;
        } else if (data.placement.indexOf('bottom') !== -1) {
            data.offsets.popper.top += offset;
        } else if (data.placement.indexOf('left') !== -1) {
            data.offsets.popper.left -= offset;
        }

        return data;
    };

    Tooltip.defaults = function defaults(data) {
        // if (data.placement) {
        //     data.originalPlacement = data.placement;
        // }
        Tooltip._defaults = _extends({}, Tooltip._defaults, data);
    };

    Tooltip.prototype.show = function show() {
        this.toggle(true);
    };

    Tooltip.prototype.hide = function hide() {
        this.toggle(false);
    };

    Tooltip.prototype.toggle = function toggle(visible) {
        var _this3 = this;

        var autoHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var delay = this._options.delay;

        if (this._disabled === true) {
            visible = false;
            delay = 0;
            return;
        }

        if (typeof visible !== 'boolean') {
            visible = !this._visible;
        }

        if (visible === true) {
            delay = 0;
        }

        clearTimeout(this._clearDelay);

        if (autoHide === true) {
            this._clearDelay = setTimeout(function () {
                _this3._visible = visible;
                _this3._$tt.popper.style.display = _this3._visible === true ? 'inline-block' : 'none';
                _this3._$tt.update();
            }, delay);
        }
    };

    _createClass(Tooltip, [{
        key: 'options',
        get: function get() {
            return _extends({}, this._options);
        }
    }, {
        key: 'tooltip',
        get: function get() {
            return this._$tt;
        }
    }, {
        key: 'class',
        set: function set(val) {
            if (typeof val === 'string') {
                var classList = this._$tpl.classList.value.replace(this.options.class, val);
                this._options.class = classList;
                this._$tpl.setAttribute('class', classList);
            }
        }
    }, {
        key: 'disabled',
        set: function set(val) {
            if (typeof val === 'boolean') {
                this._disabled = val;
            }
        }
    }]);

    return Tooltip;
}();

Tooltip$2._defaults = _extends({}, DEFAULT_OPTIONS);

function randomId() {
    return Date.now() + '-' + Math.round(Math.random() * 100000000);
}

/**
 * Check if the variable is an html element
 * @param {*} value
 * @return Boolean
 */
function isElement$1(value) {
    return value instanceof window.Element;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @author: laurent blanes <laurent.blanes@gmail.com>
 * @tutorial: https://hekigan.github.io/vue-directive-tooltip/
 */
var BASE_CLASS = 'vue-tooltip';
var POSITIONS = ['auto', 'top', 'bottom', 'left', 'right'];
var SUB_POSITIONS = ['start', 'end'];

/**
 * usage:
 *
 * // basic usage:
 * <div v-tooltip="'my content'">
 * or
 * <div v-tooltip="{content: 'my content'}">
 *
 * // change position of tooltip
 * // options: auto (default) | bottom | top | left | right
 *
 * // change sub-position of tooltip
 * // options: start | end
 *
 * <div v-tooltip.top="{content: 'my content'}">
 *
 * // add custom class
 * <div v-tooltip="{class: 'custom-class', content: 'my content'}">
 *
 * // toggle visibility
 * <div v-tooltip="{visible: false, content: 'my content'}">
 */
var Tooltip$1 = {
    name: 'tooltip',
    config: {},
    install: function install(Vue, installOptions) {
        Vue.directive('tooltip', {
            bind: function bind(el, binding, vnode) {
                if (installOptions) {
                    Tooltip$2.defaults(installOptions);
                }
            },
            inserted: function inserted(el, binding, vnode, oldVnode) {
                if (installOptions) {
                    Tooltip$2.defaults(installOptions);
                }

                var options = filterBindings(binding);
                el.tooltip = new Tooltip$2(el, options);

                if (binding.modifiers.notrigger && binding.value.visible === true) {
                    el.tooltip.show();
                }

                if (binding.value && binding.value.visible === false) {
                    el.tooltip.disabled = true;
                }
            },
            componentUpdated: function componentUpdated(el, binding, vnode, oldVnode) {
                update(el, binding);
            },
            unbind: function unbind(el, binding, vnode, oldVnode) {
                el.tooltip.destroy();
            }
        });
    }
};

function filterBindings(binding) {
    var delay = !binding.value || isNaN(binding.value.delay) ? Tooltip$2._defaults.delay : binding.value.delay;

    return {
        class: getClass(binding),
        html: binding.value ? binding.value.html : null,
        placement: getPlacement(binding),
        title: getContent(binding),
        triggers: getTriggers(binding),
        offset: binding.value && binding.value.offset ? binding.value.offset : Tooltip$2._defaults.offset,
        delay: delay
    };
}

/**
 * Get placement from modifiers
 * @param {*} binding
 */
function getPlacement(_ref) {
    var modifiers = _ref.modifiers;

    var MODS = Object.keys(modifiers);
    var head = '';
    var tail = null;
    for (var i = 0; i < MODS.length; i++) {
        var pos = MODS[i];
        if (POSITIONS.indexOf(pos) > -1) {
            head = pos;
        }
        if (SUB_POSITIONS.indexOf(pos) > -1) {
            tail = pos;
        }
    }
    return head && tail ? head + '-' + tail : head;
}

/**
 * Get trigger value from modifiers
 * @param {*} binding
 * @return String
 */
function getTriggers(_ref2) {
    var modifiers = _ref2.modifiers;

    var trigger = [];
    if (modifiers.notrigger) {
        return trigger;
    } else if (modifiers.manual) {
        trigger.push('manual');
    } else {
        if (modifiers.click) {
            trigger.push('click');
        }

        if (modifiers.hover) {
            trigger.push('hover');
        }

        if (modifiers.focus) {
            trigger.push('focus');
        }

        if (trigger.length === 0) {
            trigger.push('hover', 'focus');
        }
    }

    return trigger;
}

/**
 * Check if the variable is an object
 * @param {*} value
 * @return Boolean
 */
function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

/**
 * Check if the variable is an html element
 * @param {*} value
 * @return Boolean
 */
function isElement(value) {
    return value instanceof window.Element;
}

/**
 * Get the css class
 * @param {*} binding
 * @return HTMLElement | String
 */
function getClass(_ref3) {
    var value = _ref3.value;

    if (value === null) {
        return BASE_CLASS;
    } else if (isObject(value) && typeof value.class === 'string') {
        return BASE_CLASS + ' ' + value.class;
    } else if (Tooltip$2._defaults.class) {
        return BASE_CLASS + ' ' + Tooltip$2._defaults.class;
    } else {
        return BASE_CLASS;
    }
}

/**
 * Get the content
 * @param {*} binding
 * @return HTMLElement | String
 */
function getContent(_ref4) {
    var value = _ref4.value;

    if (value !== null && isObject(value)) {
        if (value.content !== undefined) {
            return '' + value.content;
        } else if (value.html && document.getElementById(value.html)) {
            return document.getElementById(value.html);
        } else if (isElement(value.html)) {
            return value.html;
        } else {
            return '';
        }
    } else {
        return '' + value;
    }
}

/**
 * Action on element update
 * @param {*} el Vue element
 * @param {*} binding
 */
function update(el, binding) {
    if (typeof binding.value === 'string') {
        el.tooltip.content(binding.value);
    } else {
        if (binding.value && binding.value.class && binding.value.class.trim() !== el.tooltip.options.class.replace(BASE_CLASS, '').trim()) {
            el.tooltip.class = BASE_CLASS + ' ' + binding.value.class.trim();
        }

        el.tooltip.content(getContent(binding));

        if (!binding.modifiers.notrigger && binding.value && typeof binding.value.visible === 'boolean') {
            el.tooltip.disabled = !binding.value.visible;
            return;
        } else if (binding.modifiers.notrigger) {
            el.tooltip.disabled = false;
        }

        if (!el.tooltip.disabled && binding.value && binding.value.visible === true) {
            el.tooltip.show();
        } else {
            el.tooltip.hide();
        }
    }
}

// if (typeof window !== 'undefined' && window.Vue) {
//     window.Vue.use(Tooltip);
// }

return Tooltip$1;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_data_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_desktop_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_desktop_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_desktop_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_signin_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_signin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__vue_signin_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_mainclient_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_mainclient_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__vue_mainclient_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_con_top_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_con_top_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__vue_con_top_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vue_con_main_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vue_con_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__vue_con_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__vue_con_panel_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__vue_con_panel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__vue_con_panel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__vue_splitter_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__vue_splitter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__vue_splitter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__vue_video_item_vue__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__vue_video_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__vue_video_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__vue_self_video_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__vue_self_video_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__vue_self_video_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__vue_controls_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__vue_controls_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__vue_controls_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__vue_poptip_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__vue_poptip_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__vue_poptip_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__vue_popmenu_panel_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__vue_popmenu_panel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__vue_popmenu_panel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__vue_popmenu_more_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__vue_popmenu_more_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__vue_popmenu_more_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__vue_popmenu_switchsharing_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__vue_popmenu_switchsharing_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__vue_popmenu_switchsharing_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__vue_pop_info_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__vue_pop_info_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__vue_pop_info_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__vue_pop_audio_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__vue_pop_audio_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__vue_pop_audio_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__vue_pop_video_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__vue_pop_video_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__vue_pop_video_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__vue_pop_avconnection_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__vue_pop_avconnection_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__vue_pop_avconnection_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__vue_pop_share_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__vue_pop_share_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__vue_pop_share_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__vue_pop_record_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__vue_pop_record_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__vue_pop_record_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__vue_pop_lockpeople_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__vue_pop_lockpeople_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__vue_pop_lockpeople_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__vue_panel_header_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__vue_panel_header_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24__vue_panel_header_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__vue_panel_plist_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__vue_panel_plist_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__vue_panel_plist_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__vue_panel_chat_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__vue_panel_chat_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26__vue_panel_chat_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__vue_plist_item_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__vue_plist_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27__vue_plist_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__vue_chat_item_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__vue_chat_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28__vue_chat_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__vue_lockpeople_item_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__vue_lockpeople_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29__vue_lockpeople_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__vue_svg_ico_activespeaker_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__vue_svg_ico_activespeaker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30__vue_svg_ico_activespeaker_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__vue_svg_ico_fullscreen_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__vue_svg_ico_fullscreen_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_31__vue_svg_ico_fullscreen_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__vue_svg_ico_grid_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__vue_svg_ico_grid_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_32__vue_svg_ico_grid_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__vue_svg_ico_info_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__vue_svg_ico_info_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33__vue_svg_ico_info_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__vue_svg_ico_panel_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__vue_svg_ico_panel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34__vue_svg_ico_panel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__vue_svg_ico_sidebyside_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__vue_svg_ico_sidebyside_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35__vue_svg_ico_sidebyside_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__vue_svg_ico_strip_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__vue_svg_ico_strip_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36__vue_svg_ico_strip_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__vue_svg_ico_strip_bot_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__vue_svg_ico_strip_bot_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_37__vue_svg_ico_strip_bot_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__vue_svg_ico_plist_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__vue_svg_ico_plist_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_38__vue_svg_ico_plist_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__vue_svg_ico_chat_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__vue_svg_ico_chat_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_39__vue_svg_ico_chat_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__vue_svg_ico_notes_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__vue_svg_ico_notes_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_40__vue_svg_ico_notes_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__vue_svg_ico_polling_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__vue_svg_ico_polling_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_41__vue_svg_ico_polling_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__vue_svg_ico_multimedia_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__vue_svg_ico_multimedia_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_42__vue_svg_ico_multimedia_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__vue_svg_ico_tools_vue__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__vue_svg_ico_tools_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_43__vue_svg_ico_tools_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__vue_svg_ico_remote_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__vue_svg_ico_remote_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_44__vue_svg_ico_remote_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__vue_svg_ico_switch_floating_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__vue_svg_ico_switch_floating_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_45__vue_svg_ico_switch_floating_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__vue_svg_ico_floating_cls_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__vue_svg_ico_floating_cls_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_46__vue_svg_ico_floating_cls_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__vue_svg_ico_pin_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__vue_svg_ico_pin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_47__vue_svg_ico_pin_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_vue_directive_tooltip__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_vue_directive_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_48_vue_directive_tooltip__);




















































__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('desktop', __WEBPACK_IMPORTED_MODULE_3__vue_desktop_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('Signin', __WEBPACK_IMPORTED_MODULE_4__vue_signin_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('mainclient', __WEBPACK_IMPORTED_MODULE_5__vue_mainclient_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('con-top', __WEBPACK_IMPORTED_MODULE_6__vue_con_top_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('con-main', __WEBPACK_IMPORTED_MODULE_7__vue_con_main_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('con-panel', __WEBPACK_IMPORTED_MODULE_8__vue_con_panel_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('splitter', __WEBPACK_IMPORTED_MODULE_9__vue_splitter_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('video-item', __WEBPACK_IMPORTED_MODULE_10__vue_video_item_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('self-video', __WEBPACK_IMPORTED_MODULE_11__vue_self_video_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('controls', __WEBPACK_IMPORTED_MODULE_12__vue_controls_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('poptip', __WEBPACK_IMPORTED_MODULE_13__vue_poptip_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('popmenu-panel', __WEBPACK_IMPORTED_MODULE_14__vue_popmenu_panel_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('popmenu-more', __WEBPACK_IMPORTED_MODULE_15__vue_popmenu_more_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('popmenu-switchsharing', __WEBPACK_IMPORTED_MODULE_16__vue_popmenu_switchsharing_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('pop-info', __WEBPACK_IMPORTED_MODULE_17__vue_pop_info_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('pop-audio', __WEBPACK_IMPORTED_MODULE_18__vue_pop_audio_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('pop-video', __WEBPACK_IMPORTED_MODULE_19__vue_pop_video_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('pop-avconnection', __WEBPACK_IMPORTED_MODULE_20__vue_pop_avconnection_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('pop-share', __WEBPACK_IMPORTED_MODULE_21__vue_pop_share_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('pop-record', __WEBPACK_IMPORTED_MODULE_22__vue_pop_record_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('pop-lockpeople', __WEBPACK_IMPORTED_MODULE_23__vue_pop_lockpeople_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('panel-header', __WEBPACK_IMPORTED_MODULE_24__vue_panel_header_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('panel-plist', __WEBPACK_IMPORTED_MODULE_25__vue_panel_plist_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('panel-chat', __WEBPACK_IMPORTED_MODULE_26__vue_panel_chat_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('plist-item', __WEBPACK_IMPORTED_MODULE_27__vue_plist_item_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('chat-item', __WEBPACK_IMPORTED_MODULE_28__vue_chat_item_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('lockpeople-item', __WEBPACK_IMPORTED_MODULE_29__vue_lockpeople_item_vue___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-activespeaker', __WEBPACK_IMPORTED_MODULE_30__vue_svg_ico_activespeaker_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-fullscreen', __WEBPACK_IMPORTED_MODULE_31__vue_svg_ico_fullscreen_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-grid', __WEBPACK_IMPORTED_MODULE_32__vue_svg_ico_grid_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-info', __WEBPACK_IMPORTED_MODULE_33__vue_svg_ico_info_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-panel', __WEBPACK_IMPORTED_MODULE_34__vue_svg_ico_panel_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-sidebyside', __WEBPACK_IMPORTED_MODULE_35__vue_svg_ico_sidebyside_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-strip', __WEBPACK_IMPORTED_MODULE_36__vue_svg_ico_strip_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-strip-bot', __WEBPACK_IMPORTED_MODULE_37__vue_svg_ico_strip_bot_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-plist', __WEBPACK_IMPORTED_MODULE_38__vue_svg_ico_plist_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-chat', __WEBPACK_IMPORTED_MODULE_39__vue_svg_ico_chat_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-notes', __WEBPACK_IMPORTED_MODULE_40__vue_svg_ico_notes_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-polling', __WEBPACK_IMPORTED_MODULE_41__vue_svg_ico_polling_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-multimedia', __WEBPACK_IMPORTED_MODULE_42__vue_svg_ico_multimedia_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-tools', __WEBPACK_IMPORTED_MODULE_43__vue_svg_ico_tools_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-remote', __WEBPACK_IMPORTED_MODULE_44__vue_svg_ico_remote_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-switch-floating', __WEBPACK_IMPORTED_MODULE_45__vue_svg_ico_switch_floating_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-floating-cls', __WEBPACK_IMPORTED_MODULE_46__vue_svg_ico_floating_cls_vue___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('svg-ico-pin', __WEBPACK_IMPORTED_MODULE_47__vue_svg_ico_pin_vue___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);
const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store(__WEBPACK_IMPORTED_MODULE_2__data_data_js__["a" /* default */]);

// tooltip

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_48_vue_directive_tooltip___default.a, {
    delay: 0,
    placement: 'auto',
    triggers: ['hover', 'click'],
    offset: 0
});

const vm = new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({ store });

window.onload = function () {
    vm.$mount('#app');
};

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['name', 'to', 'msg'],
    data() {
        return {};
    },
    computed: {
        avatar() {
            let people = this.$store.getters.people(this.name);
            if (people) {
                return people.avatar;
            } else {
                return null;
            }
        },
        avatarUrl() {
            if (this.avatar) {
                return 'url(' + this.$store.state.avatarPath + this.avatar + ')';
            } else {
                return 'none';
            }
        },
        abbr() {
            let arr = this.name.split(' ');
            return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
        },
        isMe() {
            let people = this.$store.getters.people(this.name);
            if (people) {
                return people.me;
            } else {
                return false;
            }
        },
        name2name() {
            let people = this.$store.getters.people(this.name);
            if (!people) {
                return '';
            }
            if (!people.me) {
                return this.name + ' to ' + this.to;
            } else {
                return 'You to ' + this.to;
            }
        }
    },
    mounted() {},
    watch: {},
    methods: {}
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const marginX = 15;
const marginTop = 60;
const marginBottom = 14;

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            tmoResumeVideo: false,
            actionFreezed: false,
            switchOpen: false,
            switchOpen2: false,
            switchAlwaysOpen: false,
            domMain: null,
            domLeft: null,
            domAS: null,
            domSP: null,
            domVL: null,
            domVItems: null,
            domHud: null,
            itvHideHud: null,
            domDsk: null,
            floatingZindex: 8,
            videoPageIndex: 0,
            videoPagesize: 0,
            gridViewRow: 0,
            gridViewCol: 0,
            gridViewItemWidth: 0

        };
    },
    computed: {
        height() {
            return 'calc(100% - ' + this.headerHeight + 'px)';
        },
        backgroundColor() {
            return this.peopleList.length > 1 ? 'rgba(41,41,41,0.7)' : 'rgba(245,245,245,0.64)';
        },
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        videoFloatingLayoutMode() {
            return this.$store.state.videoFloatingLayoutMode;
        },
        videoSharingSwitched() {
            return this.$store.state.videoSharingSwitched;
        },
        floatingCollapsed() {
            return this.$store.state.floatingCollapsed;
        },
        collapsedLabel() {
            if (this.videoSharingSwitched) {
                return 'Viewing ' + this.$store.state.activeSpeakerName + "'s screen";
            } else {
                return 'Speaking: ' + this.$store.state.activeSpeakerName;
            }
        },
        videoLayoutPrepareMode() {
            return this.$store.state.videoLayoutPrepareMode;
        },
        activeSpeakerName() {
            return this.$store.state.activeSpeakerName;
        },
        activeSpeaker() {
            return this.$store.getters.activeSpeaker;
        },
        lockedPeopleName() {
            return this.$store.state.lockedPeopleName;
        },
        topPeopleName() {
            let name = this.lockedPeopleName !== null ? this.lockedPeopleName : this.activeSpeakerName;
            return name;
        },
        muted() {
            return this.$store.state.muted;
        },
        headerHeight() {
            return this.$store.state.headerHeight;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        recording() {
            return this.$store.state.recording;
        },
        locked() {
            return this.$store.state.locked;
        },
        currentSharing() {
            return this.$store.state.currentSharing;
        },
        popmenuPanelVisible() {
            return this.$store.state.popmenuPanelVisible;
        },
        popInfoVisible() {
            return this.$store.state.popInfoVisible;
        },
        popLockPeopleVisible() {
            return this.$store.state.popLockPeopleVisible;
        },
        popmenuSwitchSharingVisible() {
            return this.$store.state.popmenuSwitchSharingVisible;
        },
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        peopleList() {
            return this.$store.state.peopleList;
        },
        peopleNotJoinedList() {
            return this.$store.state.peopleNotJoinedList;
        },
        annotationToolsVisible() {
            return this.$store.state.annotationToolsVisible;
        },
        docThumbsVisible() {
            return this.$store.state.docThumbsVisible;
        },
        floatVideoSize() {
            return this.$store.state.floatVideoSize;
        },
        floatVideoOriSize() {
            return this.$store.state.floatVideoOriSize;
        },
        sideBySideVideoColumn() {
            return this.$store.state.sideBySideVideoColumn;
        },
        rightPanelContentWidth() {
            return this.$store.state.rightPanelContentWidth;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        popAVConnectionVisible() {
            return this.$store.state.popAVConnectionVisible;
        },
        chatMsgList() {
            return this.$store.state.chatMsgList;
        },
        plistPanelVisible() {
            return this.$store.state.plistPanelVisible;
        },
        chatPanelVisible() {
            return this.$store.state.chatPanelVisible;
        },
        plistPanelClsed() {
            return this.$store.state.plistPanelClsed;
        },
        chatPanelClsed() {
            return this.$store.state.chatPanelClsed;
        },
        anyOpenPanel() {
            return this.$store.getters.anyOpenPanel;
        }

    },
    mounted() {
        this.domMain = $('#con_main');
        this.domLeft = $('#con_left');
        this.domAS = $('#active_speaker_layer');
        this.domSP = $('#video_scrollpane');
        this.domVL = $('#video_list');
        this.domHud = $('#hud');
        this.domDsk = $('#desktop');

        window.addEventListener('resize', this.onResize);
        window.addEventListener('mousemove', this.onMousemove);
        window.addEventListener('keydown', this.onKeydown);

        this.initDrag();

        // skip signin and add all people
        let skip = getQueryString('skip');
        if (skip) {
            let plist1, plist2;
            plist1 = this.peopleNotJoinedList.slice();
            plist2 = this.peopleList.slice();
            let removed = plist1.splice(0, 3);
            plist2 = plist2.concat(removed);
            this.$store.commit('peopleList', plist2);
            this.$store.commit('peopleNotJoinedList', plist1);

            // auto + people
            setTimeout(() => {
                this.addPeopleOneByOne();
            }, 100);
        }

        let usertesting = getQueryString('usertesting');
        if (usertesting) {
            let plist1, plist2;
            plist1 = this.peopleNotJoinedList.slice();
            plist2 = this.peopleList.slice();
            let removed = plist1.splice(0, 3);
            plist2 = plist2.concat(removed);
            this.$store.commit('peopleList', plist2);
            this.$store.commit('peopleNotJoinedList', plist1);

            // auto + people
            setTimeout(() => {
                this.addPeopleOneByOne();
            }, 500);
        }

        let switchon = getQueryString('switchon');
        if (switchon) {
            this.switchAlwaysOpen = true;
        }

        if (this.peopleList.length < 3) {
            this.setViewMode('ac', false);
        } else {
            this.setViewMode(this.videoLayoutMode, false);
        }

        // show AV pop
        setTimeout(() => {

            let appos = $('#mainclient').offset();
            let offset = $('#controls .btn_audio').offset();
            let left = offset.left - appos.left + $('#controls .btn_audio').width() / 2;
            let top = offset.top - appos.top;
            this.$store.commit('popStartPoint', [left, top]);
            this.$store.commit('popAVConnectionVisible', true);
        }, 500);
    },
    watch: {
        panelVisible(newVal) {
            this.onResize();
        },
        rightPanelWidth(newVal) {
            this.onResize();
        },
        currentSharing(newVal) {
            if ((this.videoLayoutMode == 'grid' || this.videoLayoutMode == 'active-speaker') && this.currentSharing !== null) {
                this.setViewMode('strip', false);
            } else if (this.videoLayoutMode == 'side-by-side' && this.currentSharing === null) {
                this.setViewMode('strip', false);
            } else {
                this.setViewMode(this.videoLayoutMode, false);
            }
        },
        annotationToolsVisible(newVal) {
            this.setSharingLayout();
        },
        docThumbsVisible(newVal) {
            this.setSharingLayout();
        },
        fullscreen(newVal) {
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.onResize();
                if (cnt >= 50) {
                    clearInterval(itv);
                }
            }, 10);
        },
        peopleList(newVal) {
            setTimeout(() => {
                this.onPeopleListChange();
            }, 10);
        },
        plistPanelVisible(newVal) {
            if ($('#floating_plist').css('top') == 'auto') {
                $('#floating_plist').css('top', 120);
                $('#floating_plist').css('right', 10);
            }
        },
        chatPanelVisible(newVal) {
            if ($('#floating_chat').css('top') == 'auto') {
                $('#floating_chat').css('top', 390);
                $('#floating_chat').css('right', 10);
            }
        },
        plistPanelClsed(newVal) {
            if (newVal) {
                $('#floating_plist').css('height', 28);
            } else {
                $('#floating_plist').css('height', 260);
            }
        },
        chatPanelClsed(newVal) {
            if (newVal) {
                $('#floating_chat').css('height', 28);
            } else {
                $('#floating_chat').css('height', 260);
            }
        }
    },
    methods: {
        openSwitch(evt) {
            this.switchOpen = true;
            $('.btn_view_switch .btn').removeClass('selected');
            let btn = $('.btn_' + this.videoLayoutMode.replace(/-/g, '_'));
            btn.addClass('selected');
            $('.btn_view_switch .btns').css('right', 0);
            window.addEventListener('mousemove', this.checkMouseLeaveSwitch);
        },
        closeSwitch(mode) {
            if (this.switchAlwaysOpen) {
                return;
            }
            this.actionFreezed = true;
            this.switchOpen = false;
            $('.btn_view_switch .btn').removeClass('selected');

            this.setSwitch(mode);

            window.removeEventListener('mousemove', this.checkMouseLeaveSwitch);

            setTimeout(() => {
                this.actionFreezed = false;
            }, 100);
        },
        checkMouseLeaveSwitch(evt) {
            if (!$('.btn_view_switch').hitTest(evt.pageX, evt.pageY)) {
                this.closeSwitch();
            }
        },
        setSwitch(mode) {
            if (this.switchAlwaysOpen) {
                this.openSwitch(mode);
                return;
            }
            if (this.switchOpen) {
                return;
            }
            if (!mode) {
                mode = this.videoLayoutMode;
            }
            let btn = $('.btn_' + mode.replace(/-/g, '_'));
            if (btn.length > 0) {
                let right = btn.position().left - 64;
                $('.btn_view_switch .btns').css('right', right + 'px');
            }
        },

        openSwitch2(evt) {
            this.switchOpen2 = true;
            $('.fc_view_switch .btn').removeClass('selected');
            let btn = $('.fc_' + this.videoFloatingLayoutMode.replace(/-/g, '_'));
            btn.addClass('selected');
            $('.fc_view_switch .btns').css('right', 0);
            window.addEventListener('mousemove', this.checkMouseLeaveSwitch2);
        },
        closeSwitch2(mode) {
            if (this.switchAlwaysOpen) {
                return;
            }
            this.actionFreezed = true;
            this.switchOpen2 = false;
            $('.fc_view_switch .btn').removeClass('selected');

            this.setSwitch2(mode);

            window.removeEventListener('mousemove', this.checkMouseLeaveSwitch2);

            setTimeout(() => {
                this.actionFreezed = false;
            }, 100);
        },
        checkMouseLeaveSwitch2(evt) {
            if ($('.fc_view_switch').length > 0 && !$('.fc_view_switch').hitTest(evt.pageX, evt.pageY)) {
                this.closeSwitch2();
            }
        },
        setSwitch2(mode) {
            if (this.switchAlwaysOpen) {
                this.openSwitch2(mode);
                return;
            }
            if (this.switchOpen2) {
                return;
            }
            if (!mode) {
                mode = this.videoFloatingLayoutMode;
            }
            let btn = $('.fc_' + mode.replace(/-/g, '_'));
            if (btn.length > 0) {
                let right = btn.position().left - 48;
                $('.fc_view_switch .btns').css('right', right + 'px');
            }
        },

        switchTo(mode, animated) {
            if (this.videoLayoutMode != mode) {
                if (mode == 'fullscreen') {
                    this.launchFullscreen();
                } else {
                    if (!this.videoSharingSwitched && this.currentSharing != null) {
                        this.exitFullscreen();
                    }
                }
                animated = false;
                this.setViewMode(mode, animated);
                this.closeSwitch(mode);

                if (this.switchAlwaysOpen) {
                    this.openSwitch(mode);
                }
            }
        },
        switchFloatingTo(mode, animated) {
            if (this.videoFloatingLayoutMode != mode) {
                animated = false;
                this.setFloatingViewMode(mode, animated);
                this.closeSwitch2(mode);

                if (this.switchAlwaysOpen) {
                    this.openSwitch2(mode);
                }
            }
        },
        toggleSwitchFloating() {
            if (this.videoSharingSwitched) {
                this.$store.commit('videoSharingSwitched', false);

                let vmode = this.videoLayoutMode;
                this.switchTo('fullscreen');
                setTimeout(() => {
                    this.setSwitch('fullscreen');
                    this.switchFloatingTo(vmode);
                    this.setSwitch2(vmode);
                }, 100);
            } else {
                this.$store.commit('videoSharingSwitched', true);

                this.$store.commit('annotationToolsVisible', false);
                this.$store.commit('docThumbsVisible', false);

                var conw = $('#floating_layer').width();
                var bigvh = Math.floor(conw / 16 * 9);
                $('#floating_layer').css('height', bigvh);

                this.switchTo(this.videoFloatingLayoutMode);
                $('.btn_view_switch').hide();
                setTimeout(() => {
                    $('.btn_view_switch').show();
                    this.setSwitch(this.videoFloatingLayoutMode);
                }, 100);
            }
        },
        toggleFloatingCls() {
            if (this.floatingCollapsed) {
                this.$store.commit('floatingCollapsed', false);
            } else {
                this.$store.commit('floatingCollapsed', true);
            }
        },
        changeMode(mode) {
            if (this.videoLayoutMode != mode) {
                this.$store.commit('videoLayoutMode', mode);
            }
        },
        changeFloatingMode(mode) {
            if (this.videoFloatingLayoutMode != mode) {
                this.$store.commit('videoFloatingLayoutMode', mode);
            }
        },
        onPeopleListChange() {
            let plist = this.peopleList;
            if (plist.length == 2) {
                this.setViewMode('active-speaker', false);
            } else if (plist.length == 3) {
                this.setViewMode('strip', false);
            } else {
                this.setViewMode(this.videoLayoutMode, false);
            }
        },
        setViewMode(mode, animated) {
            this.$store.commit('videoLayoutPrepareMode', mode);
            let prevmode = this.videoLayoutMode;

            if (!this.panelVisible && mode != 'side-by-side') {
                this.$store.commit('rightPanelWidth', 0);
            }

            let duration_l;
            let duration_s;
            if (animated) {
                duration_l = 500;
                duration_s = 300;
            } else {
                duration_l = 0;
                duration_s = 0;
            }

            if (prevmode == 'active-speaker') {
                duration_l = 0;
            }

            switch (mode) {
                case 'strip':

                    var margin = 1;
                    var vw = 120;
                    var vh = 68;
                    var conw = this.domMain.width() - this.rightPanelWidth;

                    var pagesize = this.peopleList.length > 6 ? 5 : this.peopleList.length - 1;
                    var maxVisibleItem = Math.floor((conw - 100) / vw);
                    pagesize = Math.min(pagesize, maxVisibleItem);
                    this.videoPagesize = pagesize;

                    var conh = this.domMain.height();
                    var spw = vw * pagesize + margin * (pagesize - 1);
                    var sph = vh;
                    var spl = Math.round((conw - spw) / 2);
                    var spt = this.currentSharing == null || this.videoSharingSwitched ? conh - sph - 15 : 12;

                    // switch button
                    var w = $('.btn_view_switch .btn').width();

                    // video layout
                    $('#con_left').velocity({ width: conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue) => {
                            this.setSharingLayout();
                        } });
                    $('#hud').velocity({ width: conw }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left: 0, top: 0, width: conw, height: '100%' }, { duration: duration_l, queue: false });

                    if (this.currentSharing === null || this.videoSharingSwitched) {
                        this.domAS.velocity({ opacity: 1 }, { duration: duration_l, queue: false });
                    } else {
                        this.domAS.velocity({ opacity: 0 }, { duration: duration_l, queue: false });
                    }
                    this.domSP.velocity({ opacity: 1, left: spl, top: spt, width: spw, height: sph }, { duration: duration_l, queue: false });
                    this.domSP.css('background-color', 'rgba(0,0,0,0.12)');
                    this.domSP.css('border', '1px solid rgba(0, 0, 0, 0.12)');
                    $('#video_list .video_item').each((index, itm) => {
                        let left = index * (vw + margin);
                        $(itm).velocity({ left: left, top: 0, width: vw, height: vh }, { duration: duration_l, queue: false });
                    });

                    //self video
                    /*
                    if($('#self_video').length > 0){
                        $('#self_video').removeClass('fixedPosition');
                        var oriw = this.floatVideoOriSize[0];
                        var orih = this.floatVideoOriSize[1];
                        $('#self_video').velocity({ width:oriw, height:orih }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.$store.commit('floatVideoSize', [$(elements).width(), $(elements).height()])} });
                         $('#active_speaker_float_video').fadeOut(100);
                        $('#camera').velocity({ left:0, top:0, width:'100%' }, { duration: duration_l, queue: false });
                        $('#camera').css('height', 'auto');
                    }
                    */

                    // < >
                    var arrw = 24;
                    var arrt = spt + (sph - arrw) / 2;
                    var arrl = spl - arrw - 10;
                    $('#btn_video_prev').velocity({ top: arrt, left: arrl }, { duration: duration_l, queue: false });
                    $('#btn_video_next').velocity({ top: arrt, left: conw - arrl - arrw }, { duration: duration_l, queue: false });

                    // sharing
                    $('#sharing_layer').css('top', vh + 24 + 'px');
                    var height = this.domMain.height() - vh - 24;
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height: height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height: height }, { duration: duration_l, queue: false });

                    if (this.currentSharing == null || this.videoSharingSwitched) {
                        // control
                        $('#controls').velocity({ bottom: 95 }, { duration: duration_l, queue: false });

                        $('#sharing_selection').css('top', '12px');
                    } else {
                        // control
                        $('#controls').velocity({ bottom: 15 }, { duration: duration_l, queue: false });

                        $('#sharing_selection').css('top', vh + 38 + 'px');
                    }

                    break;

                case 'grid':
                    var col;
                    var row;
                    if (this.peopleList.length >= 6) {
                        col = 3;
                    } else {
                        col = 2;
                    }
                    if (this.peopleList.length >= 4) {
                        row = 2;
                    } else {
                        row = 1;
                    }
                    var pagesize = col * row;
                    var margin = 1;
                    var conw = this.domMain.width() - this.rightPanelWidth;
                    var conh = this.domMain.height();
                    var vw = Math.round(conw - (col - 1) * margin - margin * 2) / col;
                    var vh = Math.round(vw / 4 * 3);
                    if (conw / col / (conh / row) > 4 / 3) {
                        vh = Math.round(conh - (row + 1) * margin) / row;
                        vw = Math.round(vh / 3 * 4);
                    }
                    var spw = conw - margin * 2;
                    var sph = vh * row + margin;
                    var spl = margin;
                    var spt = Math.round((conh - sph) / 2);
                    var vleft = (spw - vw * col - (col - 1) * margin) / 2;

                    this.gridViewRow = row;
                    this.gridViewCol = col;
                    this.gridViewItemWidth = vw;
                    this.videoPagesize = pagesize;

                    // switch button
                    var w = $('.btn_view_switch .btn').width();

                    // video layout
                    $('#con_left').velocity({ width: conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue) => {
                            this.setSharingLayout();
                        } });
                    $('#hud').velocity({ width: conw }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left: 0, top: 0, width: conw, height: '100%' }, { duration: duration_l, queue: false });

                    this.domAS.velocity({ opacity: 0 }, { duration: duration_l, queue: false });
                    this.domSP.velocity({ opacity: 1, left: spl, top: spt, width: spw, height: sph }, { duration: duration_l, queue: false });
                    this.domSP.css('background-color', 'rgba(0,0,0,0.12)');
                    this.domSP.css('border', '1px solid rgba(0, 0, 0, 0.12)');

                    var pnum = this.peopleList.length;
                    $('#video_list .video_item').each((index, itm) => {
                        let pg = Math.floor(index / pagesize);
                        var colpg = pg == 0 ? col : 1;
                        var spwpg = pg <= 1 ? pg * (spw + margin) : spw + margin + (pg - 1) * (vw + margin);
                        let top = index % pagesize / colpg < 1 ? 0 : vh + margin;
                        let left = vleft + index % pagesize % colpg * (vw + margin) + spwpg;
                        if (top > 0 && pnum - 1 < pagesize && (pnum - 1) % 2 == 1) {
                            let seclinenum = colpg - (pagesize - colpg);
                            let vleft2 = vleft + vw / 2;
                            left = vleft2 + index % pagesize % colpg * (vw + margin) + spwpg;
                        }
                        $(itm).velocity({ left: left, top: top, width: vw, height: vh }, { duration: duration_l, queue: false });
                    });

                    //self video
                    /*
                    if($('#self_video').length > 0){
                        $('#self_video').removeClass('fixedPosition');
                        var oriw = this.floatVideoOriSize[0];
                        var orih = this.floatVideoOriSize[1];
                        $('#self_video').velocity({ width:oriw, height:orih }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.$store.commit('floatVideoSize', [$(elements).width(), $(elements).height()])} });
                         $('#active_speaker_float_video').fadeOut(100);
                        $('#camera').velocity({ left:0, top:0, width:'100%' }, { duration: duration_l, queue: false });
                        $('#camera').css('height', 'auto');
                    }
                    */

                    // < >
                    var arrh = 62;
                    var arrw = 48;
                    var arrt = spt + (sph - arrh) / 2;
                    var arrl = 0;
                    $('#btn_video_prev').velocity({ top: arrt, left: arrl }, { duration: duration_l, queue: false });
                    $('#btn_video_next').velocity({ top: arrt, left: conw - arrl - arrw }, { duration: duration_l, queue: false });

                    // control
                    $('#controls').velocity({ bottom: 15 }, { duration: duration_l, queue: false });

                    break;

                case 'active-speaker':

                    var pagesize = 5;
                    var margin = 1;
                    var vw = 120;
                    var vh = 68;
                    var conw = this.domMain.width() - this.rightPanelWidth;
                    var conh = this.domMain.height();
                    var spw = vw * pagesize + margin * (pagesize - 1);
                    var sph = vh;
                    var spl = Math.round((conw - spw) / 2);
                    var spt = conh - sph - 10;

                    // switch button
                    var w = $('.btn_view_switch .btn').width();

                    // video layout
                    $('#con_left').velocity({ width: conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue) => {
                            this.setSharingLayout();
                        } });
                    $('#hud').velocity({ width: conw }, { duration: duration_l, queue: false });

                    this.domAS.velocity({ opacity: 1 }, { duration: duration_l, queue: false });
                    this.domSP.velocity({ opacity: 0 }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left: 0, top: 0, width: conw, height: '100%' }, { duration: duration_l, queue: false });

                    // < >

                    // control
                    $('#controls').velocity({ bottom: 15 }, { duration: duration_l, queue: false });

                    // sharing
                    $('#sharing_layer').css('top', '0');
                    var height = '100%';
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height: height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height: height }, { duration: duration_l, queue: false });

                    $('#sharing_selection').css('top', '12px');

                    break;

                case 'side-by-side':

                    var margin = 1;
                    var conw = this.domMain.width() - this.rightPanelContentWidth;
                    var conh = this.domMain.height();
                    var sidecolw = this.rightPanelContentWidth;

                    var vw;
                    var vh;
                    var col;
                    var row;

                    if (sidecolw < 241) {
                        col = 1;
                    } else if (sidecolw < 362) {
                        col = 2;
                    } else {
                        col = 3;
                    }
                    this.$store.commit('sideBySideVideoColumn', col);
                    vw = (sidecolw - margin * (col - 1)) / col;
                    vh = vw / 16 * 9;

                    var ash = Math.floor(sidecolw / 16 * 9);
                    var spw = sidecolw;
                    var sph = conh;
                    var spl = 0;
                    var spt = ash + margin;

                    var thumbsAreaH = conh - ash - margin;
                    if (col == 1) {
                        thumbsAreaH = conh;
                    }
                    row = Math.floor(thumbsAreaH / (vh + margin));
                    var pagesize = row * col;

                    this.gridViewRow = row;
                    this.gridViewCol = col;
                    this.gridViewItemWidth = vw;
                    this.videoPagesize = pagesize;

                    // switch button
                    var w = $('.btn_view_switch .btn').width();

                    // video layout
                    $('#con_left').velocity({ width: conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue) => {
                            this.setSharingLayout();
                        } });
                    $('#hud').velocity({ width: conw }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left: conw, top: 0, width: sidecolw, height: '100%' }, { duration: duration_l, queue: false });

                    this.domAS.velocity({ opacity: 0 }, { duration: duration_l, queue: false });

                    this.domSP.velocity({ opacity: 1, left: spl, top: 0, width: spw, height: sph }, { duration: duration_l, queue: false });
                    this.domSP.css('background-color', 'rgba(0,0,0,0)');
                    this.domSP.css('border', '0 solid rgba(0, 0, 0, 0)');

                    var idx = 0;
                    var thumbnum = col > 1 ? this.peopleList.length - 2 : this.peopleList.length - 1;
                    var totalpg = Math.ceil(thumbnum / pagesize);
                    $('#video_list .video_item').each((index, itm) => {
                        var name = $(itm).attr('data-name');
                        if (name != this.activeSpeakerName || col == 1) {
                            let pg = Math.floor(idx / pagesize);
                            var ttt = col == 1 ? 0 : spt;
                            var colpg = col == 1 || pg == 0 || pg < totalpg - 1 ? col : Math.ceil(thumbnum % pagesize / row);
                            let top = ttt + Math.floor(idx % pagesize / colpg) * (vh + margin);
                            let left = idx % pagesize % colpg * (vw + margin) + (spw + margin) * pg;

                            $(itm).velocity({ left: left, top: top, width: vw, height: vh }, { duration: duration_l, queue: false });

                            $(itm).attr('is-active-speaker', 0);
                            $(itm).attr('ori-left', left);
                            idx++;

                            if (this.panelVisible || row == 0) {
                                $(itm).hide();
                            } else {
                                $(itm).show();
                            }
                        } else {
                            $(itm).velocity({ left: 0, top: 0, width: spw, height: ash }, { duration: duration_l, queue: false });
                            $(itm).attr('is-active-speaker', 1);
                            $(itm).attr('ori-left', 0);
                        }
                    });

                    $('#video_list').css('left', 0);

                    // < >
                    var arrw = 24;
                    var arrh = 32;
                    var arrt = col == 1 ? (row * (vh + margin) - arrh) / 2 : spt + (row * (vh + margin) - arrh) / 2;
                    var arrl = 0;
                    $('#btn_video_prev').velocity({ top: arrt, left: arrl }, { duration: duration_l, queue: false });
                    $('#btn_video_next').velocity({ top: arrt, left: sidecolw - arrl - arrw }, { duration: duration_l, queue: false });

                    // control
                    $('#controls').velocity({ bottom: 15 }, { duration: duration_l, queue: false });

                    // sharing
                    $('#sharing_layer').css('top', '0');
                    var height = '100%';
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height: height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height: height }, { duration: duration_l, queue: false });

                    $('#sharing_selection').css('top', '12px');

                    break;

                case 'fullscreen':

                    // floating video panel
                    const marginX = 15;
                    const marginTop = 60;
                    const marginBottom = 14;

                    var conw = this.domMain.width();
                    var conh = this.domMain.height();

                    const fw = $('#floating_layer').width();
                    const fh = fw / 16 * 9;
                    const fx = 0;
                    const fy = 0;

                    $('#floating_layer').css('top', marginTop);
                    $('#floating_layer').css('right', 10);

                    // sharing
                    $('#con_left').velocity({ width: conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue) => {
                            this.setSharingLayout();
                        } });
                    $('#hud').velocity({ width: conw }, { duration: duration_l, queue: false });

                    $('#sharing_layer').css('top', '0');
                    var height = '100%';
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height: height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height: height }, { duration: duration_l, queue: false });

                    $('#sharing_selection').css('top', '12px');

                    this.setFloatingViewMode('active-speaker', false);

                    break;
            }

            //setTimeout(()=>{
            this.changeMode(mode);
            this.setVideoPage(false);
            //}, duration_l);

            this.setSwitch();
        },

        setFloatingViewMode(mode, animated) {

            let duration_l;
            let duration_s;
            if (animated) {
                duration_l = 500;
                duration_s = 300;
            } else {
                duration_l = 0;
                duration_s = 0;
            }

            switch (mode) {
                case 'strip':

                    var col = 3;
                    var margin = 1;

                    var conw = $('#floating_layer').width();
                    var bigvh = Math.floor(conw / 16 * 9);

                    var vw = (conw - (col - 1) * margin) / col;
                    var vh = vw / 16 * 9;

                    var conh = bigvh + vh + margin;

                    var spw = vw * col + margin * (col - 1);
                    var sph = vh;
                    var spl = 0;
                    var spt = bigvh + margin;

                    $('#floating_layer').css('height', conh);

                    // video layout
                    $('#fl_active_speaker_layer').velocity({ opacity: 1, width: conw, height: bigvh }, { duration: duration_l, queue: false });
                    $('#fl_video_scrollpane').velocity({ opacity: 1, left: spl, top: spt, width: spw, height: sph }, { duration: duration_l, queue: false });
                    $('#fl_video_list .video_item').each((index, itm) => {
                        let left = index * (vw + margin);
                        $(itm).velocity({ left: left, top: 0, width: vw, height: vh }, { duration: duration_l, queue: false });
                    });

                    break;

                case 'grid':
                    var col = 2;
                    var row = 3;

                    var pagesize = col * row;
                    var margin = 1;
                    var conw = $('#floating_layer').width();

                    var vw = Math.ceil((conw - (col - 1) * margin) / col);
                    var vh = vw / 16 * 9;

                    var conh = (vh + margin) * row - margin;

                    var spw = conw;
                    var sph = (vh + margin) * row;
                    var spl = 0;
                    var spt = 0;
                    var vleft = 0;

                    $('#floating_layer').css('height', conh);

                    // video layout
                    $('#video_layer').velocity({ left: 0, top: 0, width: conw, height: '100%' }, { duration: duration_l, queue: false });

                    $('#fl_active_speaker_layer').velocity({ opacity: 0 }, { duration: duration_l, queue: false });
                    $('#fl_video_scrollpane').velocity({ opacity: 1, left: spl, top: spt, width: spw, height: sph }, { duration: duration_l, queue: false });

                    var pnum = this.peopleList.length;
                    $('#fl_video_list .video_item').each((index, itm) => {

                        let top = Math.floor(index / col) * (vh + margin);
                        let left = index % col * (vw + margin);

                        $(itm).velocity({ left: left, top: top, width: vw, height: vh }, { duration: duration_l, queue: false });
                    });

                    break;

                case 'active-speaker':

                    var conw = $('#floating_layer').width();
                    var bigvh = Math.floor(conw / 16 * 9);

                    $('#floating_layer').css('height', bigvh);

                    $('#fl_active_speaker_layer').velocity({ opacity: 1, width: conw, height: bigvh }, { duration: duration_l, queue: false });
                    $('#fl_video_scrollpane').velocity({ opacity: 0 }, { duration: duration_l, queue: false });

                    break;

            }

            //setTimeout(()=>{
            this.changeFloatingMode(mode);
            //}, duration_l);

            this.setSwitch2();

            $('.floatingctrl').fadeIn();
        },

        resumeVideo() {
            clearTimeout(this.tmoResumeVideo);
            this.tmoResumeVideo = setTimeout(() => {
                let vds = $('#video_layer').find('video');
                let len = vds.length;
                for (let i = 0; i < len; i++) {
                    if ($(vds[i])[0].src.indexOf('.mp4') > -1) {
                        vds.get(i).play();
                    }
                }
            }, 20);
        },

        togglePopInfo(evt) {
            if (this.popInfoVisible) {
                this.$store.commit('popInfoVisible', false);
            } else {
                this.$store.commit('popInfoVisible', true);
            }
        },
        toggleFullscreen(evt) {
            if (!this.fullscreen) {
                this.launchFullscreen();
            } else {
                if (this.currentSharing !== null) {
                    this.$store.commit('videoSharingSwitched', false);
                    this.switchTo('strip', false);
                }
                this.exitFullscreen();
            }
        },
        togglePanelMenu(evt) {
            if (this.popmenuPanelVisible) {
                this.$store.commit('popmenuPanelVisible', false);
            } else {
                this.$store.commit('popmenuPanelVisible', true);
            }
        },
        toggleTools(evt) {
            if (this.annotationToolsVisible) {
                this.$store.commit('annotationToolsVisible', false);
            } else {
                this.$store.commit('annotationToolsVisible', true);
            }
        },
        toggleDocThumbs(evt) {
            if (this.docThumbsVisible) {
                this.$store.commit('docThumbsVisible', false);
            } else {
                this.$store.commit('docThumbsVisible', true);
            }
        },
        onResize() {
            this.setViewMode(this.videoLayoutMode, false);
            this.initDrag();
        },
        initDrag() {
            // self video draggable
            let ww = $('#floating_layer').width();
            let wh = $('#floating_layer').height();

            let offset = $('#con_main').offset();
            let panew = $('#con_main').width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew - ww - marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + $('#con_left').height() - wh - marginBottom;
            $('#floating_layer').draggable({
                stack: '.floating_window',
                containment: [x1, y1, x2, y2],
                start: () => {},
                drag: () => {},
                stop: () => {}
            });
        },
        swapZindex(elemid) {
            this.floatingZindex++;
            $('#' + elemid).css('z-index', this.floatingZindex);
        },
        setSharingLayout() {
            if (this.currentSharing === null) {
                return;
            }
            if ($('#sharing_layer').length == 0 || $('#annotation_tools').length == 0) {
                setTimeout(() => {
                    this.setSharingLayout();
                }, 10);
                return;
            }

            // thumbs
            let thumbswidth = 0;
            if (this.docThumbsVisible) {
                thumbswidth += 160;
                $('#sharing_layer .doc .thumbs').velocity({ width: thumbswidth }, { duration: 300, queue: false });
            } else {
                $('#sharing_layer .doc .thumbs').velocity({ width: 0 }, { duration: 300, queue: false });
            }

            let contop;
            let con_h = $('#sharing_layer').attr('con-height');
            if (con_h == '100%') {
                contop = 0;
                con_h = $('#sharing_layer').height();
            } else {
                contop = $('#sharing_layer').height() - Number(con_h);
            }

            // tools
            let margin = 15;
            let left;
            let top;
            if (this.currentSharing == 'doc') {

                left = margin;
                if (this.docThumbsVisible) {
                    left += thumbswidth;
                }
                if (this.annotationToolsVisible) {
                    left += $('#annotation_tools').width();
                }
                top = contop + (con_h - $('#sharing_tools').height()) / 2;
            } else if (this.currentSharing == 'screen') {

                left = margin;
                if (this.annotationToolsVisible) {
                    left += $('#annotation_tools').width();
                }
                top = contop + (con_h - $('#sharing_tools').height()) / 2;
            }
            $('#sharing_tools').css('top', top + 'px');
            $('#sharing_tools').velocity({ left: left }, { duration: 300, queue: false });

            // annotation
            let t = contop;
            let h = con_h;
            //$('#annotation_tools').css('top', t+'px');
            $('#annotation_tools').css('height', h + 'px');
        },
        launchFullscreen() {
            this.$store.commit('fullscreen', true);
            this.domMain.css('height', '100%');
        },
        exitFullscreen() {
            this.$store.commit('fullscreen', false);
            this.domMain.css('height', 'calc(100% - ' + this.headerHeight + 'px)');
        },
        onMousemove(evt) {
            if (this.actionFreezed) {
                return;
            }

            this.showHud();
            clearTimeout(this.itvHideHud);

            let hit = false;
            $('.hudelem').each((index, element) => {
                if ($(element).hitTest(evt.pageX, evt.pageY)) {
                    hit = true;
                }
            });
            if (!hit && !this.popAVConnectionVisible) {
                this.itvHideHud = setTimeout(() => {
                    this.hideHud();
                }, 5000);
            }

            if (this.videoLayoutMode == 'fullscreen' && !this.floatingCollapsed) {
                if ($('#floating_layer').hitTest(evt.pageX, evt.pageY)) {
                    $('.floatingctrl').css('opacity', 1);
                }
                hit = false;
                $('.floatingctrl').each((index, element) => {
                    if ($(element).hitTest(evt.pageX, evt.pageY)) {
                        hit = true;
                    }
                });
                if (!hit && !$('#floating_layer').hitTest(evt.pageX, evt.pageY)) {
                    $('.floatingctrl').css('opacity', 0);
                }
            }
        },
        hideHud() {
            this.domHud.stop().velocity({ opacity: 0 }, { duration: 500, queue: false });
            this.$store.commit('popInfoVisible', false);
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('popmenuMoreVisible', false);
            this.$store.commit('popAudioVisible', false);
            this.$store.commit('popVideoVisible', false);
            this.$store.commit('popShareVisible', false);
            this.$store.commit('popRecordVisible', false);
            //this.$store.commit('popLockPeopleVisible', false);
            this.$store.commit('popmenuSwitchSharingVisible', false);

            $('.ico_lockpeople').stop().velocity({ opacity: 0 }, { duration: 500, queue: false });

            $('.video_controls').hide();
        },
        showHud() {
            if (this.domHud.css('opacity') == 0) {
                this.domHud.velocity({ opacity: 1 }, { duration: 500, queue: false });
                $('.ico_lockpeople').stop().velocity({ opacity: 1 }, { duration: 500, queue: false });
            }
        },
        onKeydown(evt) {
            if (evt.code == 'KeyS' && evt.altKey) {
                if (this.videoSharingSwitched || this.videoLayoutMode == 'fullscreen' || this.peopleList.length < 3) {
                    return;
                }
                // Alt + S
                if (this.currentSharing === null) {
                    if (this.peopleList.length < 6) {
                        this.addAllPeople();
                    }
                    // start sharing
                    this.$store.commit('currentSharing', 'doc');
                } else {
                    // stop sharing
                    this.$store.commit('currentSharing', null);
                }
                setTimeout(() => {
                    this.setSwitch();
                }, 10);
            } else if (evt.code == 'Equal' && this.currentSharing == null) {
                // =
                this.addPeople();
            } else if (evt.code == 'KeyC' && evt.altKey) {
                let chatMsgList;
                if (this.chatPanelVisible) {
                    chatMsgList = [{
                        name: 'Emma Hirst',
                        to: 'everyone',
                        msg: 'In March we announced the evolution of our Engineering organization to better reflect our strategic priorities, and align around four areas that are critical to our customers’ needs: Networking and Market Segments, Cloud Services and Platforms, IoT and Applications, and Security.  Today, I’m excited to share the next steps in that evolution.',
                        unread: false
                    }, {
                        name: 'Emma Hirst',
                        to: 'everyone',
                        msg: 'I would like to thank Nick once again for his leadership and dedication over the past 8 years. He is a great friend, and I have learned so much working with him over my career at company as I’ve witnessed the many innovations that engineering delivers each day.',
                        unread: false
                    }];
                } else {
                    chatMsgList = [{
                        name: 'Elizabeth Wu',
                        to: 'you',
                        msg: 'Hi, Alison~ Could you please start sharing your PowerPoint slides?',
                        unread: true
                    }];
                }

                this.$store.commit('chatMsgList', chatMsgList);
                this.showHud();
            }
        },
        addPeopleOneByOne() {
            if (this.peopleNotJoinedList.length > 0) {
                setTimeout(() => {
                    this.addPeopleOneByOne();
                }, 2000);

                this.addPeople();
            }
        },
        addPeople() {
            if (this.peopleNotJoinedList.length > 0) {
                let plist1, plist2;
                plist1 = this.peopleList.slice();
                plist2 = this.peopleNotJoinedList.slice();
                if (this.peopleNotJoinedList.length > 0) {
                    let p = plist2.shift();
                    plist1.push(p);
                }

                this.$store.commit('peopleList', plist1);
                this.$store.commit('peopleNotJoinedList', plist2);
            }
        },
        addAllPeople() {
            let plist1, plist2;
            plist1 = this.peopleList.slice();
            plist2 = this.peopleNotJoinedList.slice();
            plist1 = plist1.concat(plist2);
            plist2 = [];
            this.$store.commit('peopleList', plist1);
            this.$store.commit('peopleNotJoinedList', plist2);
        },
        showPopmenuSwitchSharing(evt) {
            if (!this.popmenuSwitchSharingVisible) {
                let appos = $('#mainclient').offset();
                let left = $('#sharing_selection').width() / 2;
                let top = $('#sharing_selection').offset().top - appos.top + $('#sharing_selection').height();
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popmenuSwitchSharingVisible', true);
            } else {
                this.$store.commit('popmenuSwitchSharingVisible', false);
            }
        },
        toggleLockPeople(evt) {
            if (!this.popLockPeopleVisible && this.lockedPeopleName == null) {
                let appos = $('#mainclient').offset();
                let left = $('.ico_lockpeople').position().left + $('.ico_lockpeople').width() / 2 + 8;
                let top = $('.ico_lockpeople').offset().top - appos.top + $('.ico_lockpeople').height() + 15;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popLockPeopleVisible', true);
            } else {
                this.$store.commit('lockedPeopleName', null);
            }
        },
        goPrevVideoPage() {
            this.videoPageIndex--;
            this.setVideoPage(true);
        },
        goNextVideoPage() {
            this.videoPageIndex++;
            this.setVideoPage(true);
        },
        setVideoPage(animated) {
            let duration = animated ? 300 : 0;

            let itmNum = this.peopleList.length - 1;
            let totalPages = Math.ceil(itmNum / this.videoPagesize);
            this.videoPageIndex = Math.min(this.videoPageIndex, totalPages - 1);
            this.videoPageIndex = Math.max(this.videoPageIndex, 0);

            if (this.videoPageIndex == 0) {
                $('#btn_video_prev').addClass('disabled');
            } else {
                $('#btn_video_prev').removeClass('disabled');
            }
            if (this.videoPageIndex == totalPages - 1) {
                $('#btn_video_next').addClass('disabled');
            } else {
                $('#btn_video_next').removeClass('disabled');
            }

            if (this.videoLayoutMode == 'strip') {
                var margin = 1;
                var vw = 120;
                var left = -this.videoPageIndex * this.videoPagesize * (vw + margin);
                if (this.videoPageIndex == totalPages - 1) {
                    left = -(itmNum - this.videoPagesize) * (vw + margin);
                }
                $('#video_list').velocity({ left: left }, { duration: duration, queue: false });
            } else if (this.videoLayoutMode == 'grid') {
                var margin = 1;
                var vw = this.gridViewItemWidth;
                var left = -this.videoPageIndex * this.gridViewCol * (vw + margin);
                if (this.videoPageIndex == totalPages - 1) {
                    left = -(Math.ceil(itmNum / this.gridViewRow) - this.gridViewCol) * (vw + margin);
                }
                $('#video_list').velocity({ left: left }, { duration: duration, queue: false });
            } else if (this.videoLayoutMode == 'side-by-side') {

                itmNum = this.gridViewCol > 1 ? this.peopleList.length - 2 : this.peopleList.length - 1;
                totalPages = Math.ceil(itmNum / this.videoPagesize);
                this.videoPageIndex = Math.min(this.videoPageIndex, totalPages - 1);
                this.videoPageIndex = Math.max(this.videoPageIndex, 0);

                if (this.videoPageIndex == 0) {
                    $('#btn_video_prev').addClass('disabled');
                } else {
                    $('#btn_video_prev').removeClass('disabled');
                }
                if (this.videoPageIndex == totalPages - 1) {
                    $('#btn_video_next').addClass('disabled');
                } else {
                    $('#btn_video_next').removeClass('disabled');
                }

                var margin = 1;
                var vw = this.gridViewItemWidth;
                var left = -this.videoPageIndex * this.gridViewCol * (vw + margin);
                if (this.videoPageIndex > 0 && this.videoPageIndex == totalPages - 1) {
                    var col_last = Math.ceil(itmNum % this.videoPagesize / this.gridViewRow);
                    left = -(Math.ceil(itmNum / this.gridViewRow) - this.gridViewCol) * (vw + margin);
                }

                $('#video_list').css('left', 0);
                $('#video_list .video_item').each((index, itm) => {
                    var isas = $(itm).attr('is-active-speaker');
                    if (isas == 0 && this.gridViewCol > 1 || this.gridViewCol == 1) {
                        var l = left + Number($(itm).attr('ori-left'));
                        $(itm).velocity({ left: l }, { duration: duration, queue: false });
                    }
                });
            }

            if (totalPages <= 1 || this.gridViewRow == 0) {
                $('#btn_video_prev').hide();
                $('#btn_video_next').hide();
            } else {
                $('#btn_video_prev').show();
                $('#btn_video_next').show();
            }
        }
    }
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        videoLayoutPrepareMode() {
            return this.$store.state.videoLayoutPrepareMode;
        },
        contentWidth() {
            return this.$store.state.rightPanelContentWidth + 'px';
        },
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        rightPanelContentWidth() {
            return this.$store.state.rightPanelContentWidth;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        anyOpenPanel() {
            return this.$store.getters.anyOpenPanel;
        },
        plistPanelVisible() {
            return this.$store.state.plistPanelVisible;
        },
        plistPanelClsed() {
            return this.$store.state.plistPanelClsed;
        },
        chatPanelVisible() {
            return this.$store.state.chatPanelVisible;
        },
        chatPanelClsed() {
            return this.$store.state.chatPanelClsed;
        },
        hasOtherOpenPanel() {
            return this.plistPanelVisible && !this.plistPanelClsed || this.chatPanelVisible && !this.chatPanelClsed;
        }
    },
    mounted() {},
    watch: {
        panelVisible(newVal) {

            let conwidth = this.rightPanelContentWidth;
            let endw;
            if (this.panelVisible) {
                endw = conwidth;
            } else {
                endw = 0;
            }

            if (this.panelVisible) {

                $('#con_panel').velocity({
                    width: endw
                    //scale: 1,
                }, {
                    duration: 0,
                    queue: false,
                    progress: (elements, complete, remaining, start, tweenValue) => {
                        this.$store.commit('rightPanelWidth', this.panelVisible ? conwidth * complete : conwidth * (1 - complete));
                    },
                    complete: elements => {
                        this.$store.commit('rightPanelWidth', endw);
                    }
                });
            } else {

                let right = this.videoLayoutMode != 'side-by-side' ? 30 : conwidth + 30;

                $('#con_panel').velocity({
                    width: 0,
                    //scale: 0,
                    height: '0%',
                    top: 26,
                    right: right
                }, {
                    duration: 0,
                    queue: false,
                    progress: (elements, complete, remaining, start, tweenValue) => {
                        this.$store.commit('rightPanelWidth', this.panelVisible ? conwidth * complete : conwidth * (1 - complete));
                    },
                    complete: elements => {
                        this.$store.commit('rightPanelWidth', endw);
                        //$('#con_panel').css('transform', 'scale(1)');
                        $('#con_panel').css('width', 0);
                        $('#con_panel').css('height', '100%');
                        $('#con_panel').css('top', 0);
                        $('#con_panel').css('right', 0);
                        //$('#con_panel').attr('style', '');
                    }
                });
            }
        },
        rightPanelContentWidth(newVal) {
            $('#con_panel').css('width', newVal + 'px');
        },
        fullscreen(newVal) {
            if (newVal) {
                this.$store.commit('panelVisible', false);
            }
            if (this.anyOpenPanel && !newVal) {
                this.$store.commit('panelVisible', true);
            }
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.layout(10);
                if (cnt >= 50) {
                    clearInterval(itv);
                }
            }, 10);
        },
        anyOpenPanel(newVal) {
            if (!newVal) {
                this.$store.commit('panelVisible', false);
            }
        },
        videoLayoutPrepareMode(newVal) {
            this.layout();
        },
        rightPanelWidth(newVal) {
            this.layout(0);
        }
    },
    methods: {
        layout(duration = 300) {
            let righth = $('#con_panel').height();
            let panelh = 0;
            if (this.videoLayoutPrepareMode == 'side-by-side') {
                let h = this.rightPanelWidth / 16 * 9 + 1;
                $('#con_panel .video_area').velocity({ height: h }, { duration: duration, queue: false });
                //$('#con_panel .video_area').css('height', h);
                panelh = righth - h;
            } else {
                $('#con_panel .video_area').velocity({ height: 0 }, { duration: duration, queue: false });
                //$('#con_panel .video_area').css('height', 0);
                panelh = righth;
            }

            if (panelh < 300) {
                if (this.plistPanelVisible) {
                    this.$store.commit('plistPanelClsed', true);
                }
            }
        }
    }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            name: 'Cisco WebEx Meeting Center'
        };
    },
    computed: {
        headerHeight() {
            return this.$store.state.headerHeight;
        },
        height() {
            return this.headerHeight + 'px';
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        recording() {
            return this.$store.state.recording;
        },
        locked() {
            return this.$store.state.locked;
        }

    }
});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            truncated: false,
            newMsgAlert: false
        };
    },
    computed: {
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        videoFloatingLayoutMode() {
            return this.$store.state.videoFloatingLayoutMode;
        },
        videoSharingSwitched() {
            return this.$store.state.videoSharingSwitched;
        },
        audioConnected() {
            return this.$store.state.audioConnected;
        },
        videoConnected() {
            return this.$store.state.videoConnected;
        },
        muted() {
            return this.$store.state.muted;
        },
        cameraOn() {
            return this.$store.state.cameraOn;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        recording() {
            return this.$store.state.recording;
        },
        locked() {
            return this.$store.state.locked;
        },
        currentSharing() {
            return this.$store.state.currentSharing;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        },
        popAVConnectionVisible() {
            return this.$store.state.popAVConnectionVisible;
        },
        popRecordVisible() {
            return this.$store.state.popRecordVisible;
        },
        popAudioVisible() {
            return this.$store.state.popAudioVisible;
        },
        popVideoVisible() {
            return this.$store.state.popVideoVisible;
        },
        popShareVisible() {
            return this.$store.state.popShareVisible;
        },
        poptipVisible() {
            return this.$store.state.poptipVisible;
        },
        popmenuMoreVisible() {
            return this.$store.state.popmenuMoreVisible;
        },
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        plistPanelVisible() {
            return this.$store.state.plistPanelVisible;
        },
        chatPanelVisible() {
            return this.$store.state.chatPanelVisible;
        },
        notesPanelVisible() {
            return this.$store.state.notesPanelVisible;
        },
        hasOpenPanel() {
            return this.$store.state.plistPanelVisible || this.$store.state.chatPanelVisible || this.$store.state.notesPanelVisible;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        chatMsgList() {
            return this.$store.state.chatMsgList;
        }

    },
    mounted() {
        this.onResize();
        window.addEventListener('resize', this.onResize);
    },
    watch: {
        panelVisible(newVal) {
            this.setResize();
        },
        audioConnected(newVal) {
            this.setResize();
        },
        plistPanelVisible(newVal) {
            this.setResize();
        },
        chatPanelVisible(newVal) {
            this.setResize();
        },
        rightPanelWidth(newVal) {
            this.setResize();
        },
        videoLayoutMode(newVal) {
            this.setResize();
        },
        fullscreen(newVal) {
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.onResize();
                if (cnt >= 50) {
                    clearInterval(itv);
                }
            }, 10);
        },
        chatMsgList(newVal) {
            let msgs = this.$store.getters.unreadMessages;
            this.newMsgAlert = msgs && msgs.length > 0 && !this.chatPanelVisible;

            if (this.newMsgAlert) {
                let firstmsg = this.chatMsgList.find(msg => msg.unread);

                this.$store.commit('poptipText', firstmsg.name + ': ' + firstmsg.msg);

                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_chat').offset();
                let left = offset.left - appos.left + $('#controls .btn_chat').width() / 2;
                let top = offset.top - appos.top;

                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('poptipVisible', true);
            }
        }
    },
    methods: {
        setResize() {
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.onResize();
                if (cnt >= 10) {
                    clearInterval(itv);
                }
            }, 10);
        },
        toggleAudioConnection(evt) {
            if (!this.popAudioVisible) {
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_audio').offset();
                let left = offset.left - appos.left + $('#controls .btn_audio').width() / 2;
                let top = offset.top - appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popAudioVisible', true);
            } else {
                this.$store.commit('popAudioVisible', false);
            }
        },
        toggleVideoConnection(evt) {
            if (!this.popVideoVisible) {
                let btn;
                if ($('#controls .btn_cam').length > 0) {
                    btn = $('#controls .btn_cam');
                } else {
                    btn = $('#controls .btn_video');
                }
                let appos = $('#mainclient').offset();
                let offset = btn.offset();
                let left = offset.left - appos.left + btn.width() / 2;
                let top = offset.top - appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popVideoVisible', true);
            } else {
                this.$store.commit('popVideoVisible', false);
            }
        },
        toggleMute(evt) {
            if (this.muted) {
                this.$store.commit('muted', false);
            } else {
                this.$store.commit('muted', true);
            }
        },
        toggleVideo(evt) {
            if (this.cameraOn) {
                this.$store.commit('cameraOn', false);
            } else {
                this.$store.commit('cameraOn', true);
            }
        },
        showPopShare(evt) {
            if (!this.popShareVisible) {
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_share').offset();
                let left = offset.left - appos.left + $('#controls .btn_share').width() / 2;
                let top = offset.top - appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popShareVisible', true);
            } else {
                this.$store.commit('popShareVisible', false);
            }
        },
        toggleRecord(evt) {
            if (this.popRecordVisible) {
                this.$store.commit('popRecordVisible', false);
            } else {
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_record').offset();
                let left = offset.left - appos.left + $('#controls .btn_record').width() / 2;
                let top = offset.top - appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popRecordVisible', true);
            }
        },
        toggleLock(evt) {
            if (this.locked) {
                this.$store.commit('locked', false);
                this.$store.commit('poptipText', 'The meeting room is unlocked.');
            } else {
                this.$store.commit('locked', true);
                this.$store.commit('poptipText', 'The meeting room is locked.');
            }

            let appos = $('#mainclient').offset();
            let offset = $('#controls .btn_lock').offset();
            let left = offset.left - appos.left + $('#controls .btn_lock').width() / 2;
            let top = offset.top - appos.top;

            this.$store.commit('popStartPoint', [left, top]);
            this.$store.commit('poptipVisible', true);
        },
        showPopmenuMore(evt) {
            if (!this.popmenuMoreVisible) {
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_more').offset();
                let left = offset.left - appos.left + $('#controls .btn_more').width() / 2;
                let top = offset.top - appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popmenuMoreVisible', true);
            } else {
                this.$store.commit('popmenuMoreVisible', false);
            }
        },
        togglePlist(evt) {
            if (this.fullscreen) {
                this.$store.commit('plistPanelVisible', !this.plistPanelVisible);
                return;
            }
            this.$store.commit('plistPanelVisible', !this.plistPanelVisible);
            if (!this.panelVisible && this.hasOpenPanel) {
                this.$store.commit('panelVisible', true);
            } else if (this.panelVisible && !this.hasOpenPanel) {
                this.$store.commit('panelVisible', false);
            }
        },
        toggleChat(evt) {
            if (this.newMsgAlert) {
                this.$store.commit('poptipVisible', false);
                this.newMsgAlert = false;
            }

            if (this.fullscreen) {
                this.$store.commit('chatPanelVisible', !this.chatPanelVisible);
                return;
            }

            this.$store.commit('chatPanelVisible', !this.chatPanelVisible);
            if (!this.panelVisible && this.hasOpenPanel) {
                this.$store.commit('panelVisible', true);
            } else if (this.panelVisible && !this.hasOpenPanel) {
                this.$store.commit('panelVisible', false);
            }
        },
        onResize() {
            let btnw = 52 + 8;
            let hudw = $('#hud').width();
            let btnnum = $('#controls .btn').length;
            let ctrlw = btnnum * btnw;
            let left = 0;
            const margin = 20;
            const arrw = 20;
            if (hudw > ctrlw + margin * 2) {
                this.truncated = false;
                left = (hudw - ctrlw) / 2;
                $('#controls .btn').show();
            } else {
                let visiblenum = Math.floor((hudw - margin * 2 - arrw) / btnw);
                $('#controls .btn').each(function (index, el) {
                    if (index < visiblenum) {
                        $(el).show();
                    } else {
                        $(el).hide();
                    }
                });
                this.truncated = true;
                ctrlw = visiblenum * btnw + arrw;
                left = (hudw - ctrlw) / 2;
            }
            $('#controls').css('left', left);
        },
        mouseover(evt) {
            this.truncated = false;
            $('#controls .btn').show();
            window.addEventListener('mousemove', this.mousemove);
        },
        mousemove(evt) {
            if (!$('#controls').hitTest(evt.pageX, evt.pageY)) {
                this.onResize();
                window.removeEventListener('mousemove', this.mousemove);
            }
        }
    }

});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    mounted() {
        if (!validateBrowser()) {
            $('.alert').show();
            $('.btn_start').addClass('disabled');
        }
    },
    computed: {
        fullscreen() {
            return this.$store.state.fullscreen;
        }
    },
    methods: {
        start(evt) {
            $('#ptcover').remove();
            $('#desktop').hide();

            setTimeout(() => {
                this.launchFullscreen();
            }, 50);

            setTimeout(() => {
                $('#desktop').show();
            }, 800);
        },
        launchFullscreen() {
            let element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    }
});

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['name', 'host', 'video', 'telepresence'],
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    watch: {},
    methods: {
        lockPeople(evt) {
            if (this.telepresence || this.video == null) {
                return;
            }
            this.$store.commit('lockedPeopleName', this.name);
            this.$store.commit('popLockPeopleVisible', false);
        }
    }
});

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {
        inMeeting() {
            return this.$store.state.inMeeting;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        }
    }
});

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const marginX = 15;
const marginTop = 60;
const marginBottom = 14;

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['floating'],
    data() {
        return {
            title: 'Chat',
            message: ''
        };
    },
    computed: {
        height() {
            if (this.fixHeight && !this.fullscreen) {
                return this.videoLayoutMode != 'side-by-side' ? '310px' : '270px';
            } else {
                return 'auto';
            }
        },
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        chatPanelVisible() {
            return this.$store.state.chatPanelVisible;
        },
        chatPanelClsed() {
            return this.$store.state.chatPanelClsed;
        },
        plistPanelClsed() {
            return this.$store.state.plistPanelClsed;
        },
        fixHeight() {
            return !this.chatPanelClsed && this.$store.state.plistPanelVisible && !this.$store.state.plistPanelClsed && !this.fullscreen;
        },
        flexNone() {
            return this.chatPanelClsed || this.fixHeight;
        },
        peopleList() {
            return this.$store.state.peopleList;
        },
        chatMsgList() {
            return this.$store.state.chatMsgList;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        plistPanelVisible() {
            return this.$store.state.plistPanelVisible;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        }
    },
    mounted() {

        // set scrollbar style
        $('#chat_panel .scrollpane').niceScroll({
            cursorwidth: "7px",
            cursorcolor: "rgba(0,0,0,0.5)",
            cursorborder: "2px solid rgba(255,255,255,0)"
        });

        this.initDrag();

        if (this.floating) {
            $('#floating_chat').resizable({
                handles: "all",
                maxHeight: 550,
                maxWidth: 550,
                minHeight: 200,
                minWidth: 200,
                resize: () => {
                    this.onResize();
                },
                stop: () => {
                    this.onResize();
                }
            });
        }

        window.addEventListener('resize', this.onResize);
    },
    watch: {
        chatPanelVisible(newVal) {
            setTimeout(() => {
                this.onResize();
            }, 10);

            if (newVal) {
                // mark all as read
                for (var i in this.chatMsgList) {
                    this.chatMsgList[i].unread = false;
                }
                this.$store.commit('chatMsgList', this.chatMsgList);
            }
        },
        rightPanelWidth(newVal) {
            this.onResize();
        },
        videoLayoutMode(newVal) {
            setTimeout(() => {
                this.onResize();
            }, 10);
        },
        plistPanelVisible(newVal) {
            setTimeout(() => {
                this.onResize();
            }, 10);
        },
        fullscreen(newVal) {
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.onResize();
                if (cnt >= 100) {
                    clearInterval(itv);
                }
            }, 10);
        },
        chatMsgList(newVal) {
            setTimeout(() => {
                this.onResize();
            }, 10);
        }
    },
    methods: {
        close() {
            this.$store.commit('chatPanelVisible', false);
        },
        collapse() {
            this.$store.commit('chatPanelClsed', !this.chatPanelClsed);
        },
        onResize() {
            if (this.chatPanelVisible) {
                $('#chat_panel .scrollpane').getNiceScroll().resize();
                this.initDrag();
            }
        },
        initDrag() {
            if (!this.floating) {
                return;
            }
            // self video draggable
            let ww = $('#floating_chat').width();
            let wh = $('#floating_chat').height();

            let offset = $('#con_main').offset();
            let panew = $('#con_main').width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew - ww - marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + $('#con_left').height() - wh - marginBottom;
            $('#floating_chat').draggable({
                stack: '.floating_window',
                containment: [x1, y1, x2, y2],
                start: () => {},
                drag: () => {},
                stop: () => {}
            });
        },
        sendmsg() {}
    }
});

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['title', 'type'],
    data() {
        return {};
    },
    computed: {
        plistPanelClsed() {
            return this.$store.state.plistPanelClsed;
        },
        chatPanelClsed() {
            return this.$store.state.chatPanelClsed;
        },
        collapsed() {
            if (this.type == 'plist' && this.plistPanelClsed) {
                return true;
            } else if (this.type == 'chat' && this.chatPanelClsed) {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted() {},
    watch: {},
    methods: {
        close() {
            this.$emit('close');
        },
        collapse() {
            this.$emit('collapse');
        }
    }
});

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const marginX = 15;
const marginTop = 60;
const marginBottom = 14;

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['floating'],
    data() {
        return {
            title: 'Participants'
        };
    },
    computed: {
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        plistPanelVisible() {
            return this.$store.state.plistPanelVisible;
        },
        plistPanelClsed() {
            return this.$store.state.plistPanelClsed;
        },
        peopleList() {
            return this.$store.state.peopleList;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        chatPanelVisible() {
            return this.$store.state.chatPanelVisible;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        flexNone() {
            return this.plistPanelClsed;
        }
    },
    mounted() {

        $('#plist_panel .scrollpane').niceScroll({
            cursorwidth: "7px",
            cursorcolor: "rgba(0,0,0,0.5)",
            cursorborder: "2px solid rgba(255,255,255,0)"
        });

        this.initDrag();

        if (this.floating) {
            $('#floating_plist').resizable({
                handles: "all",
                maxHeight: 550,
                maxWidth: 550,
                minHeight: 200,
                minWidth: 200,
                resize: () => {
                    this.onResize();
                },
                stop: () => {
                    this.onResize();
                }
            });
        }

        window.addEventListener('resize', this.onResize);
    },
    watch: {
        plistPanelVisible(newVal) {
            // set scrollbar style
            setTimeout(() => {
                this.onResize();
            }, 10);
        },
        rightPanelWidth(newVal) {
            this.onResize();
        },
        videoLayoutMode(newVal) {
            setTimeout(() => {
                this.onResize();
            }, 10);
        },
        chatPanelVisible(newVal) {
            setTimeout(() => {
                this.onResize();
            }, 10);
        },
        plistPanelClsed(newVal) {
            if (newVal) {
                $('#plist_panel').removeClass('flex_1');
            } else {
                $('#plist_panel').addClass('flex_1');
            }
        },
        fullscreen(newVal) {
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.onResize();
                if (cnt >= 100) {
                    clearInterval(itv);
                }
            }, 10);
        }
    },
    methods: {
        close() {
            this.$store.commit('plistPanelVisible', false);
        },
        collapse() {
            this.$store.commit('plistPanelClsed', !this.plistPanelClsed);
        },
        onResize() {
            if (this.plistPanelVisible) {
                $('#plist_panel .scrollpane').getNiceScroll().resize();
                this.initDrag();
            }
        },
        initDrag() {
            if (!this.floating) {
                return;
            }
            // self video draggable
            let ww = $('#floating_plist').width();
            let wh = $('#floating_plist').height();

            let offset = $('#con_main').offset();
            let panew = $('#con_main').width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew - ww - marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + $('#con_left').height() - wh - marginBottom;
            $('#floating_plist').draggable({
                stack: '.floating_window',
                containment: [x1, y1, x2, y2],
                start: () => {},
                drag: () => {},
                stop: () => {}
            });
        }
    }
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['name', 'me', 'host', 'avatar', 'video', 'audio', 'muted'],
    data() {
        return {};
    },
    computed: {
        activeSpeakerName() {
            return this.$store.state.activeSpeakerName;
        },
        suffix() {
            let arr = [];
            if (this.me) {
                arr.push('Me');
            }
            if (this.host) {
                arr.push('Host');
            }
            if (arr.length > 0) {
                return '(' + arr.join(', ') + ')';
            }
            return '';
        },
        avatarUrl() {
            if (this.avatar) {
                return 'url(' + this.$store.state.avatarPath + this.avatar + ')';
            } else {
                return 'none';
            }
        },
        abbr() {
            let arr = this.name.split(' ');
            return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
        },
        audioIcoUrl() {
            if (this.name == this.activeSpeakerName) {
                return 'url(../img/icon/ico_plist_active_speaker.svg)';
            } else if (this.audio == 'mobile') {
                return 'url(../img/icon/ico_plist_mobile.svg)';
            } else if (this.audio == 'pc' && !this.muted) {
                return 'url(../img/icon/ico_plist_pc.svg)';
            } else if (this.audio == 'pc' && this.muted) {
                return 'url(../img/icon/ico_plist_pc_muted.svg)';
            } else if (this.audio == 'phone' && !this.muted) {
                return 'url(../img/icon/ico_plist_phone.svg)';
            } else if (this.audio == 'phone' && this.muted) {
                return 'url(../img/icon/ico_plist_phone_muted.svg)';
            } else {
                return 'none';
            }
        }
    },
    mounted() {},
    watch: {},
    methods: {}
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            domParent: null,
            domSelf: null
        };
    },
    computed: {
        popAudioVisible() {
            return this.$store.state.popAudioVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        }
    },
    mounted() {
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_audio');
    },
    watch: {
        popAudioVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_audio').css('left', left + 'px');
                $('#pop_audio').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }

    },
    methods: {
        onMouseDown(evt) {
            if (($('#controls .btn_audio').length > 0 && !$('#controls .btn_audio').hitTest(evt.pageX, evt.pageY) || $('#controls .btn_mute').length > 0 && !$('#controls .btn_mute').hitTest(evt.pageX, evt.pageY)) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY)) {
                this.close();
            }
        },
        connectAudio(evt) {
            this.$store.commit('audioConnected', true);
            this.close();
        },
        close(evt) {
            this.$store.commit('popAudioVisible', false);
        }
    }

});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            timer: null,
            domParent: null,
            domSelf: null
        };
    },
    computed: {
        popAVConnectionVisible() {
            return this.$store.state.popAVConnectionVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        }
    },
    mounted() {
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_ac_connection');
        this.initCam();
    },
    watch: {
        popAVConnectionVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_ac_connection').css('left', left + 'px');
                $('#pop_ac_connection').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }

    },
    methods: {
        initCam() {
            var selfViewVideo = document.getElementById('camera_preview_av');

            // play if video stops playing
            var success = stream => {
                window.selfStream = stream;
                selfViewVideo.src = window.URL.createObjectURL(stream);
                selfViewVideo.addEventListener('pause', window.playVideoElement);
            };
            var videoError = error => {
                console.log(error);
            };
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
            if (navigator.getUserMedia) {
                navigator.getUserMedia({ video: true }, success, videoError);
            }
        },
        onMouseDown(evt) {
            if (!$('#controls .btn_audio').hitTest(evt.pageX, evt.pageY) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY)) {
                this.$store.commit('popAVConnectionVisible', false);
            }
        },
        connectAudioVideo(evt) {
            this.$store.commit('audioConnected', true);
            this.$store.commit('videoConnected', true);
            this.close();
        },
        close(evt) {
            this.$store.commit('popAVConnectionVisible', false);
        }
    }

});

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {
        host() {
            let people = this.$store.getters.host;
            return people;
        },
        hostName() {
            return this.host.name;
        },
        meetingTitle() {
            return this.$store.state.meetingTitle;
        },
        popInfoVisible() {
            return this.$store.state.popInfoVisible;
        },
        headerHeight() {
            return this.$store.state.headerHeight;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        avatarUrl() {
            if (this.host.avatar) {
                return 'url(' + this.$store.state.avatarPath + this.host.avatar + ')';
            } else {
                return 'none';
            }
        }
    },
    mounted() {},
    watch: {
        popInfoVisible(newVal) {
            if (newVal) {
                if (this.fullscreen) {
                    $('#pop_info').css('top', '0');
                } else {
                    $('#pop_info').css('top', this.headerHeight + 'px');
                }
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }
    },
    methods: {
        onMouseDown(evt) {
            if (!$('.btn_info').hitTest(evt.pageX, evt.pageY) && !$('#pop_info').hitTest(evt.pageX, evt.pageY)) {
                this.$store.commit('popInfoVisible', false);
            }
        }
    }

});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            domParent: null,
            domSelf: null
        };
    },
    computed: {
        popLockPeopleVisible() {
            return this.$store.state.popLockPeopleVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        },
        peopleList() {
            return this.$store.state.peopleList;
        }
    },
    mounted() {
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_lockpeople');
    },
    watch: {
        popLockPeopleVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1];
                $('#pop_lockpeople').css('left', left + 'px');
                $('#pop_lockpeople').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }

    },
    methods: {
        onMouseDown(evt) {
            if (($('#controls .btn_audio').length > 0 && !$('#controls .btn_audio').hitTest(evt.pageX, evt.pageY) || $('#controls .btn_mute').length > 0 && !$('#controls .btn_mute').hitTest(evt.pageX, evt.pageY)) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY)) {
                this.close();
            }
        },
        connectAudio(evt) {
            this.$store.commit('audioConnected', true);
            this.close();
        },
        close(evt) {
            this.$store.commit('popLockPeopleVisible', false);
        }
    }

});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            timer: null
        };
    },
    computed: {
        popRecordVisible() {
            return this.$store.state.popRecordVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        },
        recording() {
            return this.$store.state.recording;
        },
        recordingTime() {
            return this.$store.state.recordingTime;
        },
        formatedRecordingTime() {
            let tm = this.$store.state.recordingTime;
            let h = Math.floor(tm / 3600);
            h = h < 10 ? '0' + h : h;
            let m = Math.floor(tm % 3600 / 60);
            m = m < 10 ? '0' + m : m;
            let s = Math.floor(tm % 60);
            s = s < 10 ? '0' + s : s;
            return h + ':' + m + ':' + s;
        }
    },
    mounted() {},
    watch: {
        popRecordVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_record').css('left', left + 'px');
                $('#pop_record').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        },
        recording: function (newVal) {
            if (newVal) {
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.counter();
                }, 1000);
            } else {
                clearInterval(this.timer);
                this.$store.commit('recordingTime', 0);
            }
        }
    },
    methods: {
        onMouseDown(evt) {
            if (!$('#controls .btn_record').hitTest(evt.pageX, evt.pageY) && $('#pop_record').length && !$('#pop_record').hitTest(evt.pageX, evt.pageY)) {
                this.$store.commit('popRecordVisible', false);
            }
        },
        start(evt) {
            this.$store.commit('recording', true);
        },
        pause(evt) {
            this.$store.commit('recording', true);
        },
        stop(evt) {
            this.$store.commit('recording', false);
        },
        counter() {
            this.$store.commit('recordingTime', this.recordingTime + 1);
        },
        close(evt) {
            this.$store.commit('popRecordVisible', false);
        }
    }

});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            domParent: null,
            domSelf: null
        };
    },
    computed: {
        popShareVisible() {
            return this.$store.state.popShareVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        }
    },
    mounted() {
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_share');
    },
    watch: {
        popShareVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_share').css('left', left + 'px');
                $('#pop_share').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }

    },
    methods: {
        onMouseDown(evt) {
            if (!$('#controls .btn_share').hitTest(evt.pageX, evt.pageY) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY)) {
                this.close();
            }
        },
        close(evt) {
            this.$store.commit('popShareVisible', false);
        }
    }

});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            domParent: null,
            domSelf: null
        };
    },
    computed: {
        popVideoVisible() {
            return this.$store.state.popVideoVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        },
        videoConnected() {
            return this.$store.state.videoConnected;
        }
    },
    mounted() {
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_video');
        this.initCam();
        $('#cam_list').selectmenu();
    },
    watch: {
        popVideoVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_video').css('left', left + 'px');
                $('#pop_video').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }

    },
    methods: {
        initCam() {
            var selfViewVideo = document.getElementById('camera_preview');

            // play if video stops playing
            var success = stream => {
                window.selfStream = stream;
                selfViewVideo.src = window.URL.createObjectURL(stream);
                selfViewVideo.addEventListener('pause', window.playVideoElement);
            };
            var videoError = error => {
                console.log(error);
            };
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
            if (navigator.getUserMedia) {
                navigator.getUserMedia({ video: true }, success, videoError);
            }
        },
        onMouseDown(evt) {
            let btn;
            if ($('#controls .btn_cam').length > 0) {
                btn = $('#controls .btn_cam');
            } else {
                btn = $('#controls .btn_video');
            }
            if (!btn.hitTest(evt.pageX, evt.pageY) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY)) {
                this.close();
            }
        },
        sendVideo(evt) {
            this.$store.commit('videoConnected', true);
            this.close();
        },
        stopVideo(evt) {
            this.$store.commit('videoConnected', false);
            this.close();
        },
        close(evt) {
            this.$store.commit('popVideoVisible', false);
        }
    }

});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {
        popmenuMoreVisible() {
            return this.$store.state.popmenuMoreVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        },
        locked() {
            return this.$store.state.locked;
        }
    },
    mounted() {},
    watch: {
        popmenuMoreVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#popmenu_more').css('left', left + 'px');
                $('#popmenu_more').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }
    },
    methods: {
        showAudioConnection(evt) {

            let appos = $('#mainclient').offset();
            let btn;
            if ($('#controls .btn_audio').length > 0) {
                btn = $('#controls .btn_audio');
            } else {
                btn = $('#controls .btn_mute');
            }
            let offset = btn.offset();
            let left = offset.left - appos.left + btn.width() / 2;
            let top = offset.top - appos.top;
            this.$store.commit('popStartPoint', [left, top]);
            //this.$store.commit('popAVConnectionVisible', true);
            this.$store.commit('popAudioVisible', true);

            this.$store.commit('popmenuMoreVisible', false);
        },
        onMouseDown(evt) {
            if (!$('#controls .btn_more').hitTest(evt.pageX, evt.pageY) && $('#popmenu_more').length && !$('#popmenu_more').hitTest(evt.pageX, evt.pageY)) {
                this.$store.commit('popmenuMoreVisible', false);
            }
        },
        toggleLock(evt) {
            if (this.locked) {
                this.$store.commit('locked', false);
                this.$store.commit('poptipText', 'The meeting room is unlocked.');
            } else {
                this.$store.commit('locked', true);
                this.$store.commit('poptipText', 'The meeting room is locked.');
            }

            /*
            let appos = $('#mainclient').offset();
            let offset = $('#controls .btn_lock').offset();
            let left = offset.left - appos.left + $('#controls .btn_lock').width()/2;
            let top = offset.top- appos.top;
             this.$store.commit('popStartPoint', [left, top]);
            this.$store.commit('poptipVisible', true);
            */

            //this.$store.commit('popmenuMoreVisible', false);
        }
    }

});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            right: '0px',
            width: '196px'
        };
    },
    computed: {
        hasOpenPanel() {
            return this.$store.state.plistPanelVisible || this.$store.state.chatPanelVisible || this.$store.state.notesPanelVisible;
        },
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        headerHeight() {
            return this.$store.state.headerHeight;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        currentSharing() {
            return this.$store.state.currentSharing;
        },
        popmenuPanelVisible() {
            return this.$store.state.popmenuPanelVisible;
        },
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        plistPanelVisible() {
            return this.$store.state.plistPanelVisible;
        },
        chatPanelVisible() {
            return this.$store.state.chatPanelVisible;
        },
        notesPanelVisible() {
            return this.$store.state.notesPanelVisible;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        rightPanelContentWidth() {
            return this.$store.state.rightPanelContentWidth;
        }
    },
    mounted() {},
    watch: {
        popmenuPanelVisible: function (newVal) {
            if (newVal) {
                let rpw = this.panelVisible || this.videoLayoutMode == 'side-by-side' ? this.rightPanelContentWidth : 0;
                this.right = rpw + 32 / 2 + 15 - Number(this.width.substr(0, this.width.length - 2)) / 2 + 'px';
                if (this.fullscreen) {
                    $('#popmenu_panel').css('top', '60px');
                } else {
                    $('#popmenu_panel').css('top', this.headerHeight + 60 + 'px');
                }
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }
    },
    methods: {
        togglePlist(evt) {
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('plistPanelVisible', !this.plistPanelVisible);
            if (!this.panelVisible && this.hasOpenPanel) {
                this.$store.commit('panelVisible', true);
            } else if (this.panelVisible && !this.hasOpenPanel) {
                this.$store.commit('panelVisible', false);
            }
        },
        toggleChat(evt) {
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('chatPanelVisible', !this.chatPanelVisible);
            if (!this.panelVisible && this.hasOpenPanel) {
                this.$store.commit('panelVisible', true);
            } else if (this.panelVisible && !this.hasOpenPanel) {
                this.$store.commit('panelVisible', false);
            }
        },
        toggleNotes(evt) {},
        hidePanels(evt) {
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('panelVisible', false);
        },
        onMouseDown(evt) {
            if (!$('.btn_panel').hitTest(evt.pageX, evt.pageY) && $('#popmenu_panel').length && !$('#popmenu_panel').hitTest(evt.pageX, evt.pageY)) {
                this.$store.commit('popmenuPanelVisible', false);
            }
        }
    }

});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {
        popmenuSwitchSharingVisible() {
            return this.$store.state.popmenuSwitchSharingVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        },
        activeSpeakerName() {
            return this.$store.state.activeSpeakerName;
        },
        currentSharing() {
            return this.$store.state.currentSharing;
        }
    },
    mounted() {},
    watch: {
        popmenuSwitchSharingVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] + 18;
                $('#popmenu_switchsharing').css('left', left + 'px');
                $('#popmenu_switchsharing').css('top', top + 'px');
                window.addEventListener('mousedown', this.onMouseDown);
            } else {
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }
    },
    methods: {
        switchSharing(type) {
            this.$store.commit('currentSharing', type);
            this.$store.commit('popmenuSwitchSharingVisible', false);
        },
        onMouseDown(evt) {
            if (!$('.top_label span').hitTest(evt.pageX, evt.pageY) && $('#popmenu_switchsharing').length && !$('#popmenu_switchsharing').hitTest(evt.pageX, evt.pageY)) {
                this.$store.commit('popmenuSwitchSharingVisible', false);
            }
        }
    }

});

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {
        poptipVisible() {
            return this.$store.state.poptipVisible;
        },
        popStartPoint() {
            return this.$store.state.popStartPoint;
        },
        poptipText() {
            return this.$store.state.poptipText;
        }
    },
    mounted() {},
    watch: {
        poptipVisible: function (newVal) {
            if (newVal) {
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 12 - 5;
                $('#poptip').css('opacity', '1');
                $('#poptip').css('left', left + 'px');
                $('#poptip').css('top', top + 'px');
                $('#poptip').stop().delay(5000).velocity({ opacity: 0 }, { duration: 300, complete: elements => {
                        this.$store.commit('poptipVisible', false);
                    } });
            }
        }
    },
    methods: {
        close(evt) {
            this.$store.commit('poptipVisible', false);
        }
    }

});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//


const marginX = 15;
const marginTop = 60;
const marginBottom = 14;

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            domVideo: null,
            domParent: null,
            domCon: null,
            minimized: false
        };
    },
    computed: {
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        chatPanelVisible() {
            return this.$store.state.chatPanelVisible;
        },
        cameraOn() {
            return this.$store.state.cameraOn;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        },
        headerHeight() {
            return this.$store.state.headerHeight;
        },
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        activeSpeaker() {
            return this.$store.getters.activeSpeaker;
        },
        currentSharing() {
            return this.$store.state.currentSharing;
        },
        floatVideoSize() {
            return this.$store.state.floatVideoSize;
        },
        videoConnected() {
            return this.$store.state.videoConnected;
        }
    },
    mounted() {
        this.domVideo = $('#self_video');
        this.domParent = $('#con_main');
        this.domCon = $('#con_left');
        this.initCam();
        this.initDrag();
        window.addEventListener('resize', this.onResize);
    },
    watch: {
        panelVisible(newVal) {
            this.onResize();
        },
        rightPanelWidth(newVal) {
            this.onResize();
        },
        videoLayoutMode(newVal) {
            if (newVal != 'side-by-side') {
                this.onResize();
            }
        },
        floatVideoSize(newVal) {
            this.onResize();
        },
        videoConnected(newVal) {
            this.moveToCorner(false, 'BR');
        },
        fullscreen(newVal) {
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.onResize();
                if (cnt >= 100) {
                    clearInterval(itv);
                }
            }, 10);
        }
    },
    methods: {
        initCam() {
            var selfViewVideo = document.getElementById('camera');

            // play if video stops playing
            var success = stream => {
                window.selfStream = stream;
                selfViewVideo.src = window.URL.createObjectURL(stream);
                selfViewVideo.addEventListener('pause', window.playVideoElement);
            };
            var videoError = error => {
                console.log(error);
            };
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
            if (navigator.getUserMedia) {
                navigator.getUserMedia({ video: true }, success, videoError);
            }
        },
        initDrag() {
            // self video draggable
            let ww = !this.minimized ? this.domVideo.width() : 20;
            let wh = !this.minimized ? this.domVideo.height() : 20;

            let offset = this.domParent.offset();
            let panew = this.domParent.width(); //this.chatPanelVisible ? (this.domParent.width()-this.rightPanelWidth) : this.domParent.width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew - ww - marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + this.domCon.height() - wh - marginBottom;
            $('#self_video').draggable({
                stack: '.floating_window',
                containment: [x1, y1, x2, y2],
                start: () => {},
                drag: () => {},
                stop: () => {
                    this.moveToCorner(true);
                }
            });
        },
        onResize() {
            this.initDrag();
            this.moveToCorner();
        },
        moveToCorner(animated = false, corner = null) {
            if ($('#self_video').hasClass('fixedPosition')) {
                return;
            }
            let ww = !this.minimized ? this.domVideo.width() : 20;
            let wh = !this.minimized ? this.domVideo.height() : 20;

            let ox = this.domVideo.position().left + ww / 2;
            let oy = this.domVideo.position().top + wh / 2;
            let panew = this.domParent.width(); //this.chatPanelVisible ? (this.domParent.width()-this.rightPanelWidth) : this.domParent.width();
            let pox = panew / 2;
            let poy = this.domCon.height() / 2;
            let top, left;
            if (corner == 'TL' || corner === null && ox <= pox && oy <= poy) {
                // TL
                top = marginTop;
                left = marginX;
            } else if (corner == 'TR' || corner === null && ox > pox && oy <= poy) {
                // TR
                top = marginTop;
                left = panew - ww - marginX;
            } else if (corner == 'BR' || corner === null && ox > pox && oy > poy) {
                // BR
                top = this.domCon.height() - wh - marginBottom;
                left = panew - ww - marginX;
            } else if (corner == 'BL' || corner === null && ox <= pox && oy > poy) {
                // BL
                top = this.domCon.height() - wh - marginBottom;
                left = marginX;
            }

            if (animated) {
                this.domVideo.velocity({ left: left, top: top }, { duration: 150 });
            } else {
                this.domVideo.css('left', left + 'px');
                this.domVideo.css('top', top + 'px');
            }
        },
        mousemove(evt) {
            $('.btn_minimize').show();
            window.addEventListener('mousemove', this.globalMousemove);
        },
        globalMousemove(evt) {
            if (!$('#self_video').hitTest(evt.pageX, evt.pageY)) {
                $('.btn_minimize').hide();
                window.removeEventListener('mousemove', this.globalMousemove);
            }
        },
        toggleMinimize(evt) {
            if (this.minimized) {
                this.minimized = false;
                setTimeout(() => {
                    this.initDrag();
                    this.moveToCorner(true, 'BR');
                }, 10);
            } else {
                this.minimized = true;
                this.initDrag();
                this.moveToCorner(true, 'BR');
            }
        }
    }

});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            skipSigninAndGotoMeetingList: false
        };
    },
    computed: {
        inMeeting() {
            return this.$store.state.inMeeting;
        }
    },
    mounted() {
        this.showPage(1);

        // skip signin and add all people
        let skip = getQueryString('skip');
        if (skip) {
            $('#ptcover').remove();
            this.$store.commit('inMeeting', true);
        }

        // show meeting list tab
        let usertesting = getQueryString('usertesting');
        if (usertesting || this.skipSigninAndGotoMeetingList) {
            this.showPage(3);
            this.goDasTab(2);
        }
    },
    methods: {
        showPage(id) {
            $('.page').hide();
            $('.page' + id).show();
        },
        goDasTab(id) {
            $('.page3 .tabc').hide();
            $('.page3 .das_tabc' + id).show();
        },
        meetNow(evt) {
            this.$store.commit('inMeeting', true);
        }
    }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            domParent: null,
            domSpl: null
        };
    },
    computed: {
        panelVisible() {
            return this.$store.state.panelVisible;
        },
        rightPanelContentWidth() {
            return this.$store.state.rightPanelContentWidth;
        },
        rightPanelWidth() {
            return this.$store.state.rightPanelWidth;
        },
        rightPanelMinWidth() {
            return this.$store.state.rightPanelMinWidth;
        },
        rightPanelMaxWidth() {
            return this.$store.state.rightPanelMaxWidth;
        },
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        fullscreen() {
            return this.$store.state.fullscreen;
        }
    },
    mounted() {
        this.domParent = $('#con_main');
        this.domSpl = $('#splitter');
        this.initDrag();
        window.addEventListener('resize', this.onResize);
    },
    watch: {
        panelVisible(newVal) {
            if (newVal) {
                let left = this.domParent.width() - this.rightPanelContentWidth;
                this.domSpl.css('left', left + 'px');
            }
        },
        videoLayoutMode(newVal) {
            this.initDrag();
        },
        fullscreen(newVal) {
            let cnt = 0;
            let itv = setInterval(() => {
                cnt++;
                this.onResize();
                if (cnt >= 50) {
                    clearInterval(itv);
                }
            }, 10);
        }
    },
    methods: {
        initDrag() {
            // self video draggable

            let offset = this.domParent.offset();
            let x1 = offset.left + this.domParent.width() - this.rightPanelMaxWidth;
            let x2 = offset.left + this.domParent.width() - this.rightPanelMinWidth;
            let y1 = offset.top;
            let y2 = offset.top;

            $('#splitter').css('left', this.domParent.width() - this.rightPanelContentWidth - 2);
            $('#splitter').draggable({
                containment: [x1, y1, x2, y2],
                start: () => {
                    $('body').css('cursor', 'col-resize');
                },
                drag: () => {
                    let width = this.domParent.width() - this.domSpl.position().left;
                    this.$store.commit('rightPanelContentWidth', width);
                    this.$store.commit('rightPanelWidth', width);
                },
                stop: () => {
                    $('body').css('cursor', 'default');
                }
            });
        },
        onResize() {
            this.initDrag();
        }
    }
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {
        fullscreen() {
            return this.$store.state.fullscreen;
        }
    },
    mounted() {},
    methods: {}
});

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
});

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['isBgVideo', 'floatingVideo', 'name', 'host', 'avatar', 'video', 'audio', 'muted'],
    data() {
        return {
            thisDom: null,
            ctrlVisible: false
        };
    },
    mounted: function () {},
    computed: {
        videoVisible() {
            return !(this.videoLayoutMode == 'side-by-side' && this.panelVisible && this.activeSpeakerName != this.name);
        },
        videoLayoutMode() {
            return this.$store.state.videoLayoutMode;
        },
        videoFloatingLayoutMode() {
            return this.$store.state.videoFloatingLayoutMode;
        },
        videoSharingSwitched() {
            return this.$store.state.videoSharingSwitched;
        },
        activeSpeakerName() {
            return this.$store.state.activeSpeakerName;
        },
        lockedPeopleName() {
            return this.$store.state.lockedPeopleName;
        },
        showWave() {
            return !this.isBgVideo && this.videoLayoutMode == "strip" && this.activeSpeakerName == this.name && this.currentSharing === null && (this.lockedPeopleName == null || this.activeSpeakerName == this.lockedPeopleName) || !this.isBgVideo && this.videoLayoutMode == "fullscreen" && this.videoFloatingLayoutMode == "strip" && this.activeSpeakerName == this.name || !this.isBgVideo && this.videoLayoutMode == "strip" && this.videoSharingSwitched && this.activeSpeakerName == this.name && (this.lockedPeopleName == null || this.activeSpeakerName == this.lockedPeopleName);
        },
        showWaveStop() {
            return !this.isBgVideo && this.videoLayoutMode == "strip" && this.lockedPeopleName == this.name && this.activeSpeakerName != this.lockedPeopleName && (this.currentSharing === null || this.videoSharingSwitched);
        },
        backgroundColor() {
            return this.showWave || this.showWaveStop ? 'rgba(0,0,0,0)' : '#EBEBEC';
        },
        avatarUrl() {
            if (this.avatar) {
                return 'url(' + this.$store.state.avatarPath + this.avatar + ')';
            } else {
                return 'none';
            }
        },
        abbr() {
            let arr = this.name.split(' ');
            return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
        },
        videoUrl() {
            return this.video ? this.$store.state.videoPath + this.video : '';
        },
        currentSharing() {
            return this.$store.state.currentSharing;
        },
        sideBySideVideoColumn() {
            return this.$store.state.sideBySideVideoColumn;
        },
        panelVisible() {
            return this.$store.state.panelVisible;
        }
    },
    watch: {
        lockedPeopleName(newVal) {
            if (this.isBgVideo && this.activeSpeakerName == this.name) {
                if (this.lockedPeopleName != null) {
                    let people = this.$store.getters.people(this.lockedPeopleName);
                    $('#active_speaker_video video').attr('src', this.$store.state.videoPath + people.video);
                } else {
                    let people = this.$store.getters.people(this.activeSpeakerName);
                    $('#active_speaker_video video').attr('src', this.$store.state.videoPath + people.video);
                }
            }
        }

    },
    methods: {
        mouseover(evt) {
            if (this.isBgVideo) {
                return;
            }
            if (this.videoLayoutMode == 'fullscreen' && this.activeSpeakerName == this.name) {
                return;
            }
            this.ctrlVisible = true;
        },
        mouseout(evt) {
            if (this.isBgVideo) {
                return;
            }
            this.ctrlVisible = false;
        }
    }
});

/***/ }),
/* 98 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 99 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 100 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 101 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 102 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 105 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 114 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 115 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 116 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 120 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 123 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 124 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 131 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 132 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 133 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 134 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 135 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 136 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 141 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 142 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 143 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 144 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(1)))

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(145);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "16px",
      "height": "16px",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    staticClass: "fill",
    attrs: {
      "transform": "translate(-771.000000, -180.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(745.000000, 152.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(0.000000, 12.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(26.000000, 16.000000)"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M1.00159564,14.993 L1.55254875,12.644 C1.91751769,11.087 3.21240748,10 4.70328059,10 L11.2967194,10 C12.7875925,10 14.0834822,11.087 14.4484512,12.644 L15.0304016,15 L1.00159564,14.993 Z M4.00034042,4.999 C4.00034042,2.794 5.79418774,1 8,1 C10.2058123,1 11.9996596,2.794 11.9996596,4.999 C11.9996596,7.205 10.2058123,8.999 8,8.999 C5.79418774,8.999 4.00034042,7.205 4.00034042,4.999 L4.00034042,4.999 Z M15.9723215,14.764 L15.4213684,12.415 C14.9504084,10.405 13.2535529,9 11.2967194,9 L10.9677474,9 C12.1936431,8.088 12.9995745,6.641 12.9995745,4.999 C12.9995745,2.243 10.7567654,0 8,0 C5.24323463,0 3.00042552,2.243 3.00042552,4.999 C3.00042552,6.641 3.80635693,8.088 5.03225259,9 L4.70328059,9 C2.74644714,9 1.04959156,10.405 0.578631641,12.415 L0.0276785332,14.764 C-0.0443153393,15.072 0.0256787035,15.389 0.219662193,15.633 C0.404646449,15.866 0.677623216,16 0.969598365,16 L15.0304016,16 C15.3223768,16 15.5953536,15.866 15.7803378,15.633 C15.9743213,15.389 16.0443153,15.072 15.9723215,14.764 L15.9723215,14.764 Z"
    }
  })])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-043cd9a9", module.exports)
  }
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "cls",
    class: {
      rotate: _vm.collapsed
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.collapse($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0d6180ac", module.exports)
  }
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "flex_none",
    class: {
      fullscreen: _vm.fullscreen
    },
    style: ({
      height: _vm.height
    }),
    attrs: {
      "id": "con_top"
    }
  }, [_c('div', {
    staticClass: "win_min"
  }), _vm._v(" "), _c('div', {
    staticClass: "win_max"
  }), _vm._v(" "), _c('div', {
    staticClass: "win_x"
  }), _vm._v(" "), _c('span', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.name))]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "statusbar"
  }, [_c('div', {
    staticClass: "ico_empty"
  }), _vm._v(" "), (_vm.recording) ? _c('div', {
    staticClass: "ico_recorder"
  }) : _vm._e(), _vm._v(" "), (_vm.locked) ? _c('div', {
    staticClass: "ico_lock"
  }) : _vm._e(), _vm._v(" "), (_vm.recording || _vm.locked) ? _c('div', {
    staticClass: "splitter"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "cnnt"
  }, [_vm._v("Connected")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "menubar"
  }, [_c('span', [_vm._v("File")]), _vm._v(" "), _c('span', [_vm._v("Edit")]), _vm._v(" "), _c('span', [_vm._v("Share")]), _vm._v(" "), _c('span', [_vm._v("View")]), _vm._v(" "), _c('span', [_vm._v("Audio")]), _vm._v(" "), _c('span', [_vm._v("Participant")]), _vm._v(" "), _c('span', [_vm._v("Meeting")]), _vm._v(" "), _c('span', [_vm._v("Help")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0d8df106", module.exports)
  }
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.chatPanelVisible),
      expression: "chatPanelVisible"
    }],
    staticClass: "con_flex_column",
    class: {
      flex_none: _vm.flexNone, flex_1: !_vm.flexNone
    },
    style: ({
      height: _vm.height
    }),
    attrs: {
      "id": "chat_panel"
    }
  }, [_c('panel-header', {
    staticClass: "flex_none",
    attrs: {
      "title": _vm.title,
      "type": "chat"
    },
    on: {
      "close": _vm.close,
      "collapse": _vm.collapse
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.chatPanelClsed),
      expression: "!chatPanelClsed"
    }],
    staticClass: "scrollpane flex_1"
  }, [_c('div', {
    staticClass: "list"
  }, _vm._l((_vm.chatMsgList), function(p, index) {
    return _c('chat-item', {
      key: index,
      attrs: {
        "name": p.name,
        "to": p.to,
        "msg": p.msg
      }
    })
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.chatPanelClsed),
      expression: "!chatPanelClsed"
    }],
    staticClass: "inputbox flex_none con_flex_column"
  }, [_vm._m(0), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.message),
      expression: "message"
    }],
    staticClass: "flex_none",
    attrs: {
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.message)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.sendmsg($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.message = $event.target.value
      }
    }
  })])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "selectbox flex_none con_flex_row"
  }, [_c('span', {
    staticClass: "lb flex_none"
  }, [_vm._v("To:")]), _c('span', {
    staticClass: "name flex_1"
  }, [_vm._v("Everyone")]), _c('span', {
    staticClass: "arrow flex_none"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0dd21035", module.exports)
  }
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "itm con_flex_row",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.lockPeople($event)
      }
    }
  }, [_c('div', {
    staticClass: "col1 flex_1"
  }, [_vm._v("\n        " + _vm._s(_vm.name) + "\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "col2 flex_none"
  }, [(_vm.telepresence) ? _c('div', {
    staticClass: "ico_video"
  }) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-107e5602", module.exports)
  }
}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popmenuSwitchSharingVisible),
      expression: "popmenuSwitchSharingVisible"
    }],
    attrs: {
      "id": "popmenu_switchsharing"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "itm menuitm",
    class: {
      selected: _vm.currentSharing == "screen"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchSharing("screen")
      }
    }
  }, [_c('span', {
    staticClass: "lb"
  }, [_vm._v(_vm._s(_vm.activeSpeakerName) + "’s screen")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm",
    class: {
      selected: _vm.currentSharing == "doc"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchSharing("doc")
      }
    }
  }, [_c('span', {
    staticClass: "lb"
  }, [_vm._v("Presentation.pdf")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm"
  }, [_c('span', {
    staticClass: "lb"
  }, [_vm._v("High-level Concept.key")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-12042372", module.exports)
  }
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popShareVisible),
      expression: "popShareVisible"
    }],
    attrs: {
      "id": "pop_share"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("Share Content")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "itm screen1"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "msk"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("Share")])]), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Screen 1")])]), _vm._v(" "), _c('div', {
    staticClass: "itm screen2"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "msk"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("Share")])]), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Screen 2")])])]), _vm._v(" "), _c('div', {
    staticClass: "spline"
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "itm app1"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "msk"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("Share")])]), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("PowerPoint")])]), _vm._v(" "), _c('div', {
    staticClass: "itm app2"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "msk"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("Share")])]), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Sketch")])]), _vm._v(" "), _c('div', {
    staticClass: "itm app3"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "msk"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("Share")])]), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Acrobat Reader")])])]), _vm._v(" "), _c('div', {
    staticClass: "spline"
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "itm type1"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Share File")])]), _vm._v(" "), _c('div', {
    staticClass: "itm type2"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Other Applications")])]), _vm._v(" "), _c('div', {
    staticClass: "itm type3"
  }, [_c('div', {
    staticClass: "thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("New Whiteboard")])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1656625f", module.exports)
  }
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "10px",
      "viewBox": "0 0 12 10",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [(!_vm.fullscreen) ? _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    staticClass: "fill",
    attrs: {
      "transform": "translate(-1007.000000, -84.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(16.000000, 73.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(981.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(10.000000, 11.000000)"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M8.5,2 C9.327,2 10,2.673 10,3.5 L10,7.5 C10,7.775 9.776,8 9.5,8 C9.224,8 9,7.775 9,7.5 L9,3.5 C9,3.225 8.775,3 8.5,3 L3.5,3 C3.224,3 3,2.775 3,2.5 C3,2.225 3.224,2 3.5,2 L8.5,2 Z M10.5,0 C11.327,0 12,0.673 12,1.5 L12,5.5 C12,5.775 11.776,6 11.5,6 C11.224,6 11,5.775 11,5.5 L11,1.5 C11,1.225 10.775,1 10.5,1 L5.5,1 C5.224,1 5,0.775 5,0.5 C5,0.225 5.224,0 5.5,0 L10.5,0 Z M1.5,10 C0.673,10 0,9.327 0,8.5 L0,5.5 C0,4.673 0.673,4 1.5,4 L6.5,4 C7.327,4 8,4.673 8,5.5 L8,8.5 C8,9.327 7.327,10 6.5,10 L1.5,10 Z M1,5.5 L1,8.5 C1,8.775 1.225,9 1.5,9 L6.5,9 C6.775,9 7,8.775 7,8.5 L7,5.5 C7,5.225 6.775,5 6.5,5 L1.5,5 C1.225,5 1,5.225 1,5.5 Z",
      "id": "fill"
    }
  })])])])])])]) : _vm._e(), _vm._v(" "), (_vm.fullscreen) ? _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    staticClass: "fill",
    attrs: {
      "transform": "translate(-1007.000000, -84.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(16.000000, 73.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(981.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(10.000000, 11.000000)"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M8.5,2 C9.327,2 10,2.673 10,3.5 L10,7.5 C10,7.775 9.776,8 9.5,8 C9.224,8 9,7.775 9,7.5 L9,3.5 C9,3.225 8.775,3 8.5,3 L3.5,3 C3.224,3 3,2.775 3,2.5 C3,2.225 3.224,2 3.5,2 L8.5,2 Z M10.5,0 C11.327,0 12,0.673 12,1.5 L12,5.5 C12,5.775 11.776,6 11.5,6 C11.224,6 11,5.775 11,5.5 L11,1.5 C11,1.225 10.775,1 10.5,1 L5.5,1 C5.224,1 5,0.775 5,0.5 C5,0.225 5.224,0 5.5,0 L10.5,0 Z M1.5,10 C0.673,10 0,9.327 0,8.5 L0,5.5 C0,4.673 0.673,4 1.5,4 L6.5,4 C7.327,4 8,4.673 8,5.5 L8,8.5 C8,9.327 7.327,10 6.5,10 L1.5,10 Z M1,5.5 L1,8.5 C1,8.775 1.225,9 1.5,9 L6.5,9 C6.775,9 7,8.775 7,8.5 L7,5.5 C7,5.225 6.775,5 6.5,5 L1.5,5 C1.225,5 1,5.225 1,5.5 Z",
      "id": "fill"
    }
  })])])])])])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-18291db0", module.exports)
  }
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popmenuPanelVisible),
      expression: "popmenuPanelVisible"
    }],
    style: ({
      width: _vm.width,
      right: _vm.right
    }),
    attrs: {
      "id": "popmenu_panel"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "itm menuitm itm_plist",
    class: {
      selected: _vm.plistPanelVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.togglePlist($event)
      }
    }
  }, [_c('div', {
    staticClass: "icobtn",
    class: {
      selected: _vm.plistPanelVisible
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-plist'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Participants")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_chat",
    class: {
      selected: _vm.chatPanelVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleChat($event)
      }
    }
  }, [_c('div', {
    staticClass: "icobtn",
    class: {
      selected: _vm.chatPanelVisible
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-chat'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Chat")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_notes",
    class: {
      selected: _vm.notesPanelVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleNotes($event)
      }
    }
  }, [_c('div', {
    staticClass: "icobtn",
    class: {
      selected: _vm.notesPanelVisible
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-notes'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Notes")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_polling "
  }, [_c('div', {
    staticClass: "icobtn"
  }, [_c('span'), _vm._v(" "), _c('svg-ico-polling'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Polling")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_viewer spline"
  }, [_c('div', {
    staticClass: "icobtn"
  }, [_c('span'), _vm._v(" "), _c('svg-ico-multimedia'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Multimedia Viewer")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_restore"
  }, [_c('span', {
    staticClass: "lb lb2"
  }, [_vm._v("Restore Layout")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_hide_panel",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.hidePanels($event)
      }
    }
  }, [_c('span', {
    staticClass: "lb lb2"
  }, [_vm._v("Hide Panels")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_mg_panel"
  }, [_c('span', {
    staticClass: "lb lb2"
  }, [_vm._v("Manage Panels...")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-18db2a23", module.exports)
  }
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "con_flex_row",
    attrs: {
      "id": "controls"
    }
  }, [(!_vm.audioConnected) ? _c('div', {
    staticClass: "btn flex_none btn_audio",
    class: {
      active: _vm.popAVConnectionVisible || _vm.popAudioVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleAudioConnection($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.audioConnected) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: (_vm.muted ? "Unmute" : "Mute"),
      expression: "muted ? \"Unmute\" : \"Mute\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_mute",
    class: {
      selected: _vm.muted
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleMute($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.audioConnected && !_vm.videoConnected) ? _c('div', {
    staticClass: "btn flex_none btn_cam",
    class: {
      active: _vm.popVideoVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleVideoConnection($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.audioConnected && _vm.videoConnected) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: (!_vm.videoConnected ? "Start My Video" : "Switch / Stop My Video"),
      expression: "!videoConnected ? \"Start My Video\" : \"Switch / Stop My Video\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_video",
    class: {
      active: _vm.popVideoVisible, selected: _vm.cameraOn
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleVideoConnection($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: ("Share Content"),
      expression: "\"Share Content\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_share",
    class: {
      active: _vm.popShareVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showPopShare($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: ("Recorder"),
      expression: "\"Recorder\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_record",
    class: {
      active: _vm.popRecordVisible, on: _vm.recording
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleRecord($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: ("Participants"),
      expression: "\"Participants\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_plist",
    class: {
      selected: _vm.plistPanelVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.togglePlist($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: ("Chats"),
      expression: "\"Chats\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_chat",
    class: {
      selected: _vm.chatPanelVisible, alert: _vm.newMsgAlert
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleChat($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: ("More Options"),
      expression: "\"More Options\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_more",
    class: {
      active: _vm.popmenuMoreVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showPopmenuMore($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.top",
      value: ("Leave"),
      expression: "\"Leave\"",
      modifiers: {
        "hover": true,
        "click": true,
        "top": true
      }
    }],
    staticClass: "btn flex_none btn_x"
  }), _vm._v(" "), (_vm.truncated) ? _c('div', {
    staticClass: "flex_none btn_exp",
    on: {
      "mouseover": _vm.mouseover
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1f7e442c", module.exports)
  }
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "desktop"
    }
  }, [_c('div', {
    attrs: {
      "id": "taskbar"
    }
  }), _vm._v(" "), _c('signin'), _vm._v(" "), _c('mainclient'), _vm._v(" "), _c('div', {
    attrs: {
      "id": "ptcover"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v("WebEx Prototype")]), _vm._v(" "), _c('div', {
    staticClass: "btn_start uibutton green",
    on: {
      "click": _vm.start
    }
  }, [_vm._v("Start")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "ver"
  }, [_vm._v("V1.0(20180330)")])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert"
  }, [_vm._v("Your browser is not supported for this application. Please use "), _c('b', [_vm._v("Google Chrome")]), _vm._v(".")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "instruction"
  }, [_vm._v("\n\t\t\tPress "), _c('b', [_vm._v("+")]), _vm._v(" to add people."), _c('br'), _vm._v("\n\t\t\tPress "), _c('b', [_vm._v("Alt+S (Win)")]), _vm._v(", "), _c('b', [_vm._v("Option+S (Mac)")]), _vm._v(" to start sharing."), _c('br'), _vm._v("\n\t\t\tPress "), _c('b', [_vm._v("Alt+C (Win)")]), _vm._v(", "), _c('b', [_vm._v("Option+C (Mac)")]), _vm._v(" to show chat messages."), _c('br')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-25734198", module.exports)
  }
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "10px",
      "height": "12px",
      "viewBox": "0 0 10 12",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(-287.000000, -127.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(171.000000, 44.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(17.000000, 73.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(88.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(10.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    staticClass: "stroke",
    attrs: {
      "transform": "translate(1.000000, 1.000000)"
    }
  }, [_c('path', {
    attrs: {
      "d": "M5.022,10.5 L4.978,10.5 C3.88533333,10.5 3,9.61433333 3,8.522 L3,6.478 C3,5.38566667 3.88533333,4.5 4.978,4.5 L5.022,4.5 C6.11433333,4.5 7,5.38566667 7,6.478 L7,8.522 C7,9.61433333 6.11433333,10.5 5.022,10.5 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M5,4.5 L5,7.5",
      "stroke-linecap": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M3,7.5 L7,7.5",
      "stroke-linecap": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M9.5,1.87999987 C8.2694,0.594706626 6.6353,-0.000313332983 5,3.28933484e-10 C3.3656,0.000313333641 1.73,0.595333293 0.5,1.87999987",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M8,3.25 C7.1375,2.44502437 6.0713,2.00472519 5,2.00003784 C3.9287,1.99535048 2.852,2.42627493 2,3.25",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2ce4533b", module.exports)
  }
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popLockPeopleVisible),
      expression: "popLockPeopleVisible"
    }],
    attrs: {
      "id": "pop_lockpeople"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("Lock Video View")]), _vm._v(" "), _c('div', {
    staticClass: "txt"
  }, [_vm._v("Who do you want to lock the video view for?")]), _vm._v(" "), _c('div', {
    staticClass: "grp"
  }, [_c('div', {
    staticClass: "check on"
  }, [_vm._v("Me")]), _vm._v(" "), _c('div', {
    staticClass: "check off"
  }, [_vm._v("Everyone")])]), _vm._v(" "), _c('input', {
    staticClass: "search-input",
    attrs: {
      "type": "text",
      "placeholder": "Search for a name",
      "value": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "lst"
  }, [_c('div', {
    staticClass: "head"
  }, [_vm._v("TelePresence Speaker")]), _vm._v(" "), _c('div', {
    staticClass: "lst2"
  }, [_c('lockpeople-item', {
    attrs: {
      "name": "Scott Estrada",
      "host": false,
      "video": null,
      "telepresence": true
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "head"
  }, [_vm._v("Participants")]), _vm._v(" "), _c('div', {
    staticClass: "lst2"
  }, _vm._l((_vm.peopleList), function(p, index) {
    return (!p.me) ? _c('lockpeople-item', {
      key: index,
      attrs: {
        "name": p.name,
        "host": p.host,
        "video": p.video,
        "telepresence": false
      }
    }) : _vm._e()
  }))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2de68aaa", module.exports)
  }
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popmenuMoreVisible),
      expression: "popmenuMoreVisible"
    }],
    attrs: {
      "id": "popmenu_more"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "itm menuitm itm_notes"
  }, [_c('div', {
    staticClass: "icobtn"
  }, [_c('span'), _vm._v(" "), _c('svg-ico-notes'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Notes")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_polling "
  }, [_c('div', {
    staticClass: "icobtn"
  }, [_c('span'), _vm._v(" "), _c('svg-ico-polling'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Polling")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm itm_viewer spline"
  }, [_c('div', {
    staticClass: "icobtn"
  }, [_c('span'), _vm._v(" "), _c('svg-ico-multimedia'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Multimedia Viewer")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleLock($event)
      }
    }
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.locked),
      expression: "!locked"
    }],
    staticClass: "lb"
  }, [_vm._v("Lock Room")]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.locked),
      expression: "locked"
    }],
    staticClass: "lb"
  }, [_vm._v("Unlock Room")]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.locked),
      expression: "locked"
    }],
    staticClass: "ico ico_lock"
  })]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm"
  }, [_c('span', {
    staticClass: "lb"
  }, [_vm._v("Invite and Remind")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm"
  }, [_c('span', {
    staticClass: "lb"
  }, [_vm._v("Copy Meeting URL")])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showAudioConnection($event)
      }
    }
  }, [_c('span', {
    staticClass: "lb"
  }, [_vm._v("Audio Connection")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-33f4c1f4", module.exports)
  }
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "10px",
      "height": "6px",
      "viewBox": "0 0 10 6",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Sharing",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "Sharing-5.0",
      "transform": "translate(-1011.000000, -79.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "App",
      "transform": "translate(-11.000000, -10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "as-video",
      "transform": "translate(1005.000000, 70.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "button",
      "transform": "translate(10.000000, 10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "icon",
      "transform": "translate(6.000000, 6.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "fill",
    attrs: {
      "d": "M3.50045038,10.999704 C3.36345038,10.999704 3.22745038,10.943704 3.12845038,10.834704 C2.94345038,10.628704 2.96045038,10.312704 3.16545038,10.127704 L7.75245038,5.99970399 L3.16545038,1.87170399 C2.96045038,1.68670399 2.94345038,1.37070399 3.12845038,1.16470399 C3.31345038,0.960703986 3.62945038,0.943703986 3.83445038,1.12770399 L8.83445038,5.62770399 C8.94045038,5.72370399 9.00045038,5.85770399 9.00045038,5.99970399 C9.00045038,6.14170399 8.94045038,6.27570399 8.83445038,6.37170399 L3.83445038,10.871704 C3.73945038,10.957704 3.61945038,10.999704 3.50045038,10.999704",
      "id": "fill",
      "transform": "translate(6.000225, 5.999852) rotate(90.000000) translate(-6.000225, -5.999852) "
    }
  })])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-36669598", module.exports)
  }
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popInfoVisible),
      expression: "popInfoVisible"
    }],
    attrs: {
      "id": "pop_info"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "ava"
  }, [_c('div', {
    staticClass: "avatar",
    style: ({
      backgroundImage: _vm.avatarUrl
    })
  })]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.meetingTitle))]), _vm._v(" "), _c('div', {
    staticClass: "host"
  }, [_c('span', {
    staticClass: "lb"
  }, [_vm._v("Host:")]), _vm._v(" "), _c('span', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.hostName))])]), _vm._v(" "), _c('div', {
    staticClass: "sec"
  }, [_c('h1', [_vm._v("Agenda")]), _vm._v(" "), _c('p', [_vm._v("Lorem ipsum dolor sit amet, consectetur adipisc elit, sed do eiusmod tempor incididunt ut.")])]), _vm._v(" "), _c('div', {
    staticClass: "sec"
  }, [_c('h1', [_vm._v("Meeting URL")]), _vm._v(" "), _c('p', [_vm._v("go.webex.com/meet/username")])]), _vm._v(" "), _c('div', {
    staticClass: "sec"
  }, [_c('h1', [_vm._v("Meeting number")]), _vm._v(" "), _c('p', [_vm._v("123 456 789")])]), _vm._v(" "), _c('div', {
    staticClass: "sec"
  }, [_c('h1', [_vm._v("Host key")]), _vm._v(" "), _c('p', [_vm._v("765432")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-37981bde", module.exports)
  }
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "12px",
      "viewBox": "0 0 12 12",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Video-Centric-",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    staticClass: "fill",
    attrs: {
      "id": "Video-Centric-5.0",
      "transform": "translate(-766.000000, -83.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "App"
    }
  }, [_c('g', {
    attrs: {
      "id": "top-control-bar",
      "transform": "translate(16.000000, 73.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "button",
      "transform": "translate(740.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "pin_12",
      "transform": "translate(10.000000, 10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "icon"
    }
  }, [_c('path', {
    attrs: {
      "d": "M5.3569,10.9248 C4.6339,9.9958 4.3659,8.8088 4.6209,7.6428 C4.6579,7.4768 4.6069,7.3028 4.4859,7.1828 L1.5679,4.2638 L4.2639,1.5688 L7.1829,4.4868 C7.3029,4.6068 7.4759,4.6588 7.6429,4.6208 C8.8099,4.3648 9.9969,4.6348 10.9259,5.3568 L5.3569,10.9248 Z M11.8529,11.1458 L9.1969,8.4988 L11.7549,5.9418 C11.9199,5.7758 12.0089,5.5448 11.9989,5.3118 C11.9889,5.0728 11.8779,4.8488 11.6949,4.6938 C10.5969,3.7668 9.1229,3.3648 7.7029,3.5928 L4.9709,0.8618 L4.9789,0.8538 C5.1739,0.6578 5.1739,0.3418 4.9789,0.1468 C4.7829,-0.0492 4.4669,-0.0492 4.2719,0.1468 L0.1469,4.2718 C-0.0491,4.4668 -0.0491,4.7828 0.1469,4.9788 C0.2439,5.0758 0.3719,5.1248 0.4999,5.1248 C0.6279,5.1248 0.7559,5.0758 0.8539,4.9788 L0.8609,4.9708 L3.5929,7.7028 C3.3659,9.1228 3.7679,10.5968 4.6919,11.6938 C4.8469,11.8768 5.0709,11.9878 5.3099,11.9988 C5.3219,11.9998 5.3349,11.9998 5.3469,11.9998 C5.5689,11.9998 5.7839,11.9118 5.9419,11.7538 L8.4899,9.2068 L11.1469,11.8548 C11.2449,11.9508 11.3729,11.9998 11.4999,11.9998 C11.6279,11.9998 11.7559,11.9508 11.8539,11.8528 C12.0489,11.6568 12.0479,11.3408 11.8529,11.1458 Z",
      "id": "fill"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3c014920", module.exports)
  }
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "10px",
      "height": "10px",
      "viewBox": "0 0 10 10",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Sharing",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "Sharing-5.1",
      "transform": "translate(-1323.000000, -77.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "App",
      "transform": "translate(-12.000000, -11.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "floating-video",
      "transform": "translate(1006.000000, 71.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "as-video"
    }
  }, [_c('g', {
    attrs: {
      "id": "button",
      "transform": "translate(322.000000, 10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "maximize_12",
      "transform": "translate(6.000000, 6.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    staticClass: "fill",
    attrs: {
      "id": "icon",
      "transform": "translate(1.000000, 1.000000)",
      "fill-rule": "nonzero"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1,9 L4.5,9 C4.776,9 5,9.224 5,9.5 C5,9.776 4.776,10 4.5,10 L0.5,10 C0.224,10 -1.40802101e-16,9.776 -1.0700185e-16,9.5 L3.983197e-16,5.5 C4.32119952e-16,5.224 0.224,5 0.5,5 C0.776,5 1,5.224 1,5.5 L1,9 Z M5.5,-4.8985872e-16 L9.5,-9.95180269e-16 C9.776,-1.02898052e-15 10,0.224 10,0.5 L10,4.5 C10,4.776 9.776,5 9.5,5 C9.224,5 9,4.776 9,4.5 L9,1 L5.5,1 C5.224,1 5,0.776 5,0.5 C5,0.224 5.224,-4.56058468e-16 5.5,-4.8985872e-16 Z",
      "id": "fill"
    }
  })])])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3c6e46da", module.exports)
  }
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "flex_1",
    style: ({
      height: _vm.height,
      backgroundColor: _vm.backgroundColor
    }),
    attrs: {
      "id": "con_main"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing !== null && !_vm.videoSharingSwitched),
      expression: "currentSharing!==null && !videoSharingSwitched"
    }],
    attrs: {
      "id": "con_left"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing !== null),
      expression: "currentSharing!==null"
    }],
    staticClass: "con_flex_row",
    attrs: {
      "id": "sharing_layer"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing !== null && _vm.annotationToolsVisible),
      expression: "currentSharing!==null && annotationToolsVisible"
    }],
    staticClass: "flex_none",
    attrs: {
      "id": "annotation_tools"
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing == "doc"),
      expression: "currentSharing==\"doc\""
    }],
    staticClass: "doc flex_1 con_flex_row"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "page flex_1"
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing == "screen"),
      expression: "currentSharing==\"screen\""
    }],
    staticClass: "screen flex_1"
  })])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing === null || _vm.videoLayoutMode != "fullscreen" || _vm.videoSharingSwitched),
      expression: "currentSharing===null || videoLayoutMode!=\"fullscreen\" || videoSharingSwitched "
    }],
    staticClass: "con",
    attrs: {
      "id": "video_layer"
    }
  }, [(_vm.peopleList.length == 1) ? _c('div', {
    attrs: {
      "id": "waitingPage"
    }
  }, [_c('span', [_vm._v("Waiting for others to join")])]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.peopleList.length > 1),
      expression: "peopleList.length > 1"
    }],
    staticClass: "con",
    attrs: {
      "id": "active_speaker_layer"
    }
  }, [_c('video-item', {
    attrs: {
      "id": "active_speaker_video",
      "isBgVideo": true,
      "floatingVideo": false,
      "name": _vm.activeSpeaker.name,
      "host": _vm.activeSpeaker.host,
      "avatar": _vm.activeSpeaker.avatar,
      "video": _vm.activeSpeaker.video,
      "audio": _vm.activeSpeaker.audio,
      "muted": _vm.activeSpeaker.muted
    }
  })], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "video_scrollpane"
    }
  }, [_c('div', {
    attrs: {
      "id": "video_list"
    }
  }, _vm._l((_vm.peopleList), function(p, index) {
    return (!p.me) ? _c('video-item', {
      key: index,
      attrs: {
        "name": p.name,
        "host": p.host,
        "avatar": p.avatar,
        "video": p.video,
        "audio": p.audio,
        "muted": p.muted
      }
    }) : _vm._e()
  }))]), _vm._v(" "), (_vm.currentSharing === null || _vm.videoSharingSwitched) ? _c('div', {
    staticClass: "cisco_logo"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "top_label"
  }, [((_vm.currentSharing === null || _vm.videoSharingSwitched) && _vm.videoLayoutMode != "grid" && _vm.peopleList.length > 1) ? _c('span', {
    staticClass: "lb_active_speaker"
  }, [_vm._v(_vm._s(_vm.topPeopleName))]) : _vm._e(), _vm._v(" "), ((_vm.currentSharing === null || _vm.videoSharingSwitched) && _vm.videoLayoutMode != "grid" && _vm.peopleList.length > 1) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: (_vm.lockedPeopleName === null ? "Lock this video view on a specific participant" : "Unlock this video view"),
      expression: "lockedPeopleName===null ? \"Lock this video view on a specific participant\" : \"Unlock this video view\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "icobtn hudelem ico_lockpeople",
    class: {
      selected: _vm.lockedPeopleName !== null
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleLockPeople($event)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-pin'), _vm._v(" "), _c('span')], 1) : _vm._e(), _vm._v(" "), (_vm.fullscreen && _vm.recording && (_vm.currentSharing === null || _vm.videoSharingSwitched)) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Recording..."),
      expression: "\"Recording...\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "ico_recorder"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "icoset_left"
  }, [_vm._m(1), _vm._v(" "), ((_vm.currentSharing === null || _vm.videoSharingSwitched) && _vm.videoLayoutMode != "grid" && _vm.peopleList.length > 1 && _vm.lockedPeopleName !== null) ? _c('span', {
    staticClass: "lb_active_speaker"
  }, [_vm._v("Speaking: " + _vm._s(_vm.activeSpeakerName))]) : _vm._e()]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.videoLayoutMode == "strip" || _vm.videoLayoutMode == "grid" || _vm.videoLayoutMode == "side-by-side"),
      expression: " videoLayoutMode==\"strip\" || videoLayoutMode==\"grid\" || videoLayoutMode==\"side-by-side\" "
    }],
    class: {
      small: _vm.videoLayoutMode == "strip", big: _vm.videoLayoutMode == "grid", sbs: _vm.videoLayoutMode == "side-by-side"
    },
    attrs: {
      "id": "btn_video_prev"
    },
    on: {
      "click": _vm.goPrevVideoPage
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.videoLayoutMode == "strip" || _vm.videoLayoutMode == "grid" || _vm.videoLayoutMode == "side-by-side"),
      expression: " videoLayoutMode==\"strip\" || videoLayoutMode==\"grid\" || videoLayoutMode==\"side-by-side\" "
    }],
    class: {
      small: _vm.videoLayoutMode == "strip", big: _vm.videoLayoutMode == "grid", sbs: _vm.videoLayoutMode == "side-by-side"
    },
    attrs: {
      "id": "btn_video_next"
    },
    on: {
      "click": _vm.goNextVideoPage
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.plistPanelVisible && _vm.fullscreen),
      expression: "plistPanelVisible && fullscreen"
    }],
    staticClass: "floating_window con_flex_column",
    attrs: {
      "id": "floating_plist"
    },
    on: {
      "mousedown": function($event) {
        _vm.swapZindex("floating_plist")
      }
    }
  }, [_c('panel-plist', {
    attrs: {
      "floating": true
    }
  })], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.chatPanelVisible && _vm.fullscreen),
      expression: "chatPanelVisible && fullscreen"
    }],
    staticClass: "floating_window con_flex_column",
    attrs: {
      "id": "floating_chat"
    },
    on: {
      "mousedown": function($event) {
        _vm.swapZindex("floating_chat")
      }
    }
  }, [_c('panel-chat', {
    attrs: {
      "floating": true
    }
  })], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing !== null && _vm.fullscreen),
      expression: "currentSharing!==null && fullscreen"
    }],
    staticClass: "floating_window",
    class: {
      cls: _vm.floatingCollapsed
    },
    attrs: {
      "id": "floating_layer"
    },
    on: {
      "mousedown": function($event) {
        _vm.swapZindex("floating_layer")
      }
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.videoSharingSwitched && !_vm.floatingCollapsed),
      expression: "!videoSharingSwitched && !floatingCollapsed"
    }],
    attrs: {
      "id": "floating_video_layer"
    }
  }, [_c('div', {
    staticClass: "con",
    attrs: {
      "id": "fl_active_speaker_layer"
    }
  }, [_c('video-item', {
    attrs: {
      "id": "fl_active_speaker_video",
      "isBgVideo": true,
      "floatingVideo": true,
      "name": _vm.activeSpeaker.name,
      "host": _vm.activeSpeaker.host,
      "avatar": _vm.activeSpeaker.avatar,
      "video": _vm.activeSpeaker.video,
      "audio": _vm.activeSpeaker.audio,
      "muted": _vm.activeSpeaker.muted
    }
  })], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "fl_video_scrollpane"
    }
  }, [_c('div', {
    attrs: {
      "id": "fl_video_list"
    }
  }, _vm._l((_vm.peopleList), function(p, index) {
    return (!p.me) ? _c('video-item', {
      key: index,
      attrs: {
        "name": p.name,
        "host": p.host,
        "avatar": p.avatar,
        "video": p.video,
        "audio": p.audio,
        "muted": p.muted
      }
    }) : _vm._e()
  }))])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.videoSharingSwitched && !_vm.floatingCollapsed),
      expression: "videoSharingSwitched && !floatingCollapsed"
    }],
    staticClass: "con_flex_row",
    attrs: {
      "id": "floating_sharing_layer"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing == "doc"),
      expression: "currentSharing==\"doc\""
    }],
    staticClass: "doc flex_1 con_flex_row"
  }, [_c('div', {
    staticClass: "page flex_1"
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentSharing == "screen"),
      expression: "currentSharing==\"screen\""
    }],
    staticClass: "screen flex_1"
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: (!_vm.floatingCollapsed ? (!_vm.videoSharingSwitched ? "Hide Video" : "Hide Shared Content View") : (!_vm.videoSharingSwitched ? "Show Video" : "Show Shared Content View")),
      expression: "!floatingCollapsed ? (!videoSharingSwitched ? \"Hide Video\" : \"Hide Shared Content View\") : (!videoSharingSwitched ? \"Show Video\" : \"Show Shared Content View\") ",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "icobtn_s btn_floating_cls floatingctrl",
    class: {
      cls: _vm.floatingCollapsed
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleFloatingCls($event)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-floating-cls'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.floatingCollapsed),
      expression: "floatingCollapsed"
    }],
    staticClass: "collapsed_label"
  }, [_vm._v(_vm._s(_vm.collapsedLabel))]), _vm._v(" "), (!_vm.floatingCollapsed && !_vm.videoSharingSwitched) ? _c('div', {
    staticClass: "icobtn_s fc_view_switch floatingctrl",
    class: {
      exp: _vm.switchOpen2 || _vm.switchAlwaysOpen
    },
    on: {
      "mouseover": function($event) {
        $event.stopPropagation();
        _vm.openSwitch2($event)
      }
    }
  }, [_c('div', {
    staticClass: "btns con_flex_row"
  }, [_c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Active Speaker Video View"),
      expression: "\"Active Speaker Video View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none fc_active_speaker",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchFloatingTo("active-speaker", true)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-activespeaker'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Active Speaker and Thumbnail Video View"),
      expression: "\"Active Speaker and Thumbnail Video View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none fc_strip",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchFloatingTo("strip", true)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-strip-bot'), _vm._v(" "), _c('span')], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Equal Video View"),
      expression: "\"Equal Video View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none fc_grid",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchFloatingTo("grid", true)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-grid'), _vm._v(" "), _c('span')], 1)])]) : _vm._e(), _vm._v(" "), (!_vm.floatingCollapsed) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: (_vm.videoSharingSwitched ? "View All Participants in Floating View" : "View Shared Content in Floating View"),
      expression: "videoSharingSwitched ? \"View All Participants in Floating View\" : \"View Shared Content in Floating View\" ",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "icobtn_s btn_switch_floating floatingctrl",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleSwitchFloating($event)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-switch-floating'), _vm._v(" "), _c('span')], 1) : _vm._e()]), _vm._v(" "), _c('con-panel'), _vm._v(" "), _c('div', {
    staticClass: "con",
    attrs: {
      "id": "hud"
    }
  }, [(!_vm.videoSharingSwitched) ? _c('div', {
    staticClass: "top_label",
    attrs: {
      "id": "sharing_selection"
    }
  }, [(_vm.currentSharing == "doc") ? _c('span', {
    staticClass: "lb_sharing_doc",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showPopmenuSwitchSharing($event)
      }
    }
  }, [_c('span', [_vm._v("Presentation.pdf")]), _c('span', {
    staticClass: "arr"
  })]) : _vm._e(), _vm._v(" "), (_vm.currentSharing == "screen") ? _c('span', {
    staticClass: "lb_sharing_screen",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showPopmenuSwitchSharing($event)
      }
    }
  }, [_c('span', [_vm._v("Viewing " + _vm._s(_vm.activeSpeakerName) + "'s Screen")]), _c('span', {
    staticClass: "arr"
  })]) : _vm._e(), _vm._v(" "), (_vm.fullscreen && _vm.recording && _vm.currentSharing !== null && !_vm.videoSharingSwitched) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Recording..."),
      expression: "\"Recording...\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "ico_recorder"
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "icoset_left"
  }, [_c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.right",
      value: ("Meeting Information"),
      expression: "\"Meeting Information\"",
      modifiers: {
        "hover": true,
        "click": true,
        "right": true
      }
    }],
    staticClass: "icobtn btn_info hudelem",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.togglePopInfo($event)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-info'), _vm._v(" "), _c('span')], 1)]), _vm._v(" "), _c('div', {
    staticClass: "icoset_right"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.peopleList.length > 2),
      expression: "peopleList.length>2"
    }],
    staticClass: "icobtn btn_view_switch hudelem",
    class: {
      exp: _vm.switchOpen || _vm.switchAlwaysOpen
    },
    on: {
      "mouseover": function($event) {
        $event.stopPropagation();
        _vm.openSwitch($event)
      }
    }
  }, [_c('div', {
    staticClass: "btns con_flex_row"
  }, [(_vm.currentSharing === null || _vm.videoSharingSwitched) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Active Speaker Video View"),
      expression: "\"Active Speaker Video View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none btn_active_speaker",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchTo("active-speaker", true)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-activespeaker'), _vm._v(" "), _c('span')], 1) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Active Speaker and Thumbnail Video View"),
      expression: "\"Active Speaker and Thumbnail Video View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none btn_strip",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchTo("strip", true)
      }
    }
  }, [_c('span'), _vm._v(" "), (_vm.currentSharing === null || _vm.videoSharingSwitched) ? _c('svg-ico-strip-bot') : _c('svg-ico-strip'), _vm._v(" "), _c('span')], 1), _vm._v(" "), (_vm.currentSharing === null || _vm.videoSharingSwitched) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Equal Video View"),
      expression: "\"Equal Video View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none btn_grid",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchTo("grid", true)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-grid'), _vm._v(" "), _c('span')], 1) : _vm._e(), _vm._v(" "), (_vm.currentSharing !== null && !_vm.videoSharingSwitched) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Side by Side View"),
      expression: "\"Side by Side View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none btn_side_by_side",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchTo("side-by-side", true)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-sidebyside'), _vm._v(" "), _c('span')], 1) : _vm._e(), _vm._v(" "), (_vm.currentSharing !== null && !_vm.videoSharingSwitched) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: ("Floating View"),
      expression: "\"Floating View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn flex_none btn_fullscreen",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.switchTo("fullscreen", true)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-fullscreen'), _vm._v(" "), _c('span')], 1) : _vm._e()])]), _vm._v(" "), (_vm.currentSharing === null || _vm.videoSharingSwitched) ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: (!_vm.fullscreen ? "Floating View" : "Exit Floating View"),
      expression: "!fullscreen ? \"Floating View\" : \"Exit Floating View\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "icobtn btn_fullscreen hudelem",
    class: {
      selected: _vm.fullscreen
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleFullscreen($event)
      }
    }
  }, [_c('span'), _vm._v(" "), _c('svg-ico-fullscreen'), _vm._v(" "), _c('span')], 1) : _vm._e()]), _vm._v(" "), (_vm.currentSharing !== null && !_vm.videoSharingSwitched) ? _c('div', {
    staticClass: "hudelem",
    class: {
      short: _vm.currentSharing != "doc"
    },
    attrs: {
      "id": "sharing_tools"
    }
  }, [_c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.right",
      value: (_vm.annotationToolsVisible ? "Stop Annotation" : "Annotate"),
      expression: "annotationToolsVisible ? \"Stop Annotation\":\"Annotate\"",
      modifiers: {
        "hover": true,
        "click": true,
        "right": true
      }
    }],
    staticClass: "ico_tools",
    class: {
      selected: _vm.annotationToolsVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleTools($event)
      }
    }
  }), _vm._v(" "), (_vm.currentSharing == "doc") ? _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.right",
      value: (_vm.docThumbsVisible ? "Collapse Thumbnails" : "View Thumbnails"),
      expression: "docThumbsVisible ? \"Collapse Thumbnails\":\"View Thumbnails\"",
      modifiers: {
        "hover": true,
        "click": true,
        "right": true
      }
    }],
    staticClass: "ico_thumbs",
    class: {
      selected: _vm.docThumbsVisible
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleDocThumbs($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.currentSharing == "doc") ? _c('div', {
    staticClass: "ico_pages"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.right",
      value: ("Zoom In"),
      expression: "\"Zoom In\"",
      modifiers: {
        "hover": true,
        "click": true,
        "right": true
      }
    }],
    staticClass: "ico_zoomin"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.right",
      value: ("Zoom Out"),
      expression: "\"Zoom Out\"",
      modifiers: {
        "hover": true,
        "click": true,
        "right": true
      }
    }],
    staticClass: "ico_zoomout"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.right",
      value: ("Fit to Viewer"),
      expression: "\"Fit to Viewer\"",
      modifiers: {
        "hover": true,
        "click": true,
        "right": true
      }
    }],
    staticClass: "ico_zoomfit"
  })]) : _vm._e(), _vm._v(" "), _c('controls', {
    staticClass: "hudelem"
  })], 1), _vm._v(" "), _c('splitter'), _vm._v(" "), _c('self-video', {
    staticClass: "floating_window",
    on: {
      "mousedown": function($event) {
        _vm.swapZindex("self_video")
      }
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "thumbs flex_none"
  }, [_c('div', {
    staticClass: "img"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "icobtn",
    staticStyle: {
      "opacity": "0"
    }
  }, [_c('span'), _vm._v(" "), _c('span')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-40381150", module.exports)
  }
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "16px",
      "height": "16px",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    staticClass: "fill",
    attrs: {
      "transform": "translate(-771.000000, -276.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(745.000000, 152.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(0.000000, 108.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(26.000000, 16.000000)"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M14.0937,-9.99999993e-05 C15.1447,-9.99999993e-05 15.9997,0.8559 15.9997,1.9059 L15.9997,10.8129 C15.9997,11.0709 15.8997,11.3149 15.7167,11.4969 L11.4977,15.7159 C11.3167,15.8969 11.0677,15.9999 10.8127,15.9999 L1.9067,15.9999 C0.8557,15.9999 -0.0003,15.1449 -0.0003,14.0939 L-0.0003,1.9059 C-0.0003,0.8559 0.8557,-9.99999993e-05 1.9067,-9.99999993e-05 L14.0937,-9.99999993e-05 Z M11.0037,14.7959 L14.7957,11.0039 L11.8667,11.0039 C11.3907,11.0039 11.0037,11.3909 11.0037,11.8659 L11.0037,14.7959 Z M0.9997,14.0939 C0.9997,14.5939 1.4067,14.9999 1.9067,14.9999 L10.0037,14.9999 L10.0037,11.8659 C10.0037,10.8389 10.8387,10.0039 11.8667,10.0039 L15.0087,10.0039 L14.9997,1.9059 C14.9997,1.4059 14.5937,0.9999 14.0937,0.9999 L1.9067,0.9999 C1.4067,0.9999 0.9997,1.4059 0.9997,1.9059 L0.9997,14.0939 Z M4.5,5 C4.224,5 4,4.776 4,4.5 C4,4.224 4.224,4 4.5,4 L11.5,4 C11.777,4 12,4.224 12,4.5 C12,4.776 11.777,5 11.5,5 L4.5,5 Z M4.5,8.002 C4.224,8.002 4,7.778 4,7.502 C4,7.226 4.224,7.002 4.5,7.002 L11.5,7.002 C11.777,7.002 12,7.226 12,7.502 C12,7.778 11.777,8.002 11.5,8.002 L4.5,8.002 Z M7.4983,10.0039 C7.7743,10.0039 7.9983,10.2279 7.9983,10.5039 C7.9983,10.7799 7.7743,11.0039 7.4983,11.0039 L4.5003,11.0039 C4.2243,11.0039 4.0003,10.7799 4.0003,10.5039 C4.0003,10.2279 4.2243,10.0039 4.5003,10.0039 L7.4983,10.0039 Z"
    }
  })])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-414a1ddc", module.exports)
  }
}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "itm con_flex_row"
  }, [_c('div', {
    staticClass: "col1 flex_none"
  }, [_c('div', {
    staticClass: "avatar",
    style: ({
      backgroundImage: _vm.avatarUrl
    })
  }, [(!_vm.avatar) ? _c('span', [_vm._v(_vm._s(_vm.abbr))]) : _vm._e()]), _vm._v(" "), (_vm.host) ? _c('div', {
    staticClass: "ico_host"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col2 flex_none"
  }, [_c('div', {
    staticClass: "ico_audio",
    style: ({
      backgroundImage: _vm.audioIcoUrl
    })
  })]), _vm._v(" "), _c('div', {
    staticClass: "col3 flex_1 lb_name",
    class: {
      me: _vm.me
    }
  }, [_vm._v(_vm._s(_vm.name) + " "), _c('span', [_vm._v(_vm._s(_vm.suffix))])]), _vm._v(" "), _c('div', {
    staticClass: "col4 flex_none"
  }, [(_vm.video) ? _c('div', {
    staticClass: "ico_video"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col5 flex_none"
  }, [(_vm.muted) ? _c('div', {
    staticClass: "ico_muted"
  }) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-436a02b4", module.exports)
  }
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.inMeeting) ? _c('div', {
    staticClass: "con con_flex_column",
    class: {
      normal: !_vm.fullscreen, fullscreen: _vm.fullscreen
    },
    attrs: {
      "id": "mainclient"
    }
  }, [_vm._m(0), _vm._v(" "), _c('con-top'), _vm._v(" "), _c('con-main'), _vm._v(" "), _c('div', {
    attrs: {
      "id": "popover"
    }
  }, [_c('pop-audio'), _vm._v(" "), _c('pop-video'), _vm._v(" "), _c('pop-avconnection'), _vm._v(" "), _c('pop-share'), _vm._v(" "), _c('pop-info'), _vm._v(" "), _c('poptip'), _vm._v(" "), _c('pop-record'), _vm._v(" "), _c('pop-lockpeople'), _vm._v(" "), _c('popmenu-more'), _vm._v(" "), _c('popmenu-switchsharing')], 1)], 1) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "fuzzybg"
    }
  }, [_c('div')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4ad073f8", module.exports)
  }
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popRecordVisible),
      expression: "popRecordVisible"
    }],
    attrs: {
      "id": "pop_record"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("Recorder")]), _vm._v(" "), (!_vm.recording) ? _c('div', {
    staticClass: "des"
  }, [_vm._v("Click the button to record on server")]) : _vm._e(), _vm._v(" "), (_vm.recording) ? _c('div', {
    staticClass: "des"
  }, [_c('span', {
    staticStyle: {
      "color": "#F5483F",
      "padding-right": "3px"
    }
  }, [_vm._v("●")]), _vm._v("Recording...")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "timer"
  }, [_vm._v(_vm._s(_vm.formatedRecordingTime))]), _vm._v(" "), _c('div', {
    staticClass: "btns"
  }, [(!_vm.recording) ? _c('div', {
    staticClass: "btn btn_record",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.start($event)
      }
    }
  }, [_c('span', {
    staticClass: "ico"
  }), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Record")]), _c('span', {
    staticClass: "padding"
  })]) : _vm._e(), _vm._v(" "), (_vm.recording) ? _c('div', {
    staticClass: "btn btn_pause",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.pause($event)
      }
    }
  }, [_c('span', {
    staticClass: "ico"
  }), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Pause")]), _c('span', {
    staticClass: "padding"
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "btn btn_stop",
    class: {
      disabled: !_vm.recording
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.stop($event)
      }
    }
  }, [_c('span', {
    staticClass: "ico"
  }), _c('span', {
    staticClass: "lb"
  }, [_vm._v("Stop")]), _c('span', {
    staticClass: "padding"
  })])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4d761401", module.exports)
  }
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.videoVisible),
      expression: "videoVisible"
    }],
    staticClass: "video_item",
    style: ({
      backgroundColor: _vm.backgroundColor
    }),
    attrs: {
      "data-name": _vm.name
    },
    on: {
      "mouseover": _vm.mouseover,
      "mouseout": _vm.mouseout
    }
  }, [_c('div', {
    staticClass: "video",
    class: {
      wave: _vm.showWave, wave_stop: _vm.showWaveStop
    }
  }, [(!_vm.showWave && !_vm.showWaveStop) ? _c('video', {
    class: {
      big: _vm.isBgVideo && !_vm.floatingVideo,
        big_fl: _vm.isBgVideo && _vm.floatingVideo,
        small: (_vm.videoLayoutMode == "strip" || _vm.videoLayoutMode == "active-speaker" || _vm.videoLayoutMode == "side-by-side" || _vm.videoLayoutMode == "fullscreen") && !_vm.isBgVideo,
        grid: _vm.videoLayoutMode == "grid" && !_vm.isBgVideo
    },
    attrs: {
      "src": _vm.videoUrl,
      "autoplay": "true",
      "loop": "true"
    }
  }) : _vm._e()]), _vm._v(" "), (_vm.video === null) ? _c('div', {
    staticClass: "avatar",
    class: {
      grid: _vm.videoLayoutMode == "grid"
    },
    style: ({
      backgroundImage: _vm.avatarUrl
    })
  }, [(!_vm.avatar) ? _c('span', {
    staticClass: "abbr"
  }, [_vm._v(_vm._s(_vm.abbr))]) : _vm._e()]) : _vm._e(), _vm._v(" "), (!_vm.isBgVideo || _vm.videoLayoutMode == "fullscreen") ? _c('div', {
    staticClass: "lb_name con_flex_row",
    class: {
      lb_small: _vm.videoLayoutMode == "strip" || (_vm.videoLayoutMode == "side-by-side") && _vm.activeSpeakerName != _vm.name && _vm.sideBySideVideoColumn > 1 || _vm.videoLayoutMode == "fullscreen" && _vm.videoFloatingLayoutMode == "strip" && !_vm.isBgVideo,
        lb_big: _vm.videoLayoutMode == "grid",
        lb_small2: (_vm.videoLayoutMode == "side-by-side" || _vm.videoLayoutMode == "active-speaker") && _vm.activeSpeakerName == _vm.name || _vm.videoLayoutMode == "side-by-side" && _vm.sideBySideVideoColumn == 1 || _vm.videoLayoutMode == "fullscreen" && _vm.videoFloatingLayoutMode == "grid" || _vm.isBgVideo,
        lb_muted: _vm.videoLayoutMode == "grid" && _vm.muted,
        lb_muted2: (_vm.videoLayoutMode == "side-by-side" && _vm.sideBySideVideoColumn == 1) && _vm.muted
    }
  }, [(!_vm.isBgVideo && _vm.videoLayoutMode == "strip" && _vm.lockedPeopleName == _vm.name) ? _c('div', {
    staticClass: "ico_sts_pin"
  }) : _vm._e(), _c('div', {
    staticClass: "flex_1"
  }, [_vm._v(_vm._s(_vm.name))]), _vm._v(" "), (_vm.muted) ? _c('div', {
    staticClass: "ico_muted flex_none"
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.audio == "mobile") ? _c('div', {
    staticClass: "ico_mobile"
  }) : _vm._e(), _vm._v(" "), (_vm.host && !_vm.isBgVideo && _vm.videoLayoutMode != "side-by-side" && _vm.videoLayoutMode != "active-speaker" && _vm.videoLayoutMode != "fullscreen") ? _c('div', {
    staticClass: "ico_host"
  }) : _vm._e(), _vm._v(" "), (_vm.videoLayoutMode == "grid" && _vm.activeSpeakerName == _vm.name) ? _c('div', {
    staticClass: "as_border"
  }) : _vm._e(), _vm._v(" "), ((!_vm.isBgVideo && _vm.videoLayoutMode == "strip" && _vm.currentSharing !== null && _vm.activeSpeakerName == _vm.name && !_vm.videoSharingSwitched) || (!_vm.isBgVideo && _vm.videoLayoutMode == "strip" && _vm.activeSpeakerName == _vm.name && _vm.activeSpeakerName != _vm.lockedPeopleName && _vm.lockedPeopleName != null)) ? _c('div', {
    staticClass: "as_border_thin"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.ctrlVisible && !_vm.isBgVideo),
      expression: "ctrlVisible && !isBgVideo"
    }],
    staticClass: "control video_controls",
    class: {
      big: _vm.videoLayoutMode == "grid" || _vm.videoLayoutMode == "side-by-side" && (_vm.activeSpeakerName == _vm.name || _vm.sideBySideVideoColumn == 1)
    }
  }, [_c('span'), _vm._v(" "), _c('div', {
    staticClass: "ico ico_mute"
  }), _vm._v(" "), _c('div', {
    staticClass: "ico ico_chat"
  }), _vm._v(" "), _c('div', {
    staticClass: "ico ico_pin"
  }), _vm._v(" "), _c('span')])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4d8b6dd9", module.exports)
  }
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "con_panel"
    }
  }, [_c('div', {
    staticClass: "wrap con_flex_column",
    style: ({
      width: _vm.contentWidth
    })
  }, [_c('div', {
    staticClass: "video_area"
  }), _vm._v(" "), _c('panel-plist'), _vm._v(" "), _c('panel-chat'), _vm._v(" "), (_vm.anyOpenPanel) ? _c('div', {
    staticClass: "whitebot",
    class: {
      flex_none: _vm.hasOtherOpenPanel, flex_1: !_vm.hasOtherOpenPanel
    }
  }) : _vm._e()], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-54567016", module.exports)
  }
}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.poptipVisible),
      expression: "poptipVisible"
    }],
    attrs: {
      "id": "poptip"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.poptipText))]), _vm._v(" "), _c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-551454de", module.exports)
  }
}

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "10px",
      "viewBox": "0 0 12 10",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Sharing",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "Sharing-5.0",
      "transform": "translate(-1264.000000, -77.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "App",
      "transform": "translate(-11.000000, -10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "as-video",
      "transform": "translate(1005.000000, 70.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "button",
      "transform": "translate(240.000000, 10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "video-layout_12",
      "transform": "translate(30.000000, 6.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    staticClass: "fill",
    attrs: {
      "id": "icon",
      "transform": "translate(0.000000, 1.000000)",
      "fill-rule": "nonzero"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1.5,1 C1.22385763,1 1,1.22385763 1,1.5 L1,8.5 C1,8.77614237 1.22385763,9 1.5,9 L10.5,9 C10.7761424,9 11,8.77614237 11,8.5 L11,1.5 C11,1.22385763 10.7761424,1 10.5,1 L1.5,1 Z M7,7 L8,7 L11,7 L11,6 L1,6 L1,7 L4,7 L5,7 L7,7 Z M1.5,0 L10.5,0 C11.3284271,0 12,0.671572875 12,1.5 L12,8.5 C12,9.32842712 11.3284271,10 10.5,10 L1.5,10 C0.671572875,10 0,9.32842712 0,8.5 L0,1.5 C0,0.671572875 0.671572875,0 1.5,0 Z M4,7 L4,9 L5,9 L5,7 L4,7 Z M7,7 L7,9 L8,9 L8,7 L7,7 Z",
      "id": "fill"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-57756ead", module.exports)
  }
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.inMeeting) ? _c('div', {
    attrs: {
      "id": "signin"
    }
  }, [_c('div', {
    staticClass: "page page1"
  }, [_c('div', {
    staticClass: "btn btn_next",
    on: {
      "click": function($event) {
        _vm.showPage(2)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn btn_skip",
    on: {
      "click": _vm.meetNow
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "page page2"
  }, [_c('div', {
    staticClass: "btn btn_next",
    on: {
      "click": function($event) {
        _vm.showPage(3)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "page page3"
  }, [_c('div', {
    staticClass: "tabc das_tabc1"
  }, [_c('div', {
    staticClass: "btn btn_meet",
    on: {
      "click": _vm.meetNow
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "tabc das_tabc2",
    staticStyle: {
      "display": "none"
    }
  }, [_c('div', {
    staticClass: "btn btn_join",
    on: {
      "click": _vm.meetNow
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "tabc das_tabc3",
    staticStyle: {
      "display": "none"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn tab1",
    on: {
      "click": function($event) {
        _vm.goDasTab(1)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn tab2",
    on: {
      "click": function($event) {
        _vm.goDasTab(2)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn tab3",
    on: {
      "click": function($event) {
        _vm.goDasTab(3)
      }
    }
  })])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-582c3054", module.exports)
  }
}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "16px",
      "height": "14px",
      "viewBox": "0 0 16 14",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(-771.000000, -325.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(745.000000, 152.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(0.000000, 156.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(26.000000, 16.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "0",
      "y": "0",
      "width": "16",
      "height": "16"
    }
  }), _vm._v(" "), _c('g', {
    staticClass: "stroke",
    attrs: {
      "transform": "translate(1.000000, 2.000000)"
    }
  }, [_c('path', {
    attrs: {
      "d": "M2.15454552,3.77045467 L1.07727276,3.77045467 C0.482618197,3.77045467 0,4.25307286 0,4.84772743 L0,10.7727276 C0,11.3673822 0.482618197,11.8500004 1.07727276,11.8500004 L2.15454552,11.8500004 C2.74920009,11.8500004 3.23181829,11.3673822 3.23181829,10.7727276 L3.23181829,4.84772743 C3.23181829,4.25307286 2.74920009,3.77045467 2.15454552,3.77045467 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.54090933,7.00227295 L6.46363657,7.00227295 C5.86898201,7.00227295 5.38636381,7.48489115 5.38636381,8.07954571 L5.38636381,10.7727276 C5.38636381,11.3673822 5.86898201,11.8500004 6.46363657,11.8500004 L7.54090933,11.8500004 C8.1355639,11.8500004 8.6181821,11.3673822 8.6181821,10.7727276 L8.6181821,8.07954571 C8.6181821,7.48489115 8.1355639,7.00227295 7.54090933,7.00227295 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M12.9272731,0 L11.8500004,0 C11.2553458,0 10.7727276,0.482618197 10.7727276,1.07727276 L10.7727276,10.7727276 C10.7727276,11.3673822 11.2553458,11.8500004 11.8500004,11.8500004 L12.9272731,11.8500004 C13.5219277,11.8500004 14.0045459,11.3673822 14.0045459,10.7727276 L14.0045459,1.07727276 C14.0045459,0.482618197 13.5219277,0 12.9272731,0 Z"
    }
  })])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5d6685c4", module.exports)
  }
}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "10px",
      "viewBox": "0 0 12 10",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(-1068.000000, -128.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(171.000000, 44.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(17.000000, 73.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(870.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(10.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "transform": "translate(0.000000, 1.000000)"
    }
  }, [_c('path', {
    staticClass: "fill",
    attrs: {
      "d": "M10.5294118,8.5 C10.7948143,8.5 11,8.30485839 11,8.07692308 L11,1.92307692 C11,1.69514161 10.7948143,1.5 10.5294118,1.5 L1.47058824,1.5 C1.20518567,1.5 1,1.69514161 1,1.92307692 L1,8.07692308 C1,8.30485839 1.20518567,8.5 1.47058824,8.5 L10.5294118,8.5 Z M10.5294118,9.5 L1.47058824,9.5 C0.663814334,9.5 0,8.86868007 0,8.07692308 L0,1.92307692 C0,1.13131993 0.663814334,0.5 1.47058824,0.5 L10.5294118,0.5 C11.3361857,0.5 12,1.13131993 12,1.92307692 L12,8.07692308 C12,8.86868007 11.3361857,9.5 10.5294118,9.5 Z",
      "fill-rule": "nonzero"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "stroke",
    attrs: {
      "d": "M8,8.5 L8,1.5",
      "stroke-linejoin": "round"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5e7d198c", module.exports)
  }
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "16px",
      "height": "16px",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    staticClass: "fill",
    attrs: {
      "transform": "translate(-771.000000, -228.000000)",
      "fill-rule": "nonzero"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(745.000000, 152.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(0.000000, 60.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(26.000000, 16.000000)"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M0.000530928748,7.99973454 C0.000530928748,3.58173877 3.5822697,0 8.00026546,0 C12.4182612,0 16,3.58173877 16,7.99973454 C16,12.4177303 12.4182612,15.9994691 8.00026546,15.9994691 C6.6540043,15.9994691 5.35530263,15.6615387 4.19129733,15.0281198 L0.629925193,15.982431 C0.258148665,16.0820529 -0.0820529056,15.7418513 0.0175689582,15.3700748 L0.971881561,11.8086977 C0.338627481,10.6449048 0.000530928748,9.34536678 0.000530928748,7.99973454 Z M4.12897878,14.0095737 C4.25715235,13.9752281 4.39372189,13.9932429 4.5086052,14.0596501 C5.56838711,14.6722463 6.76072044,14.9995023 8.00026546,14.9995023 C11.8659948,14.9995023 15.0000332,11.8654639 15.0000332,7.99973454 C15.0000332,4.13400519 11.8659948,0.999966817 8.00026546,0.999966817 C4.13453612,0.999966817 1.00049775,4.13400519 1.00049775,7.99973454 C1.00049775,9.23865437 1.32795613,10.4319631 1.94034993,11.4913948 C2.00675707,11.6062781 2.02477191,11.7428477 1.9904263,11.8710212 L1.20761193,14.7923881 L4.12897878,14.0095737 Z"
    }
  })])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5fbd6ee6", module.exports)
  }
}

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popAVConnectionVisible),
      expression: "popAVConnectionVisible"
    }],
    attrs: {
      "id": "pop_ac_connection"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("Audio and Video Connection")]), _vm._v(" "), _c('div', {
    staticClass: "img"
  }, [_c('svg', {
    attrs: {
      "width": "508px",
      "height": "279px",
      "viewBox": "0 0 508 279",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs', [_c('rect', {
    attrs: {
      "id": "path-1",
      "x": "0",
      "y": "0",
      "width": "230",
      "height": "196",
      "rx": "4"
    }
  })]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Symbols",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "audio-section",
      "transform": "translate(0.000000, -2.000000)"
    }
  }, [_c('g', [_c('g', {
    attrs: {
      "id": "dropdown",
      "transform": "translate(0.000000, 37.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bg",
      "stroke": "#D7D7D8",
      "x": "0.5",
      "y": "0.5",
      "width": "229",
      "height": "31",
      "rx": "4"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "arrow-down_12",
      "transform": "translate(206.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "icon",
      "transform": "translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)",
      "fill": "#343537"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959",
      "id": "fill",
      "transform": "translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "
    }
  })])]), _vm._v(" "), _c('text', {
    attrs: {
      "id": "label",
      "font-family": "SegoeUI, Segoe UI",
      "font-size": "14",
      "font-weight": "normal",
      "fill": "#292929"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "12",
      "y": "21"
    }
  }, [_vm._v("Call Using Computer")])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "call-in-info",
      "transform": "translate(0.000000, 85.000000)"
    }
  }, [_c('mask', {
    attrs: {
      "id": "mask-2",
      "fill": "white"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "#path-1"
    }
  })]), _vm._v(" "), _c('rect', {
    attrs: {
      "stroke": "#D7D7D8",
      "x": "0.5",
      "y": "0.5",
      "width": "229",
      "height": "195",
      "rx": "4"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "info",
      "mask": "url(#mask-2)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(1.000000, 12.000000)"
    }
  }, [_c('text', {
    attrs: {
      "id": "Speaker:",
      "font-family": "SegoeUI-SemiBold, Segoe UI",
      "font-size": "12",
      "font-weight": "500"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "11",
      "y": "13",
      "fill": "#292929"
    }
  }, [_vm._v("Speaker:")])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "dropdown",
      "stroke-width": "1",
      "fill-rule": "evenodd",
      "transform": "translate(11.000000, 24.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bg",
      "stroke": "#D7D7D8",
      "x": "0.5",
      "y": "0.5",
      "width": "205",
      "height": "31",
      "rx": "4"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "arrow-down_12",
      "transform": "translate(182.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "icon",
      "transform": "translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)",
      "fill": "#343537"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959",
      "id": "fill",
      "transform": "translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "
    }
  })])]), _vm._v(" "), _c('text', {
    attrs: {
      "id": "label",
      "font-family": "SegoeUI, Segoe UI",
      "font-size": "14",
      "font-weight": "normal",
      "fill": "#292929"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "12",
      "y": "21"
    }
  }, [_vm._v("Device Name")])])]), _vm._v(" "), _c('text', {
    attrs: {
      "id": "Microphone:",
      "font-family": "SegoeUI-SemiBold, Segoe UI",
      "font-size": "12",
      "font-weight": "500"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "11",
      "y": "85",
      "fill": "#292929"
    }
  }, [_vm._v("Microphone:")])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "dropdown",
      "stroke-width": "1",
      "fill-rule": "evenodd",
      "transform": "translate(11.000000, 96.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bg",
      "stroke": "#D7D7D8",
      "x": "0.5",
      "y": "0.5",
      "width": "205",
      "height": "31",
      "rx": "4"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "arrow-down_12",
      "transform": "translate(182.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "icon",
      "transform": "translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)",
      "fill": "#343537"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959",
      "id": "fill",
      "transform": "translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "
    }
  })])]), _vm._v(" "), _c('text', {
    attrs: {
      "id": "label",
      "font-family": "SegoeUI, Segoe UI",
      "font-size": "14",
      "font-weight": "normal",
      "fill": "#292929"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "12",
      "y": "21"
    }
  }, [_vm._v("Device Name")])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "more-settings",
      "stroke-width": "1",
      "fill-rule": "evenodd",
      "transform": "translate(0.000000, 136.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "Rectangle-10",
      "x": "0",
      "y": "0",
      "width": "228",
      "height": "36"
    }
  }), _vm._v(" "), _c('text', {
    attrs: {
      "id": "More-Settings",
      "font-family": "SegoeUI, Segoe UI",
      "font-size": "14",
      "font-weight": "normal",
      "fill": "#049FD9"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "12",
      "y": "23"
    }
  }, [_vm._v("More Settings")])])])])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "label",
      "transform": "translate(36.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "Group",
      "transform": "translate(24.000000, 0.000000)",
      "fill": "#343537",
      "font-family": "SegoeUI-SemiBold, Segoe UI",
      "font-size": "12",
      "font-weight": "500"
    }
  }, [_c('text', {
    attrs: {
      "id": "Select-Audio-Connect"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "0",
      "y": "13"
    }
  }, [_vm._v("Select Audio Connection")])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "handset_16",
      "transform": "translate(0.000000, 1.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "16",
      "height": "16"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "icon",
      "transform": "translate(1.000000, 1.000000)",
      "fill": "#292929"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1.65186929,1 C1.44886929,1 1.25986929,1.092 1.13486929,1.252 C1.01386929,1.409 0.971869286,1.608 1.01986929,1.798 C1.57186929,3.971 3.14486929,6.474 5.33686929,8.665 C7.52686929,10.855 10.0288693,12.428 12.2018693,12.98 C12.3928693,13.027 12.5918693,12.986 12.7488693,12.864 C12.9088693,12.74 13.0008693,12.552 13.0008693,12.349 L13.0008693,10.849 C13.0008693,10.437 12.7558693,10.066 12.3788693,9.904 L11.0608693,9.337 C10.6788693,9.173 10.2438693,9.185 9.87186929,9.372 L9.12186929,9.747 C8.67986929,9.966 8.14386929,9.909 7.75886929,9.598 C6.46386929,8.559 5.23386929,7.336 4.38386929,6.244 C4.08486929,5.859 4.02986929,5.329 4.24686929,4.894 L4.62986929,4.128 C4.81586929,3.756 4.82886929,3.323 4.66386929,2.94 L4.09686929,1.622 C3.93386929,1.244 3.56286929,1 3.15186929,1 L1.65186929,1 Z M12.3598693,14 C12.2248693,14 12.0898693,13.983 11.9558693,13.95 C9.61286929,13.354 6.94286929,11.686 4.62986929,9.372 C2.31386929,7.057 0.645869286,4.387 0.0508692858,2.044 C-0.0741307142,1.553 0.0338692858,1.041 0.345869286,0.639 C0.661869286,0.233 1.13786929,0 1.65186929,0 L3.15186929,0 C3.96386929,0 4.69486929,0.482 5.01486929,1.228 L5.58186929,2.545 C5.86386929,3.199 5.84186929,3.939 5.52386929,4.576 L5.14086929,5.341 C5.09486929,5.434 5.10686929,5.544 5.17286929,5.629 C5.96486929,6.648 7.16686929,7.84 8.38486929,8.818 C8.46986929,8.887 8.58186929,8.899 8.67386929,8.852 L9.42386929,8.477 C10.0608693,8.16 10.7998693,8.138 11.4558693,8.418 L12.7728693,8.985 C13.5188693,9.305 14.0008693,10.037 14.0008693,10.849 L14.0008693,12.349 C14.0008693,12.863 13.7678693,13.338 13.3628693,13.654 C13.0698693,13.881 12.7188693,14 12.3598693,14 L12.3598693,14 Z",
      "id": "fill"
    }
  })])])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "video-section",
      "transform": "translate(278.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "dropdown",
      "transform": "translate(0.000000, 37.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bg",
      "stroke": "#D7D7D8",
      "x": "0.5",
      "y": "0.5",
      "width": "229",
      "height": "31",
      "rx": "4"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "arrow-down_12",
      "transform": "translate(206.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "icon",
      "transform": "translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)",
      "fill": "#343537"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959",
      "id": "fill",
      "transform": "translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "
    }
  })])]), _vm._v(" "), _c('text', {
    attrs: {
      "id": "label",
      "font-family": "SegoeUI, Segoe UI",
      "font-size": "14",
      "font-weight": "normal",
      "fill": "#292929"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "12",
      "y": "21"
    }
  }, [_vm._v("Microsoft LifeCam Font")])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "label",
      "transform": "translate(37.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "Group",
      "transform": "translate(24.000000, 0.000000)",
      "fill": "#343537",
      "font-family": "SegoeUI-SemiBold, Segoe UI",
      "font-size": "12",
      "font-weight": "500"
    }
  }, [_c('text', {
    attrs: {
      "id": "Select-Video-Connect"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "0",
      "y": "13"
    }
  }, [_vm._v("Select Video Connection")])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "camera_16",
      "transform": "translate(0.000000, 1.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "icon"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "16",
      "height": "16"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M15.388,4.088 C15.76,4.241 16,4.602 16,5.003 L16,10.997 C16,11.399 15.76,11.758 15.389,11.911 C15.266,11.963 15.136,11.987 15.008,11.987 C14.752,11.987 14.499,11.888 14.309,11.697 L12.004,9.392 L12,9.379 L12,11.991 C12,13.101 11.098,14 9.992,14 L2.009,14 C0.899,14 -8.8817842e-16,13.098 -8.8817842e-16,11.991 L-8.8817842e-16,4.009 C-8.8817842e-16,2.9 0.902,2 2.009,2 L9.992,2 C11.101,2 12,2.902 12,4.009 L12,6.611 L14.309,4.303 C14.593,4.02 15.016,3.936 15.388,4.088 Z M12.026,8 L15.016,10.99 L15,5.003 L12.026,8 Z M1,11.9914698 C1,12.5469054 1.45267418,13 2.0085302,13 L9.9914698,13 C10.5469054,13 11,12.5473258 11,11.9914698 L11,4.0085302 C11,3.45309463 10.5473258,3 9.9914698,3 L2.0085302,3 C1.45309463,3 1,3.45267418 1,4.0085302 L1,11.9914698 Z",
      "id": "fill",
      "fill": "#292929"
    }
  })])])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "info",
      "transform": "translate(0.000000, 220.000000)"
    }
  }, [_c('text', {
    attrs: {
      "id": "Your-video-is-not-sh",
      "font-family": "SegoeUI, Segoe UI",
      "font-size": "12",
      "font-weight": "normal",
      "fill": "#292929"
    }
  }, [_c('tspan', {
    attrs: {
      "x": "0",
      "y": "13"
    }
  }, [_vm._v("Your video is not showing in the meeting ")]), _vm._v(" "), _c('tspan', {
    attrs: {
      "x": "0",
      "y": "29"
    }
  }, [_vm._v("yet.")])]), _vm._v(" "), _c('g', {
    attrs: {
      "id": "info_12",
      "transform": "translate(23.000000, 19.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "id": "icon",
      "transform": "translate(1.000000, 1.000000)",
      "fill": "#292929",
      "fill-rule": "nonzero"
    }
  }, [_c('path', {
    attrs: {
      "d": "M5.5,10 C7.98528137,10 10,7.98528137 10,5.5 C10,3.01471863 7.98528137,1 5.5,1 C3.01471863,1 1,3.01471863 1,5.5 C1,7.98528137 3.01471863,10 5.5,10 Z M5.5,11 C2.46243388,11 0,8.53756612 0,5.5 C0,2.46243388 2.46243388,0 5.5,0 C8.53756612,0 11,2.46243388 11,5.5 C11,8.53756612 8.53756612,11 5.5,11 Z M5.5,4 C5.77614237,4 6,3.77614237 6,3.5 C6,3.22385763 5.77614237,3 5.5,3 C5.22385763,3 5,3.22385763 5,3.5 C5,3.77614237 5.22385763,4 5.5,4 Z M5.5,5 C5.22385763,5 5,5.22385763 5,5.5 L5,7.5 C5,7.77614237 5.22385763,8 5.5,8 C5.77614237,8 6,7.77614237 6,7.5 L6,5.5 C6,5.22385763 5.77614237,5 5.5,5 Z",
      "id": "fill"
    }
  })])])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "video"
  }, [_c('video', {
    attrs: {
      "id": "camera_preview_av",
      "autoplay": "true"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Preview Only")])]), _vm._v(" "), _c('div', {
    staticClass: "btn_connect uibutton green",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.connectAudioVideo($event)
      }
    }
  }, [_vm._v("Connect Audio and Video")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-67819183", module.exports)
  }
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "10px",
      "viewBox": "0 0 12 10",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Sharing",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "Sharing-2.0",
      "transform": "translate(-1007.000000, -84.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "App"
    }
  }, [_c('g', {
    attrs: {
      "id": "top-control-bar",
      "transform": "translate(16.000000, 73.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "button",
      "transform": "translate(981.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "video-layout_12",
      "transform": "translate(16.000000, 16.000000) scale(1, -1) translate(-16.000000, -16.000000) translate(10.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    staticClass: "fill",
    attrs: {
      "id": "icon",
      "transform": "translate(0.000000, 1.000000)",
      "fill-rule": "nonzero"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1.5,1 C1.22385763,1 1,1.22385763 1,1.5 L1,8.5 C1,8.77614237 1.22385763,9 1.5,9 L10.5,9 C10.7761424,9 11,8.77614237 11,8.5 L11,1.5 C11,1.22385763 10.7761424,1 10.5,1 L1.5,1 Z M7,7 L8,7 L11,7 L11,6 L1,6 L1,7 L4,7 L5,7 L7,7 Z M1.5,0 L10.5,0 C11.3284271,0 12,0.671572875 12,1.5 L12,8.5 C12,9.32842712 11.3284271,10 10.5,10 L1.5,10 C0.671572875,10 0,9.32842712 0,8.5 L0,1.5 C0,0.671572875 0.671572875,0 1.5,0 Z M4,7 L4,9 L5,9 L5,7 L4,7 Z M7,7 L7,9 L8,9 L8,7 L7,7 Z",
      "id": "fill"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6a3a629a", module.exports)
  }
}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popVideoVisible),
      expression: "popVideoVisible"
    }],
    attrs: {
      "id": "pop_video"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("Video Connection")]), _vm._v(" "), _c('select', {
    attrs: {
      "id": "cam_list"
    }
  }, [_c('option', {
    attrs: {
      "selected": "selected"
    }
  }, [_vm._v("Microsoft LifeCam Font")]), _vm._v(" "), _c('option', [_vm._v("iSight Cam")])]), _vm._v(" "), _c('div', {
    staticClass: "video"
  }, [_c('video', {
    attrs: {
      "id": "camera_preview",
      "autoplay": "true"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "lb"
  }, [_vm._v("Preview Only")])]), _vm._v(" "), (!_vm.videoConnected) ? _c('div', {
    staticClass: "btn_start uibutton green",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.sendVideo($event)
      }
    }
  }, [_vm._v("Start My Video")]) : _vm._e(), _vm._v(" "), (_vm.videoConnected) ? _c('div', {
    staticClass: "btn_stop uibutton red",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.stopVideo($event)
      }
    }
  }, [_vm._v("Stop My Video")]) : _vm._e()])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-77d50e0a", module.exports)
  }
}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "10px",
      "viewBox": "0 0 12 10",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Sharing",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "Sharing-5.0",
      "transform": "translate(-1240.000000, -77.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "App",
      "transform": "translate(-11.000000, -10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "as-video",
      "transform": "translate(1005.000000, 70.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "button",
      "transform": "translate(240.000000, 10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "picture-in-picture_12",
      "transform": "translate(6.000000, 6.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "id": "bound",
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    staticClass: "fill",
    attrs: {
      "id": "icon",
      "transform": "translate(0.000000, 1.000000)",
      "fill-rule": "nonzero"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1.5,1 C1.22385763,1 1,1.22385763 1,1.5 L1,8.5 C1,8.77614237 1.22385763,9 1.5,9 L10.5,9 C10.7761424,9 11,8.77614237 11,8.5 L11,1.5 C11,1.22385763 10.7761424,1 10.5,1 L1.5,1 Z M1.5,0 L10.5,0 C11.3284271,0 12,0.671572875 12,1.5 L12,8.5 C12,9.32842712 11.3284271,10 10.5,10 L1.5,10 C0.671572875,10 0,9.32842712 0,8.5 L0,1.5 C0,0.671572875 0.671572875,0 1.5,0 Z M7,6 L9,6 L9,7 L7,7 L7,6 Z M6.5,5 C6.22385763,5 6,5.22385763 6,5.5 L6,7.5 C6,7.77614237 6.22385763,8 6.5,8 L9.5,8 C9.77614237,8 10,7.77614237 10,7.5 L10,5.5 C10,5.22385763 9.77614237,5 9.5,5 L6.5,5 Z",
      "id": "fill"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7886ae54", module.exports)
  }
}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.plistPanelVisible),
      expression: "plistPanelVisible"
    }],
    staticClass: "con_flex_column",
    class: {
      flex_none: _vm.flexNone, flex_1: !_vm.flexNone
    },
    attrs: {
      "id": "plist_panel"
    }
  }, [_c('panel-header', {
    staticClass: "flex_none",
    attrs: {
      "title": _vm.title,
      "type": "plist"
    },
    on: {
      "close": _vm.close,
      "collapse": _vm.collapse
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.plistPanelClsed),
      expression: "!plistPanelClsed"
    }],
    staticClass: "scrollpane flex_1"
  }, [_c('div', {
    staticClass: "list"
  }, _vm._l((_vm.peopleList), function(p, index) {
    return _c('plist-item', {
      key: index,
      attrs: {
        "name": p.name,
        "me": p.me,
        "host": p.host,
        "avatar": p.avatar,
        "video": p.video,
        "audio": p.audio,
        "muted": p.muted
      }
    })
  }))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7ca50701", module.exports)
  }
}

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "11px",
      "height": "9px",
      "viewBox": "0 0 11 9",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    staticClass: "fill"
  }, [_c('path', {
    attrs: {
      "d": "M0.5,4 L10.5,4 C10.776,4 11,4.224 11,4.5 C11,4.776 10.776,5 10.5,5 L0.5,5 C0.224,5 0,4.776 0,4.5 C0,4.224 0.224,4 0.5,4 Z M0.5,0 L10.5,0 C10.776,0 11,0.224 11,0.5 C11,0.776 10.776,1 10.5,1 L0.5,1 C0.224,1 0,0.776 0,0.5 C0,0.224 0.224,0 0.5,0 Z M0.5,8 L10.5,8 C10.776,8 11,8.224 11,8.5 C11,8.776 10.776,9 10.5,9 L0.5,9 C0.224,9 0,8.776 0,8.5 C0,8.224 0.224,8 0.5,8 Z",
      "id": "fill"
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7dba7f9f", module.exports)
  }
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "itm con_flex_row"
  }, [_c('div', {
    staticClass: "col1 flex_none"
  }, [(!_vm.isMe) ? _c('div', {
    staticClass: "avatar",
    style: ({
      backgroundImage: _vm.avatarUrl
    })
  }, [(!_vm.avatar) ? _c('span', [_vm._v(_vm._s(_vm.abbr))]) : _vm._e()]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "flex_1",
    class: {
      rightAlign: _vm.isMe
    }
  }, [_c('div', {
    staticClass: "lb_name"
  }, [_vm._v(_vm._s(_vm.name2name))]), _vm._v(" "), _c('div', {
    staticClass: "lb_msg"
  }, [_vm._v(_vm._s(_vm.msg))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7f4e62e4", module.exports)
  }
}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.popAudioVisible),
      expression: "popAudioVisible"
    }],
    attrs: {
      "id": "pop_audio"
    }
  }, [_c('div', {
    staticClass: "triangle"
  }), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrap"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("Audio and Video Connection")]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm con_flex_row btn_callme",
    on: {
      "click": _vm.connectAudio
    }
  }, [_c('div', {
    staticClass: "ico flex_none"
  }), _vm._v(" "), _c('div', {
    staticClass: "colr flex_1"
  }, [_c('div', {
    staticClass: "lb"
  }, [_vm._v("Call Me")]), _vm._v(" "), _c('div', {
    staticClass: "sub"
  }, [_vm._v("1-4080-555-1234")]), _vm._v(" "), _c('div', {
    staticClass: "link"
  }, [_vm._v("Change settings")]), _vm._v(" "), _c('span')])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm con_flex_row btn_callin",
    on: {
      "click": _vm.connectAudio
    }
  }, [_c('div', {
    staticClass: "ico flex_none"
  }), _vm._v(" "), _c('div', {
    staticClass: "colr flex_1"
  }, [_c('div', {
    staticClass: "lb"
  }, [_vm._v("I Will Call In")]), _vm._v(" "), _c('span')])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm con_flex_row btn_pc",
    on: {
      "click": _vm.connectAudio
    }
  }, [_c('div', {
    staticClass: "ico flex_none"
  }), _vm._v(" "), _c('div', {
    staticClass: "colr flex_1"
  }, [_c('div', {
    staticClass: "lb"
  }, [_vm._v("Call Using Computer")]), _vm._v(" "), _c('div', {
    staticClass: "link"
  }, [_vm._v("Change settings")])])]), _vm._v(" "), _c('div', {
    staticClass: "itm menuitm con_flex_row btn_callvs",
    on: {
      "click": _vm.connectAudio
    }
  }, [_c('div', {
    staticClass: "ico flex_none"
  }), _vm._v(" "), _c('div', {
    staticClass: "colr flex_1"
  }, [_c('div', {
    staticClass: "lb"
  }, [_vm._v("Call My Video System")])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7fd9dad6", module.exports)
  }
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.cameraOn && _vm.videoConnected),
      expression: "cameraOn && videoConnected"
    }],
    class: {
      min: _vm.minimized
    },
    attrs: {
      "id": "self_video"
    },
    on: {
      "mousemove": _vm.mousemove
    }
  }, [_c('video', {
    attrs: {
      "id": "camera",
      "autoplay": "true"
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip.hover.click.bottom",
      value: (_vm.minimized ? "Restore this Window" : "Minimize Selfvideo (Other will continue to see my video)"),
      expression: "minimized ? \"Restore this Window\" : \"Minimize Selfvideo (Other will continue to see my video)\"",
      modifiers: {
        "hover": true,
        "click": true,
        "bottom": true
      }
    }],
    staticClass: "btn_minimize",
    class: {
      min: _vm.minimized
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleMinimize($event)
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-82b66624", module.exports)
  }
}

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "13px",
      "height": "10px",
      "viewBox": "0 0 13 10",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('path', {
    staticClass: "fill",
    attrs: {
      "d": "M0.114,4.1169 C-0.062,4.3309 -0.031,4.6459 0.183,4.8209 C0.395,4.9969 0.71,4.9659 0.886,4.7529 C2.584,2.6899 5.126,0.6189 5.876,1.0449 C5.953,1.0889 5.977,1.1339 5.992,1.1919 C6.142,1.7759 5.261,3.2229 4.553,4.3839 C3.446,6.2009 2.491,7.7709 3.379,8.6209 C3.603,8.8339 3.873,8.9339 4.184,8.9239 C5.09,8.8799 6.061,7.7489 7.185,6.4389 C8.033,5.4499 9.448,3.7879 9.954,4.1059 C10.267,4.3019 9.403,5.8529 9.035,6.5149 C8.343,7.7569 7.797,8.7379 8.168,9.4169 C8.352,9.7509 8.646,9.9499 8.999,9.9789 C9.027,9.9809 9.054,9.9819 9.082,9.9819 C10.169,9.9819 11.55,8.3209 11.955,7.8009 C12.124,7.5829 12.084,7.2689 11.867,7.0989 C11.649,6.9279 11.335,6.9679 11.165,7.1869 C10.327,8.2629 9.34,9.0509 9.051,8.9499 C8.978,8.6719 9.561,7.6269 9.908,7.0019 C10.704,5.5749 11.604,3.9589 10.484,3.2579 C9.255,2.4899 7.881,4.0919 6.425,5.7879 C5.661,6.6789 4.615,7.8979 4.073,7.8979 L4.071,7.8979 C3.763,7.6039 4.874,5.7809 5.407,4.9049 C6.337,3.3779 7.216,1.9359 6.96,0.9429 C6.876,0.6139 6.673,0.3499 6.373,0.1779 C6.159,0.0549 5.922,-0.0001 5.669,-0.0001 C3.534,0.0009 0.268,3.9309 0.114,4.1169"
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-83510814", module.exports)
  }
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "16px",
      "height": "16px",
      "viewBox": "0 0 16 16",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('desc', [_vm._v("Created with Sketch.")]), _vm._v(" "), _c('defs'), _vm._v(" "), _c('g', {
    attrs: {
      "id": "Video-Centric-",
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "Video-Centric-3.0",
      "transform": "translate(-605.000000, -363.000000)",
      "fill": "#292929"
    }
  }, [_c('g', {
    attrs: {
      "id": "Group-2",
      "transform": "translate(579.000000, 243.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "item-copy-3",
      "transform": "translate(0.000000, 104.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "button",
      "transform": "translate(16.000000, 6.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "multimedia_16",
      "transform": "translate(10.000000, 10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "icon"
    }
  }, [_c('path', {
    attrs: {
      "d": "M8,7 L8,1.019 C11.187,1.263 13.737,3.813 13.981,7 L8,7 Z M7,13.981 C3.648,13.725 1,10.916 1,7.5 C1,4.084 3.648,1.275 7,1.019 L7,13.981 Z M15,7.5 C15,7.776 14.776,8 14.5,8 L8,8 L8,14.5 C8,14.776 7.776,15 7.5,15 C3.364,15 0,11.636 0,7.5 C0,3.364 3.364,0 7.5,0 C11.636,0 15,3.364 15,7.5 Z M15.5,9 C15.775,9 16,9.225 16,9.5 L16,15.5 C16,15.775 15.775,16 15.5,16 C15.225,16 15,15.775 15,15.5 L15,15 L10,15 L10,15.5 C10,15.775 9.775,16 9.5,16 C9.225,16 9,15.775 9,15.5 L9,9.5 C9,9.225 9.225,9 9.5,9 C9.775,9 10,9.225 10,9.5 L10,10 L11,10 L12,10 L15,10 L15,9.5 C15,9.225 15.225,9 15.5,9 Z M14,12 L15,12 L15,11 L14,11 L14,12 Z M14,14 L15,14 L15,13 L14,13 L14,14 Z M12,14 L13,14 L13,11 L12,11 L12,14 Z M10,14 L11,14 L11,13 L10,13 L10,14 Z M10,12 L11,12 L11,11 L10,11 L10,12 Z",
      "id": "fill"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-92185f80", module.exports)
  }
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "12px",
      "viewBox": "0 0 12 12",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(-1068.000000, -127.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(171.000000, 44.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(1.000000, 61.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(16.000000, 12.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(806.000000, 0.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(74.000000, 10.000000)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "0",
      "y": "0",
      "width": "12",
      "height": "12"
    }
  }), _vm._v(" "), _c('g', {
    staticClass: "fill",
    attrs: {
      "fill-rule": "nonzero"
    }
  }, [_c('path', {
    attrs: {
      "d": "M4.02192857,6.57142857 C4.79869954,6.57142857 5.42871429,7.20127194 5.42871429,7.97785714 L5.42871429,10.0935714 C5.42871429,10.8701566 4.79869954,11.5 4.02192857,11.5 L1.90657143,11.5 C1.12980763,11.5 0.500142857,10.8701638 0.500142857,10.0935714 L0.500142857,7.97785714 C0.500142857,7.20126472 1.12980763,6.57142857 1.90657143,6.57142857 L4.02192857,6.57142857 Z M4.02192857,7.57142857 L1.90657143,7.57142857 C1.68215331,7.57142857 1.50014286,7.75348856 1.50014286,7.97785714 L1.50014286,10.0935714 C1.50014286,10.31794 1.68215331,10.5 1.90657143,10.5 L4.02192857,10.5 C4.24647568,10.5 4.42871429,10.317811 4.42871429,10.0935714 L4.42871429,7.97785714 C4.42871429,7.7536176 4.24647568,7.57142857 4.02192857,7.57142857 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M4.02192857,0.5 C4.79869954,0.5 5.42871429,1.12984336 5.42871429,1.90642857 L5.42871429,4.02214286 C5.42871429,4.79872806 4.79869954,5.42857143 4.02192857,5.42857143 L1.90657143,5.42857143 C1.12980763,5.42857143 0.500142857,4.79873528 0.500142857,4.02214286 L0.500142857,1.90642857 C0.500142857,1.12983615 1.12980763,0.5 1.90657143,0.5 L4.02192857,0.5 Z M4.02192857,1.5 L1.90657143,1.5 C1.68215331,1.5 1.50014286,1.68205999 1.50014286,1.90642857 L1.50014286,4.02214286 C1.50014286,4.24651144 1.68215331,4.42857143 1.90657143,4.42857143 L4.02192857,4.42857143 C4.24647568,4.42857143 4.42871429,4.2463824 4.42871429,4.02214286 L4.42871429,1.90642857 C4.42871429,1.68218903 4.24647568,1.5 4.02192857,1.5 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M10.0933571,6.57142857 C10.8701281,6.57142857 11.5001429,7.20127194 11.5001429,7.97785714 L11.5001429,10.0935714 C11.5001429,10.8701566 10.8701281,11.5 10.0933571,11.5 L7.978,11.5 C7.2012362,11.5 6.57157143,10.8701638 6.57157143,10.0935714 L6.57157143,7.97785714 C6.57157143,7.20126472 7.2012362,6.57142857 7.978,6.57142857 L10.0933571,6.57142857 Z M10.0933571,7.57142857 L7.978,7.57142857 C7.75358188,7.57142857 7.57157143,7.75348856 7.57157143,7.97785714 L7.57157143,10.0935714 C7.57157143,10.31794 7.75358188,10.5 7.978,10.5 L10.0933571,10.5 C10.3179043,10.5 10.5001429,10.317811 10.5001429,10.0935714 L10.5001429,7.97785714 C10.5001429,7.7536176 10.3179043,7.57142857 10.0933571,7.57142857 Z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M10.0933571,0.5 C10.8701281,0.5 11.5001429,1.12984336 11.5001429,1.90642857 L11.5001429,4.02214286 C11.5001429,4.79872806 10.8701281,5.42857143 10.0933571,5.42857143 L7.978,5.42857143 C7.2012362,5.42857143 6.57157143,4.79873528 6.57157143,4.02214286 L6.57157143,1.90642857 C6.57157143,1.12983615 7.2012362,0.5 7.978,0.5 L10.0933571,0.5 Z M10.0933571,1.5 L7.978,1.5 C7.75358188,1.5 7.57157143,1.68205999 7.57157143,1.90642857 L7.57157143,4.02214286 C7.57157143,4.24651144 7.75358188,4.42857143 7.978,4.42857143 L10.0933571,4.42857143 C10.3179043,4.42857143 10.5001429,4.2463824 10.5001429,4.02214286 L10.5001429,1.90642857 C10.5001429,1.68218903 10.3179043,1.5 10.0933571,1.5 Z"
    }
  })])])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-e52ccd0a", module.exports)
  }
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    attrs: {
      "width": "12px",
      "height": "12px",
      "viewBox": "0 0 12 12",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_c('g', {
    attrs: {
      "id": "3.0",
      "transform": "translate(-198.000000, -127.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(171.000000, 44.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(1.000000, 61.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(16.000000, 12.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(10.000000, 10.000000)"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(5.750000, 5.750000) scale(1, -1) translate(-5.750000, -5.750000) translate(0.250000, 0.250000)"
    }
  }, [_c('circle', {
    staticClass: "fill",
    attrs: {
      "cx": "5.5",
      "cy": "7.5",
      "r": "0.5"
    }
  }), _vm._v(" "), _c('circle', {
    staticClass: "stroke",
    attrs: {
      "cx": "5.5",
      "cy": "5.5",
      "r": "5"
    }
  }), _vm._v(" "), _c('rect', {
    staticClass: "fill",
    attrs: {
      "x": "5",
      "y": "3",
      "width": "1",
      "height": "3",
      "rx": "0.5"
    }
  })])])])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f5e1023a", module.exports)
  }
}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.panelVisible || _vm.videoLayoutMode == "side-by-side"),
      expression: "panelVisible || videoLayoutMode==\"side-by-side\""
    }],
    staticClass: "flex_none",
    attrs: {
      "id": "splitter"
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f604850a", module.exports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map
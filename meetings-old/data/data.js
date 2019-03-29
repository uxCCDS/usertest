export default {
	state: {
		inMeeting: false,
		videoLayoutMode: 'strip',//strip, grid, active-speaker, side-by-side, fullscreen
		videoFloatingLayoutMode: null,//strip, grid, active-speaker
		videoSharingSwitched: false,//in sharing mode. switch floating video/sharing content
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
		popStartPoint: [0,0],
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
		floatVideoOriSize: [120,68],
		floatVideoSize: [120,68],
		peopleList: [
			{
				name: 'Alison Cassidy',
				me: true,
				avatar: 'me.png',
				video: null,
				audio: 'pc',
				muted: false
			}

		],
		peopleNotJoinedList: [
			{
				name: 'Adrian Delamico',
				host:true,
				avatar: '1.png',
				video: '1.mp4',
				audio: 'pc',
				muted: false
			},
			{
				name: 'Catherine Sinu',
				avatar: '2.png',
				video: '2.mp4',
				audio: 'pc',
				muted: true
			},
			{
				name: 'Sherry Mckenna',
				avatar: '3.png',
				video: '3.mp4',
				audio: 'pc',
				muted: false
			},
			{
				name: 'Brenda Song',
				avatar: '4.png',
				video: '4.mp4',
				audio: 'pc',
				muted: false
			},
			{
				name: 'Elizabeth Wu',
				avatar: null,
				video: '5.mp4',
				audio: 'phone',
				muted: true
			},
			{
				name: 'Barbara German',
				avatar: null,
				video: '6.mp4',
				audio: 'pc',
				muted: false
			},
			{
				name: 'Emma Hirst',
				avatar: '7.png',
				video: null,
				audio: 'mobile',
				muted: false
			},
			{
				name: 'Giacomo Edwards',
				avatar: null,
				video: null,
				audio: 'pc',
				muted: false
			}
		],
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
		videoPath: '../../static/webex/video/',
	},
	getters: {
		activeSpeaker (state) {
			let p = state.peopleList.find( people => people.name == state.activeSpeakerName );
			let p2 = state.peopleNotJoinedList.find( people => people.name == state.activeSpeakerName );
			if(p){
				return p;
			}else{
				return p2;
			}
		},
		host (state) {
			let p = state.peopleList.find( people => people.host );
			let p2 = state.peopleNotJoinedList.find( people => people.host );
			if(p){
				return p;
			}else{
				return p2;
			}
		},
		people: (state) => (name) => {
			return state.peopleList.find( people => people.name == name );
		},
		me (state) {
			return state.peopleList.find( people => people.me );
		},
		anyOpenPanel (state) {
			return state.plistPanelVisible || state.chatPanelVisible || state.notesPanelVisible;
		},
		unreadMessages (state) {
			return state.chatMsgList.filter( msg => msg.unread )
		},
	},
	mutations: {
		inMeeting (state, newVal) {
			state.inMeeting = newVal;
		},
		videoLayoutMode (state, newVal) {
			state.videoLayoutMode = newVal;
		},
		videoFloatingLayoutMode (state, newVal) {
			state.videoFloatingLayoutMode = newVal;
		},
		videoSharingSwitched (state, newVal) {
			state.videoSharingSwitched = newVal;
		},
		floatingCollapsed (state, newVal) {
			state.floatingCollapsed = newVal;
		},
		videoLayoutPrepareMode (state, newVal) {
			state.videoLayoutPrepareMode = newVal;
		},
		audioConnected (state, newVal) {
			state.audioConnected = newVal;
		},
		videoConnected (state, newVal) {
			state.videoConnected = newVal;
		},
		muted (state, newVal) {
			state.muted = newVal;
		},
		cameraOn (state, newVal) {
			state.cameraOn = newVal;
		},
		lockedPeopleName (state, newVal) {
			state.lockedPeopleName = newVal;
		},
		activeSpeakerName (state, newVal) {
			state.activeSpeakerName = newVal;
		},
		fullscreen (state, newVal) {
			state.fullscreen = newVal;
		},
		recording (state, newVal) {
			state.recording = newVal;
		},
		recordingTime (state, newVal) {
			state.recordingTime = newVal;
		},
		locked (state, newVal) {
			state.locked = newVal;
		},
		currentSharing (state, newVal) {
			state.currentSharing = newVal;
		},
		popStartPoint (state, newVal) {
			state.popStartPoint = newVal;
		},
		poptipVisible (state, newVal) {
			state.poptipVisible = newVal;
		},
		poptipText (state, newVal) {
			state.poptipText = newVal;
		},
		popmenuPanelVisible (state, newVal) {
			state.popmenuPanelVisible = newVal;
		},
		popmenuMoreVisible (state, newVal) {
			state.popmenuMoreVisible = newVal;
		},
		popInfoVisible (state, newVal) {
			state.popInfoVisible = newVal;
		},
		popRecordVisible (state, newVal) {
			state.popRecordVisible = newVal;
		},
		popAudioVisible (state, newVal) {
			state.popAudioVisible = newVal;
		},
		popVideoVisible (state, newVal) {
			state.popVideoVisible = newVal;
		},
		popAVConnectionVisible (state, newVal) {
			state.popAVConnectionVisible = newVal;
		},
		popShareVisible (state, newVal) {
			state.popShareVisible = newVal;
		},
		popLockPeopleVisible (state, newVal) {
			state.popLockPeopleVisible = newVal;
		},
		popmenuSwitchSharingVisible (state, newVal) {
			state.popmenuSwitchSharingVisible = newVal;
		},
		rightPanelContentWidth (state, newVal) {
			state.rightPanelContentWidth = newVal;
		},
		rightPanelWidth (state, newVal) {
			state.rightPanelWidth = newVal;
		},
		sideBySideVideoColumn (state, newVal) {
			state.sideBySideVideoColumn = newVal;
		},
		panelVisible (state, newVal) {
			state.panelVisible = newVal;
		},
		plistPanelVisible (state, newVal) {
			state.plistPanelVisible = newVal;
		},
		plistPanelClsed (state, newVal) {
			state.plistPanelClsed = newVal;
		},
		chatPanelVisible (state, newVal) {
			state.chatPanelVisible = newVal;
		},
		chatPanelClsed (state, newVal) {
			state.chatPanelClsed = newVal;
		},
		notesPanelVisible (state, newVal) {
			state.notesPanelVisible = newVal;
		},
		annotationToolsVisible (state, newVal) {
			state.annotationToolsVisible = newVal;
		},
		docThumbsVisible (state, newVal) {
			state.docThumbsVisible = newVal;
		},
		peopleList (state, newVal) {
			state.peopleList = newVal;
		},
		peopleNotJoinedList (state, newVal) {
			state.peopleNotJoinedList = newVal;
		},
		chatMsgList (state, newVal) {
			state.chatMsgList = newVal;
		},
		floatVideoSize (state, newVal) {
			state.floatVideoSize = newVal;
		},
	}

}

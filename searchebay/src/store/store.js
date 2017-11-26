import Vue from 'vue';
import Vuex from 'vuex';

/* Use the Vuex state management with our vue app: */
Vue.use(Vuex);

/* Create the store: */
export default new Vuex.Store({
	state: {
		cache: {},
		AppToken: ''
	},
	getters: {
		fetchCache: state => {
			return state.cache;
		},
		fetchAppToken: state => {
			return state.AppToken;
		}
	},
	mutations: {
		addToCache: (state, payload) => {
			if(!state.cache[payload.cacheHash]) {
				state.cache[payload.cacheHash] = payload.response;
			}
		},
		AppToken: (state, payload) => {
			state.AppToken = payload.AppToken;
		}
	},
	actions: {
		addToCache: (context, payload) => {
			context.commit('addToCache', payload);
		},
		AppToken: (context) => {
			/* 1. Fetch app token */
			let _appToken = sessionStorage.getItem('appToken'),
				_expiry   = new Date(sessionStorage.getItem('expiry')),
				_hasExpired = _expiry.getTime() < (new Date()).getTime();

			return new Promise((resolve, reject) => {
				if(_appToken && !_hasExpired) {
					context.commit('AppToken', { AppToken: _appToken});
					resolve();
				} else {
					let expiry = new Date();
					expiry.setMinutes(expiry.getMinutes() + 20); // 20 minutes
					Vue.http.get('http://pushkardk.com/searchebay/get-app-token.php')
					.then(response => {
						_appToken = JSON.parse(response.body).access_token;
						context.commit('AppToken', { AppToken: _appToken });
						sessionStorage.setItem('appToken', _appToken);
						sessionStorage.setItem('expiry', expiry);
						resolve();
					})
					.catch(() => {
						reject();
					});
				}
			});
		}
	}
});
import Vue from 'vue';
import Vuex from 'vuex';

/* Use the Vuex state management with our vue app: */
Vue.use(Vuex);

/* Create the store: */
export default new Vuex.Store({
	state: {
		cache: {}
	},
	getters: {
		fetchCache: state => {
			return state.cache;
		}
	},
	mutations: {
		addToCache: (state, payload) => {
			if(!state.cache[payload.cacheHash]) {
				state.cache[payload.cacheHash] = payload.response;
			}
		}
	}
});
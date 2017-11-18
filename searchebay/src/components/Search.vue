<template>
  <div class="search clearfix">
	<form v-on:submit="searchItems" class="search-form">
		<input type="text" v-model="searchTerm" placeholder="Search input..." class="search-input">
		<input type="submit" value="Search ebay" class="search-submit">
	</form>
	<!-- Filters receive the full response from API (searchResults) -->
	<Filters v-on:filterTheSearch="filterResults" v-bind:setFilters="setFilterParams" v-bind:searchResults="searchResults"></Filters>
	<!-- Results receive only filtered results (filteredResults) -->
	<Results v-on:updateOffset="pagination" v-bind:filteredResults="filteredResults" v-bind:limit="limit" v-bind:offset="offset" v-bind:total="total"></Results>
  </div>
</template>

<script>
import Results from './Results.vue'
import Filters from './Filters.vue'

export default {
  name: 'Search',
  data() {
    return {
    	searchTerm: '',
    	searchResults: [],
    	filteredResults: [],
    	appToken: '',
    	limit: 50,
    	offset: 0,
    	total: undefined,
    	setFilterParams: undefined,
    	cachedRequests: {},
    	cacheHash: undefined
    }
  },
  components: {
  	Results: Results,
  	Filters: Filters
  },
  created() {
  	/* 1. Fetch app token */
  	let _appToken = sessionStorage.getItem('appToken'),
        _expiry   = new Date(sessionStorage.getItem('expiry')),
        _hasExpired = _expiry.getTime() < (new Date()).getTime();

  	if(_appToken && !_hasExpired) {
  		this.appToken = _appToken;
  		console.log('Session storage App Key used');
  	} else {
  		let expiry = new Date();
  		expiry.setMinutes(expiry.getMinutes() + 20); // 20 minutes

  		this.$http.get('http://pushkardk.com/searchebay/get-app-token.php')
  		.then(response => {
  			console.log(response);
  			this.appToken = JSON.parse(response.body).access_token;
  			sessionStorage.setItem('appToken', this.appToken);
  			sessionStorage.setItem('expiry', expiry);
  			console.log('HTTP Response to get App Key made, Saved into session storage');
  		});
  	}

  	/* 2. Find out if params were set */
  	let routeParams = this.$route.params;
  	if(routeParams) {
  		this.setFilterParams = {
  			limit: routeParams.limit,
  			offset: routeParams.offset,
  			filters: routeParams.filters
  		}
  	}
  },
  methods: {
  	searchItems(e) {
  		e.preventDefault();
  		if(this.searchTerm) {
  			this.fetchAndUseData();
  		} else {
  			alert('Enter a search term');
  		}
  	},
  	getItemData(item) {
  		return {
  			itemId: item.itemId,
  			title: item.title,
  			image: item.image,
  			condition: item.condition,
  			seller: item.seller,
  			currentBidPrice: item.currentBidPrice,
  			itemWebUrl: item.itemWebUrl
  		}
  	},
  	filterResults(filteredList) {
  		this.filteredResults = filteredList;
  	},
  	fetchAndUseData() {
  		this.showLoader(); // Add loader if it is taking time!
  		this.cacheHash = [
  				'https://api.ebay.com/buy/browse/v1/item_summary/search?',
  				'q=' + this.searchTerm,
  				'limit=' + this.limit,
  				'offset=' + this.offset
  			].join('');

  		if(this.cachedRequests[this.cacheHash]) {
  			console.log('Data from cache!');
  			this.update(this.cachedRequests[this.cacheHash]);
  		} else {
  			this.$http.get(
				'https://api.ebay.com/buy/browse/v1/item_summary/search',
				{ 
					params: { 
						q: this.searchTerm, limit: this.limit, offset: this.offset 
					},
					headers: { 'Authorization': 'Bearer ' + this.appToken }
				}
			).then(this.update);
  		}
  	},
  	/* The update inner function: */
	update(response) {
		// Save response in cache if it doesn't already exist!
		console.log(this, this.data);
		this.cachedRequests[this.cacheHash] = this.cachedRequests[this.cacheHash] || response;
		// Remaining updation: 
		this.total = response.body.total;
		this.searchResults = [];
		this.filteredResults = [];
		response.body.itemSummaries.forEach(item => {
			let itemData = this.getItemData(item);
			this.searchResults.push(itemData);
			this.filteredResults.push(itemData);
		});
		this.hideLoader();  // Remove loader once data has been retrieved!
	},
  	pagination(offset) {
  		console.log(1);
  		this.offset = offset;
  		this.fetchAndUseData();
  	},
  	showLoader() {
  		let DOMloader = document.getElementsByClassName('loader');
  		DOMloader[0].style.display = 'block';
  	},
  	hideLoader() {
  		let DOMloader = document.getElementsByClassName('loader');
  		DOMloader[0].style.display = 'none';
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-input {
	width: 80%;
    padding: 10px;
    font-size: 18px;
    height: 24px;
    color: #2c3e50;
    vertical-align: middle;
}
.search-submit {
	height: 45px;
    width: 17%;
    vertical-align: middle;
    border: 0;
    color: #fff;
    font-size: 18px;
    background: #2980b9;
    cursor: pointer;
}
</style>

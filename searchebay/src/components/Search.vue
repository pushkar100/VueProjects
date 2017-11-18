<template>
  <div class="search clearfix">
	<form v-on:submit="searchItems" class="search-form">
		<input type="text" v-model="searchTerm" placeholder="Search input..." class="search-input">
		<input type="submit" value="Search ebay" class="search-submit">
	</form>
	<!-- Filters receive the full response from API (searchResults) -->
	<Filters v-on:filterTheSearch="filterResults" v-bind:searchResults="searchResults"></Filters>
	<!-- Results receive only filtered results (filteredResults) -->
	<Results v-bind:filteredResults="filteredResults"></Results>
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
    	appToken: ''
    }
  },
  components: {
  	Results: Results,
  	Filters: Filters
  },
  created() {
  	let _appToken = sessionStorage.getItem('appToken'),
  		_expiry   = sessionStorage.getItem('expiry'),
  		_hasExpired = _expiry > Date.now();

  	if(_appToken && !_hasExpired) {
  		this.appToken = _appToken;
  		console.log('Session storage App Key used');
  	} else {
  		let expiry = new Date();
  		expiry.setMinutes(expiry.getMinutes() + 20); // 20 minutes

  		this.$http.get('http://pushkardk.com/searchebay/get-app-token.php')
  		.then(response => {
  			this.appToken = JSON.parse(response.body).access_token;
  			sessionStorage.setItem('appToken', this.appToken);
  			sessionStorage.setItem('expiry', expiry);
  			console.log('HTTP Response to get App Key made, Saved into session storage');
  		});
  	}
  },
  methods: {
  	searchItems(e) {
  		e.preventDefault();
  		if(this.searchTerm) {
  			this.$http.get(
  				'https://api.ebay.com/buy/browse/v1/item_summary/search',
  				{ 
  					params: { q: this.searchTerm, limit: this.limitResults },
  					headers: { 'Authorization': 'Bearer ' + this.appToken }
  				}
  			)
  			.then(response => {
  				console.log('Items received');
  				this.searchResults = [];
  				this.filteredResults = [];
  				response.body.itemSummaries.forEach(item => {
  					let itemData = this.getItemData(item);
  					this.searchResults.push(itemData);
  					this.filteredResults.push(itemData);
  				})
  			})
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

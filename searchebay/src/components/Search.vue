<template>
  <div class="search clearfix">
	<form v-on:submit="searchItems" class="search-form">
		<input type="text" v-model="searchTerm" placeholder="Search input..." class="search-input">
		<input type="submit" value="Search ebay" class="search-submit">
	</form>
	<Filters v-bind:searchResults="searchResults"></Filters>
	<Results v-bind:searchResults="searchResults"></Results>
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
    	limitResults: 10,
    	offset: 0,
    	appToken: ''
    }
  },
  components: {
  	Results: Results,
  	Filters: Filters
  },
  created() {
  	this.$http.get('http://pushkardk.com/searchebay/get-app-token.php')
  		.then(response => {
  			this.appToken = JSON.parse(response.body).access_token;
  			console.log(this.appToken);
  		});
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
  				console.log('received');
  				this.searchResults = [];
  				response.body.itemSummaries.forEach(item => {
  					let itemData = this.getItemData(item);
  					this.searchResults.push(itemData);
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
  	filterTheSearch(filteredList) {
  		console.log(filteredList);
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

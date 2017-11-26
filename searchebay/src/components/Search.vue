<template>
  <div class="search clearfix">
	<form v-on:submit="searchItems" class="search-form">
		<input type="text" v-model="searchTerm" placeholder="Search input..." class="search-input">
		<input type="submit" value="Search ebay" class="search-submit">
	</form>
	<!-- Filters receive the full response from API (searchResults) -->
	<Filters v-on:filterTheSearch="filterResults" :searchResults="searchResults" :filterQueries="filterQueries"></Filters>
	<!-- Results receive only filtered results (filteredResults) -->
	<Results v-on:updateOffset="pagination" :filteredResults="filteredResults" :limit="limit" :offset="offset" :total="total"></Results>
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
      limit: 50,
      offset: 0,
      total: undefined,
      cacheHash: undefined,
      filterQueries: {}
    }
  },
  components: {
    Results: Results,
    Filters: Filters
  },
  created() {
    this.showLoader(); // Add loader if it is taking time!
    var appToken = this.$store.dispatch('AppToken'); // Returns a promise
    appToken.then(() => {
      this.initialSearch();
    })
  },
  watch: {
    '$route' (to, from) {
      /* Whenever route does not change but only parameters change:
  		   Complete initial search: */
      var toQuery = to.query,
          fromQuery = from.query;
      /* Refresh page only if search terms don't match or offset changes (triggering new search) */
      if(toQuery.q != fromQuery.q || toQuery.o != fromQuery.o) {
        this.initialSearch();
      }
    }
  },
  methods: {
    initialSearch() {
      /* 2. Find out if params were set */
      let routeQuery = this.$route.query;
      /* 3. Update offset: */
      if(routeQuery.o) { this.offset = Number(routeQuery.o); }
      /* 4. Fetch data upon new search: */
      if(routeQuery.q) {
        this.searchTerm = routeQuery.q || this.searchTerm;
        // Make the call to API (or cache):
        this.fetchAndUseData();
      } else {
        this.hideLoader(); // Add loader if it is taking time!
      }
      /* 5. Update filter queries based on route: */
      if(routeQuery.p) { this.filterQueries.price = routeQuery.p; }
      if(routeQuery.s) { this.filterQueries.sellersList = routeQuery.s.split('|'); }
      if(routeQuery.c) { this.filterQueries.conditionsList = routeQuery.c.split('|'); }
    },
    searchItems(e) {
      e.preventDefault();
      if(this.searchTerm) {
        /* Fresh search: Clear all other filters: */
        let queryObj = { q: this.searchTerm };
        this.filterQueries = {}; // Reset all filters for a new search.
        this.$router.push({ name: 'Search', query: queryObj });
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
    filterResults(filteredList, nonDefaultPrice, sellersList, conditionsList) {
      /* Update filters (other than search) in route: */
      /* While watching for $route changes, do not refresh page if new search was not input */
      let queryObj = Object.assign({}, this.$route.query);

      this.filteredResults = filteredList;

      if(nonDefaultPrice) { 
        this.filterQueries.price = nonDefaultPrice;
        queryObj['p'] = nonDefaultPrice; 
      }
      
      if(sellersList) { 
        this.filterQueries.sellersList = sellersList;
        queryObj['s'] = sellersList.join('|'); 
      } else {
        delete queryObj['s'];
      }

      if(conditionsList) { 
        this.filterQueries.conditionsList = conditionsList;
        queryObj['c'] = conditionsList.join('|'); 
      } else {
        delete queryObj['c'];
      }

      this.$router.push({ name: 'Search', query: queryObj });
    },
    fetchAndUseData() {
      this.showLoader(); // Add loader if it is taking time!
      this.cacheHash = [
        'https://api.ebay.com/buy/browse/v1/item_summary/search?',
        'q=' + this.searchTerm,
        'limit=' + this.limit,
        'offset=' + this.offset
      ].join('');

      var cache = this.$store.getters.fetchCache;
      if(cache[this.cacheHash]) {
        this.update(cache[this.cacheHash]); // Send cached value as response data
      } else {
        this.$http.get(
          'https://api.ebay.com/buy/browse/v1/item_summary/search',
          {
            params: {
              q: this.searchTerm, limit: this.limit, offset: this.offset 
            },
            headers: { 'Authorization': 'Bearer ' + this.$store.getters.fetchAppToken }
          }
        ).then(this.update);
      }
    },
    /* The update inner function: */
    update(response) { // Response = new data OR cached data
      // Save response in cache if it doesn't already exist!
      this.$store.dispatch('addToCache', { cacheHash: this.cacheHash, response: response });
      // Remaining updation: 
      this.total = response.body.total;
      this.searchResults = [];
      this.filteredResults = [];
      if(response.body.itemSummaries) {
        response.body.itemSummaries.forEach(item => {
          let itemData = this.getItemData(item);
          this.searchResults.push(itemData);
          this.filteredResults.push(itemData);
        });
      } else {
        alert('No items were returned by this query!');
      }
      this.hideLoader();  // Remove loader once data has been retrieved!
    },
    pagination(offset) {
      let queryObj = Object.assign({}, this.$route.query);

      this.offset = offset; // update offset
      this.fetchAndUseData(); // Fetch new data from API (or cache)

      /* Update offset in route (after fetching the page successfully) */
      queryObj['o'] = offset;
      /* Price/Sellers/Conditions are only used for one offset - new data comes in when offset changes */
      this.filterQueries.price = 1000000000;
      this.filterQueries.sellersList = [];
      this.filterQueries.conditionsList = [];
      delete queryObj['s'];
      delete queryObj['c'];
      delete queryObj['p'];

      this.$router.push({ name: 'Search', query: queryObj });
    },
    showLoader() {
      let DOMloader = document.getElementsByClassName('loader');
      if(DOMloader[0]) {
        DOMloader[0].style.display = 'block';
      }
    },
    hideLoader() {
      let DOMloader = document.getElementsByClassName('loader');
      if(DOMloader[0]) {
        DOMloader[0].style.display = 'none';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/less/settings.less';

// Search specific variables:
@search-font-size: 18px;

.search {
  &-input {
    width: 80%;
    padding: 10px;
    height: 24px;
    vertical-align: middle;
    font-size: @search-font-size;
    color: @fg-color-dark-blue;
  }
  &-submit {
    height: 45px;
    width: 17%;
    vertical-align: middle;
    border: 0;
    color: @fg-color-white;
    font-size: 18px;
    background: @bg-color-blue;
    cursor: pointer;
  }
}
</style>

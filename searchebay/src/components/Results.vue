<template>
  <div class="results">
    <div class="results-applied-filter">
      <label class="applied-filter-item">
        <input v-on:click="sortByPrice" type="radio" name="applied-filter" value="1"> Price: Low to High</label>
      <label class="applied-filter-item">
        <input v-on:click="sortByPrice" type="radio" name="applied-filter" value="-1"> Price: High to Low
      </label>
      <label class="applied-filter-item">
        <input v-on:click="sortByScore" type="radio" name="applied-filter" value="1"> Score: Low to High
      </label>
      <label class="applied-filter-item">
        <input v-on:click="sortByScore" type="radio" name="applied-filter" value="-1"> Score: High to Low
      </label>
    </div>
    <div v-for="item in filteredResults" class="search-results">
      <div class="search-results-item">
        <div class="clearfix">
          <div class="search-results-item-img-wrpr">
            <img :src="item.image.imageUrl" alt="" class="search-results-item-img">
          </div>
          <div class="search-results-item-title">{{item.title}}</div>
          <div class="search-results-item-id">{{item.itemId}}</div>
          <div class="search-results-item-condition">{{item.condition}}</div>
        </div>
        <div class="clearfix">
          <div class="search-results-item-sellerprcnt">Score: {{item.seller.feedbackPercentage}}%</div>
          <div class="search-results-item-seller">{{item.seller.username}}</div>
        </div>
        <div class="clearfix">
          <span class="search-results-item-price">{{item.currentBidPrice.currency}} {{item.currentBidPrice.value}}</span>
          <a :href="item.itemWebUrl" target="_blank" class="search-results-item-buy">Buy</a>
          <span class="search-results-item-view">View Details</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: ['filteredResults'],
  data() {
    return {}
  },
  methods: {
    sortByPrice(e) {
      if(Number(e.target.value) === 1) {
        this.filteredResults.sort((a, b) => {
          return Number(a.currentBidPrice.value) - Number(b.currentBidPrice.value);
        });
      } else {
        this.filteredResults.sort((a, b) => {
          return Number(b.currentBidPrice.value) - Number(a.currentBidPrice.value);
        });
      }
    },
    sortByScore(e) {
      if(Number(e.target.value) === 1) {
        this.filteredResults.sort((a, b) => {
          return Number(a.seller.feedbackPercentage) - Number(b.seller.feedbackPercentage);
        });
      } else {
        this.filteredResults.sort((a, b) => {
          return Number(b.seller.feedbackPercentage) - Number(a.seller.feedbackPercentage);
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results {
  float: left;
  width: 78%;
}

.search-results {
  margin: 15px 0;
}
.search-results-item {
  padding: 5px;
  background: #E1F5FE;
  color: #263238;
  margin-bottom: 5px;
  border-radius: 3px;
}

.search-results-item-img-wrpr {
  float: left;
  width: 90px;
  height: 90px;
  margin-right: 15px;
  position: relative;
}

.search-results-item-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 15% auto;
  max-height: 70%;
  max-width: 70%;
}

.search-results-item-title {
  float: left;
  font-size: 18px;
  color: #34495e;
  width: 85%;
}

.search-results-item-id {
  margin-top: 5px;
  float: left;
  font-size: 11px;
  width: 85%;
}

.search-results-item-condition {
  float: left;
  margin-top: 5px;
  border-radius: 3px;
  padding: 3px;
  border: 1px solid #2980b9;
}

.search-results-item-seller {
  float: right;
  text-transform: capitalize;
  margin-left: 20px;
  padding: 3px;
  color: #2980b9;
  margin-bottom: 10px;
}

.search-results-item-sellerprcnt {
  float: right;
  text-transform: capitalize;
  margin-left: 20px;
  padding: 3px;
  color: #27ae60;
  margin-bottom: 10px;
}

.search-results-item-price {
  float: left;
  padding: 5px 10px;
  font-weight: bold;
  width: 140px;
}

.search-results-item-buy {
  float: left;
  vertical-align: middle;
  margin: 0 10px;
  padding: 5px 10px;
  background: #27ae60;
  color: #fff;
text-decoration: none;
  cursor: pointer;
}

.search-results-item-view {
  float: right;
  padding: 5px 10px;
  background: #f1c40f;
  cursor: pointer;
}

.search-results-none {
  padding: 40px 0;
  text-align: center;
  color: #444;
}

.results-applied-filter {
  margin-top: 15px;
}

.applied-filter-item {
  margin-right: 30px;
}
</style>

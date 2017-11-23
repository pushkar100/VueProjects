<template>
  <div class="results">
    <div v-if="filteredResults.length" class="results-applied-filter">
      <label class="results-applied-filter-item">
        <input v-on:click="sortByPrice" type="radio" name="applied-filter" value="1"> Price: Low to High</label>
      <label class="results-applied-filter-item">
        <input v-on:click="sortByPrice" type="radio" name="applied-filter" value="-1"> Price: High to Low
      </label>
      <label class="results-applied-filter-item">
        <input v-on:click="sortByScore" type="radio" name="applied-filter" value="1"> Score: Low to High
      </label>
      <label class="results-applied-filter-item">
        <input v-on:click="sortByScore" type="radio" name="applied-filter" value="-1"> Score: High to Low
      </label>
    </div>

    <div v-if="filteredResults.length === limit" class="clearfix paginate">
      <div v-on:click="prevOffset()" v-if="offset" class="filter-prev">&#10229; Prev</div>
      <div v-on:click="nextOffset()" v-if="offset != (total - offset)" class="filter-next">Next &#10230;</div>
      <div class="results-info">Showing {{offset}}-{{offset + limit}} out of {{total}} results</div>
    </div>

    <div v-for="item in filteredResults" :key="item.id" class="search-results">
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
          <div class="search-results-item-seller">{{item.seller.username}}</div>
          <div class="search-results-item-sellerprcnt">({{item.seller.feedbackPercentage}}%)</div>
        </div>
        <div class="clearfix">
          <span class="search-results-item-price">{{item.currentBidPrice.currency}} {{item.currentBidPrice.value}}</span>
          <a :href="item.itemWebUrl" target="_blank" class="search-results-item-buy">Buy</a>
          <span class="search-results-item-view">
            <router-link :to="{ name: 'Item', params: { id: item.itemId }}" class="route-link">View Details</router-link>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Results',
  props: ['filteredResults', 'offset', 'total', 'limit'],
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
    },
    nextOffset() {
      this.$emit('updateOffset', this.offset + this.limit);
    },
    prevOffset() {
      this.$emit('updateOffset', this.offset - this.limit);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/less/settings.less';

// Results specific variables:
@seller-percent-color      : #27ae60;
@view-details-bkgnd        : #f1c40f;

.results {
  float: left;
  width: 78%;
  
  &-info {
    text-align: center;
    font-size: 13px;
    padding-top: 5px;
    color: @fg-color-blue;
  }
  &-applied-filter {
    padding: 5px 10px;
    margin-top: 15px;
    border: 1px dotted @border-color-dark-blue;
    border-radius: @border-radius-s;

    &-item {
      margin-right: 30px;
    }
  }
}

.search {
  &-results {
    margin: 15px 0;

    &-none {
      padding: 40px 0;
      text-align: center;
      color: @fg-color-grey;
    }
    &-item {
      padding: 5px;
      margin-bottom: 5px;
      color: @fg-color-blue;
      border-radius: @border-radius-s;
      border: 1px dotted @border-color-dark-blue;

      &-img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 15% auto;
        max-height: 70%;
        max-width: 70%;

        &-wrpr {
          float: left;
          width: 90px;
          height: 90px;
          margin-right: 15px;
          position: relative;
        }
      }
      &-title {
        float: left;
        width: 85%;
        font-size: @font-size-l;
        color: @fg-color-dark-blue;
      }
      &-id {
        float: left;
        margin-top: 5px;
        width: 85%;
        font-size: @font-size-xs;
      }
      &-condition {
        float: left;
        padding: 3px;
        margin-top: 10px;
        border: 1px solid @border-color-blue;
      }
      &-seller {
        float: left;
        margin: 10px;
        text-transform: capitalize;
        color: @fg-color-blue;
        font-weight: @font-weight-bold;
      }
      &-sellerprcnt {
        float: left;
        margin: 10px;
        text-transform: capitalize;
        color: @seller-percent-color;
      }
      &-price {
        float: left;
        padding: 5px 10px;
        width: 140px;
        font-weight: @font-weight-bold;
      }
      &-buy {
        float: right;
        padding: 5px 10px;
        margin: 0 10px;
        vertical-align: middle;
        text-decoration: none;
        cursor: pointer;
        background: @bg-color-blue;
        color: @bg-color-white;
      }
      &-view {
        float: right;
        padding: 5px 10px;
        cursor: pointer;
        background: @view-details-bkgnd;
      }
    }
  }
}

.filter {
  &-prev,
  &-next {
    float: right;
    padding: 5px 7px;
    cursor: pointer;
    color: @fg-color-blue;
    border: 1px dashed @border-color-blue;
    border-radius: @border-radius-s;
  }
  &-prev {
    float: left;
  }
}

.paginate {
  margin: 10px 0;
}

.route-link {
  text-decoration: none;
  color: @fg-color-dark-blue;
}
</style>

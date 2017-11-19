<template>
  <div v-if="searchResults.length" class="filters">
    {{priceUrlParam}}
    <div class="filter-div price-filter">
      <h2 class="filter-hdr price-filter-hdr">Price Filter</h2>
      <div v-for="value in allPriceCaps">
        <input v-on:click="handlePriceChange" type="radio" name="priceFilter" :value="value" class="filter-item"> {{value === 1000000000 ? 'Any Value' : 'Below $' + value}}
      </div>
    </div>
    <div class="filter-div condition-filter">
      <h2 class="filter-hdr condition-filter-hdr">Condition</h2>
      <div v-for="condition in allConditions">
        <input v-on:click="handleConditionSelect" type="checkbox" :value="condition" class="filter-item">
        {{condition || 'Unknown'}}
      </div>
    </div>
    <div class="filter-div seller-filter">
      <h2 class="filter-hdr seller-filter-hdr">Sellers</h2>
      <div v-for="seller in allSellers">
        <input v-on:click="handleSellerSelect" type="checkbox" :value="seller" class="filter-item">
        {{seller}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: ['searchResults', 'priceUrlParam'],
  data() {
    return {
      allPriceCaps: [ 10, 20, 50, 100, 200, 500, 1000, 1000000000 ], // The prices on filter
      allSellers: [], // The sellers that appear in the filter
      allConditions: [],
      selected: {
        priceLow: 0,
        priceHigh: 1000000000,
        sellers: [],
        conditions: []
      }
    }
  },
  watch: {
    searchResults(val) {
      this.allSellers = [];
      this.allConditions = [];
      val.forEach(item => {
        if(!this.allSellers.includes(item.seller.username)) {
          this.allSellers.push(item.seller.username);
        }
        // Sort sellers alphabetically:
        this.allSellers.sort();

        if(!this.allConditions.includes(item.condition)) {
          this.allConditions.push(item.condition)
        }
      });
    }
  },
  methods: {
    handlePriceChange(e) {
      let filtered;
      this.selected.priceLow = 0;
      this.selected.priceHigh = e.target.value;
      this.curateList();
    },
    handleSellerSelect(e) {
      let filtered,
          sellerName = e.target.value;
      if(e.target.checked) {
        // Add item to selected sellers
        if(!this.selected.sellers.includes(sellerName)) {
          this.selected.sellers.push(sellerName);
          console.log(sellerName);
        }
      } else {
        // Remove item from selected sellers
        let index = this.selected.sellers.indexOf(sellerName);
        if(index !== -1) {
          this.selected.sellers.splice(index, 1);
        }
      }
      this.curateList();
    },
    handleConditionSelect(e) {
      let filtered,
          conditionName = e.target.value;
      if(e.target.checked) {
        // Add item to selected sellers
        if(!this.selected.conditions.includes(conditionName)) {
          this.selected.conditions.push(conditionName);
          console.log(conditionName);
        }
      } else {
        // Remove item from selected sellers
        let index = this.selected.conditions.indexOf(conditionName);
        if(index !== -1) {
          this.selected.conditions.splice(index, 1);
        }
      }
      this.curateList();
    },
    curateList() {
      var priceLow = this.selected.priceLow || 0,
          priceHigh = this.selected.priceHigh || 1000000000,
          priceFiltered = this.searchResults.filter(item => {
            return Number(item.currentBidPrice.value) >= priceLow && 
                   Number(item.currentBidPrice.value) < priceHigh;
          });

      var selectedSellers = this.selected.sellers.length ? this.selected.sellers : this.allSellers, // If no sellers are selected, choose the whole list
          sellersFiltered = priceFiltered.filter(item => {
            return selectedSellers.includes(item.seller.username);
          });

      var selectedConditions = this.selected.conditions.length ? this.selected.conditions : this.allConditions, // If no conditions are selected, choose the whole list
          conditionsFiltered = sellersFiltered.filter(item => {
            return selectedConditions.includes(item.condition);
          });

      this.$emit('filterTheSearch', conditionsFiltered);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filters {
  float: left;
  width: 20%;
  margin: 15px 0;
  margin-right: 16px;
}

.filter-div {
  min-height: 50px;
  max-height: 160px;
  overflow: scroll;
  padding: 5px;
  border-radius: 5px;
  background: #ecf0f1;
  margin-bottom: 10px;
}

.filter-hdr {
  color: #2980b9;
  font-weight: 600;
  padding: 5px 0;
}

.filter-item {
  margin-bottom: 10px;
}
</style>

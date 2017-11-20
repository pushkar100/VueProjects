<template>
  <div v-if="searchResults.length" class="filters">
    <div class="filter-div price-filter">
      <h2 class="filter-hdr price-filter-hdr">Price Filter</h2>
      <div v-for="value in allPriceCaps">
        <input v-model="selected.price" v-on:change="handlePriceChange" type="radio" name="priceFilter" :value="value" class="filter-item"> {{value === 1000000000 ? 'Any Value' : 'Below $' + value}}
      </div>
    </div>
    <div class="filter-div condition-filter">
      <h2 class="filter-hdr condition-filter-hdr">Condition</h2>
      <div v-for="condition in allConditions">
        <input v-model="selected.conditions" v-on:click="handleConditionSelect" type="checkbox" :value="condition" class="filter-item">
        {{condition || 'Unknown'}}
      </div>
    </div>
    <div class="filter-div seller-filter">
      <h2 class="filter-hdr seller-filter-hdr">Sellers</h2>
      <div v-for="seller in allSellers">
        <input v-model="selected.sellers" v-on:click="handleSellerSelect" type="checkbox" :value="seller" class="filter-item">
        {{seller}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: ['searchResults', 'filterQueries'],
  data() {
    return {
      allPriceCaps: [ 10, 20, 50, 100, 200, 500, 1000, 1000000000 ], // The prices on filter
      allSellers: [], // The sellers that appear in the filter
      allConditions: [],
      selected: {
        price: 1000000000,
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
      // Whenvever searchResults changes or whenever it is loaded,
      // curate the list once based on filterQueries (selected filters).
      // This will set the initial filtration at least:
      this.useFilterQueries();
      this.curateList();
    }
  },
  methods: {
    useFilterQueries() {
      this.selected.price = this.filterQueries.price || 1000000000;
      this.selected.sellers = this.filterQueries.sellersList || [];
      this.selected.conditions = this.filterQueries.conditionsList || [];
    },
    handlePriceChange(e) {
      let filtered;
      this.selected.price = e.target.value;
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
      console.log(this.searchResults.length);
      var price = this.selected.price || 1000000000,
          priceFiltered = this.searchResults.filter(item => {
            return Number(item.currentBidPrice.value) < price;
          });

      var selectedSellers = this.selected.sellers.length ? this.selected.sellers : this.allSellers, // If no sellers are selected, choose the whole list
          sellersFiltered = priceFiltered.filter(item => {
            return selectedSellers.includes(item.seller.username);
          });

      var selectedConditions = this.selected.conditions.length ? this.selected.conditions : this.allConditions, // If no conditions are selected, choose the whole list
          conditionsFiltered = sellersFiltered.filter(item => {
            return selectedConditions.includes(item.condition);
          });

      /* Emit filters selected and the filtered data back to parent: */
      var nonDefaultPrice, sellersList, conditionsList;
      if(selectedSellers.length !== this.allSellers.length) { sellersList = selectedSellers; }
      if(selectedConditions.length !== this.allConditions.length) { conditionsList = selectedConditions; }
      if(price !== 1000000000) { nonDefaultPrice = price }

      console.log(conditionsFiltered.length);
      this.$emit('filterTheSearch', conditionsFiltered, nonDefaultPrice, sellersList, conditionsList);
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
  max-height: 260px;
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

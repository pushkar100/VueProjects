<template>
  <div class="filters">
    <div class="price-filter">
      <h2 class="price-filter-hdr">Price Filter</h2>
      <div><input v-on:click="handlePriceChange" type="radio" name="priceFilter" value="10" class="price-filter-item"> Below $10</div>
      <div><input v-on:click="handlePriceChange" type="radio" name="priceFilter" value="50" class="price-filter-item"> Below $50</div>
      <div><input v-on:click="handlePriceChange" type="radio" name="priceFilter" value="100" class="price-filter-item"> Below $100</div>
      <div><input v-on:click="handlePriceChange" type="radio" name="priceFilter" value="200" class="price-filter-item"> Below $200</div>
      <div><input v-on:click="handlePriceChange" type="radio" name="priceFilter" value="500" class="price-filter-item"> Below $500</div>
      <div><input v-on:click="handlePriceChange" type="radio" name="priceFilter" value="1000" class="price-filter-item"> Below $1000</div>
      <div><input v-on:click="handlePriceChange" type="radio" name="priceFilter" value="1000000000" class="price-filter-item"> $1000+</div>
    </div>
    <div>a</div>
    <div>a</div>
    <div>a</div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: ['searchResults'],
  data() {
    return {
      price: 1000000000 // A big number initially
    }
  },
  methods: {
    handlePriceChange(e) {
      this.price = e.target.value;
      let filtered = this.searchResults.filter(item => {
        console.log(item.currentBidPrice.value, this.price, Number(item.currentBidPrice.value) < this.price);
        return Number(item.currentBidPrice.value) < this.price;
      });
      this.$emit('filterTheSearch', filtered);
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
}

.price-filter-hdr {
  color: #2980b9;
  font-weight: 600;
  padding: 5px 0;
}

.price-filter-item {
  margin-bottom: 10px;
}
</style>

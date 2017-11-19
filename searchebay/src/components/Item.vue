<template>
  <div v-if="itemData" class="item">
    <div class="item-id">ID: {{itemData.itemId}}</div>
    <div class="item-title">{{itemData.title}}</div>
    <div class="clearfix">
      <div class="float-item">{{itemData.condition}}</div>
      <div class="float-item">{{itemData.brand}}</div>
      <div class="float-item">
        <span>Seller: {{itemData.seller.username}} |</span>
        <span>Rating: {{itemData.seller.feedbackPercentage}}% | </span>
        <span>Score: {{itemData.seller.feedbackScore}}</span>
      </div>
    </div>
    <div class="clearfix">
      <div class="item-price">{{itemData.price.currency}} {{itemData.price.value}}</div>
      <a :href="itemData.buy" target="_blank" class="item-buy">Buy</a>
    </div>
    <div class="clearfix">
      <div class="image-wrapper">
        <img :src="itemData.image.imageUrl" alt="">
      </div>
      <div v-for="images in itemData.additionalImages" class="image-wrapper">
        <img :src="images.imageUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {
      appToken: '',
      itemData: undefined
    }
  },
  created() {
    let _appToken = sessionStorage.getItem('appToken'),
        _expiry   = new Date(sessionStorage.getItem('expiry')),
        _hasExpired = _expiry.getTime() < (new Date()).getTime();

    if(_appToken && !_hasExpired) {
      this.appToken = _appToken;
      console.log('Session storage App Key used');
      // Fetch item data:
      this.getItemData();
    } else {
      let expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 20); // 20 minutes

      this.$http.get('http://pushkardk.com/searchebay/get-app-token.php')
      .then(response => {
        this.appToken = JSON.parse(response.body).access_token;
        sessionStorage.setItem('appToken', this.appToken);
        sessionStorage.setItem('expiry', expiry);
        console.log('HTTP Response to get App Key made, Saved into session storage');
        // Fetch item data:
        this.getItemData();
      });
    }
  },
  methods: {
    getItemData() {
      this.$http.get(
        'https://api.ebay.com/buy/browse/v1/item/' + this.$route.params.id,
        { headers: { 'Authorization': 'Bearer ' + this.appToken }}
      ).then(response => {
        let item = response.body;
        this.itemData = {
          itemId: item.itemId,
          buy: item.itemWebUrl,
          image: item.image,
          title: item.title,
          brand: item.brand,
          condition: item.condition,
          seller: item.seller,
          price: item.price,
          additionalImages: item.additionalImages
        };
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-id {
  color: #777;
  font-size: 9px;
  text-align: right;
}

.item-title {
  color: #2980b9;
  font-size: 24px;
  margin-bottom: 20px;
}

.float-item {
  float: left;
  margin-right: 40px;
  font-size: 13px;
  background-color: #34495e;
  color: #fff;
  padding: 3px 10px;
  border-radius: 5px;
}

.item-price {
  float: left;
  font-size: 24px;
  margin-top: 20px;
  color: #27ae60;
}

.item-buy {
  float: left;
  margin-top: 20px;
  font-size: 20px;
  margin-left: 20px;
  padding: 3px 5px;
  border-radius: 3px;
  background: #2ecc71;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
}

.image-wrapper {
  float: left;
  width: 360px;
  height: 360px;
  position: relative;
  margin: 10px;
  border: 1px solid #ccc;
}

.image-wrapper img {
  position: absolute;
  top: -100%;
  left: -100%;
  right: -100%;
  bottom: -100%;
  max-width: 90%;
  max-height: 90%;
  margin: auto;
}
</style>

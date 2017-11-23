<template>
  <div v-if="itemData" class="item">
    <div class="item-id">ID: {{itemData.itemId}}</div>
    <div class="item-title">{{itemData.title}}</div>
    <div class="clearfix">
      <div class="item-float">{{itemData.condition}}</div>
      <div class="item-float">{{itemData.brand}}</div>
      <div class="item-float">
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
      <div v-for="images in itemData.additionalImages" :key="images.id" class="image-wrapper">
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
<style lang="less" scoped>
@import '../assets/less/settings.less';

// Item specific variables:
@item-id-color      : #777777;
@float-item-bkgnd   : #34495e;
@item-buy-color     : #27ae60;

.item {
  &-id {
    font-size: 9px;
    text-align: right;
    color: @item-id-color;
  }
  &-title {
    margin-bottom: 20px;
    color: @fg-color-blue;
    font-size: @font-size-xl;
  }
  &-float {
    float: left;
    padding: 3px 10px;
    margin-right: 40px;
    color: @fg-color-white;
    font-size: @font-size-s;
    background-color: @float-item-bkgnd;
    border-radius: @border-radius;
  }
  &-price {
    float: left;
    margin-top: 20px;
    font-size: @font-size-xl;
    color: @item-buy-color;
  }
  &-buy {
    float: left;
    padding: 3px 5px;
    margin-top: 16px;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    color: @fg-color-white;
    font-size: @font-size-xl;
    background: @item-buy-color;
    border-radius: @border-radius-s;
  }
}

.image {
  &-wrapper {
    float: left;
    margin: 10px;
    width: 360px;
    height: 360px;
    position: relative;
    border: 1px solid @border-color;

    img {
      position: absolute;
      top: -100%;
      left: -100%;
      right: -100%;
      bottom: -100%;
      max-width: 90%;
      max-height: 90%;
      margin: auto;
    }
  }
}
</style>

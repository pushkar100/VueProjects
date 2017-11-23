<template>
  <div id="app">
    <div class="loader">Loading...</div>
    <!-- Navigation -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import './assets/less/settings.less';

body {
  background: @bg-color-grey;
  color: @fg-color;
  font-size: @font-size;
  line-height: @line-height;
  font-weight: @font-weight;
}

#app {
  width: 1158px;
  padding: 15px;
  margin: 50px auto 10px auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  font-family: system-ui;
  border: 1px solid @border-color;
  background: @bg-color-white;
  border-radius: @border-radius;
}

.main-header {
  width: 1190px;
  font-size: 30px;
  margin: 10px auto;
}

.logo {
  &-one {
    color: @fg-color-blue;
  }
  &-two {
    color: @fg-color-dark-blue;
  }
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  line-height: 650px;
  display: none;
  background: @bg-color-overlay;
  color: @fg-color-blue;
}
</style>

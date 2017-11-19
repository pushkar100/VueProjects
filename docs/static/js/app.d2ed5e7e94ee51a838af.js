webpackJsonp([1],{"+qfu":function(e,t){},0:function(e,t){},"42Ep":function(e,t){},"8hld":function(e,t){},"8vT6":function(e,t){},NHnr:function(e,t,s){"use strict";function i(e){s("V7Jo")}function a(e){s("8vT6")}function r(e){s("42Ep")}function l(e){s("+qfu")}function n(e){s("8hld")}Object.defineProperty(t,"__esModule",{value:!0});var c=s("7+uW"),o={name:"app"},u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"loader"},[e._v("Loading...")]),e._v(" "),s("router-view")],1)},d=[],h={render:u,staticRenderFns:d},m=h,p=s("VU/8"),f=i,v=p(o,m,!1,f,null,null),_=v.exports,g=s("/ocq"),C={name:"Results",props:["filteredResults","offset","total","limit"],data:function(){return{}},methods:{sortByPrice:function(e){1===Number(e.target.value)?this.filteredResults.sort(function(e,t){return Number(e.currentBidPrice.value)-Number(t.currentBidPrice.value)}):this.filteredResults.sort(function(e,t){return Number(t.currentBidPrice.value)-Number(e.currentBidPrice.value)})},sortByScore:function(e){1===Number(e.target.value)?this.filteredResults.sort(function(e,t){return Number(e.seller.feedbackPercentage)-Number(t.seller.feedbackPercentage)}):this.filteredResults.sort(function(e,t){return Number(t.seller.feedbackPercentage)-Number(e.seller.feedbackPercentage)})},nextOffset:function(){this.$emit("updateOffset",this.offset+this.limit)},prevOffset:function(){this.$emit("updateOffset",this.offset-this.limit)}}},b=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"results"},[e.filteredResults.length?s("div",{staticClass:"results-applied-filter"},[s("label",{staticClass:"applied-filter-item"},[s("input",{attrs:{type:"radio",name:"applied-filter",value:"1"},on:{click:e.sortByPrice}}),e._v(" Price: Low to High")]),e._v(" "),s("label",{staticClass:"applied-filter-item"},[s("input",{attrs:{type:"radio",name:"applied-filter",value:"-1"},on:{click:e.sortByPrice}}),e._v(" Price: High to Low\n    ")]),e._v(" "),s("label",{staticClass:"applied-filter-item"},[s("input",{attrs:{type:"radio",name:"applied-filter",value:"1"},on:{click:e.sortByScore}}),e._v(" Score: Low to High\n    ")]),e._v(" "),s("label",{staticClass:"applied-filter-item"},[s("input",{attrs:{type:"radio",name:"applied-filter",value:"-1"},on:{click:e.sortByScore}}),e._v(" Score: High to Low\n    ")])]):e._e(),e._v(" "),e.filteredResults.length===e.limit?s("div",{staticClass:"clearfix paginate"},[e.offset?s("div",{staticClass:"filter-prev",on:{click:function(t){e.prevOffset()}}},[e._v("⟵ Prev")]):e._e(),e._v(" "),e.offset!=e.total-e.offset?s("div",{staticClass:"filter-next",on:{click:function(t){e.nextOffset()}}},[e._v("Next ⟶")]):e._e(),e._v(" "),s("div",{staticClass:"results-info"},[e._v("Showing "+e._s(e.offset)+"-"+e._s(e.offset+e.limit)+" out of "+e._s(e.total)+" results")])]):e._e(),e._v(" "),e._l(e.filteredResults,function(t){return s("div",{staticClass:"search-results"},[s("div",{staticClass:"search-results-item"},[s("div",{staticClass:"clearfix"},[s("div",{staticClass:"search-results-item-img-wrpr"},[s("img",{staticClass:"search-results-item-img",attrs:{src:t.image.imageUrl,alt:""}})]),e._v(" "),s("div",{staticClass:"search-results-item-title"},[e._v(e._s(t.title))]),e._v(" "),s("div",{staticClass:"search-results-item-id"},[e._v(e._s(t.itemId))]),e._v(" "),s("div",{staticClass:"search-results-item-condition"},[e._v(e._s(t.condition))])]),e._v(" "),s("div",{staticClass:"clearfix"},[s("div",{staticClass:"search-results-item-sellerprcnt"},[e._v("Score: "+e._s(t.seller.feedbackPercentage)+"%")]),e._v(" "),s("div",{staticClass:"search-results-item-seller"},[e._v(e._s(t.seller.username))])]),e._v(" "),s("div",{staticClass:"clearfix"},[s("span",{staticClass:"search-results-item-price"},[e._v(e._s(t.currentBidPrice.currency)+" "+e._s(t.currentBidPrice.value))]),e._v(" "),s("a",{staticClass:"search-results-item-buy",attrs:{href:t.itemWebUrl,target:"_blank"}},[e._v("Buy")]),e._v(" "),s("span",{staticClass:"search-results-item-view"},[s("router-link",{staticClass:"route-link",attrs:{to:{name:"Item",params:{id:t.itemId}}}},[e._v("View Details")])],1)])])])})],2)},y=[],S={render:b,staticRenderFns:y},k=S,P=s("VU/8"),R=a,T=P(C,k,!1,R,"data-v-71d3f248",null),w=T.exports,D={name:"Filters",props:["searchResults","priceUrlParam"],data:function(){return{allPriceCaps:[10,20,50,100,200,500,1e3,1e9],allSellers:[],allConditions:[],selected:{priceLow:0,priceHigh:1e9,sellers:[],conditions:[]}}},watch:{searchResults:function(e){var t=this;this.allSellers=[],this.allConditions=[],e.forEach(function(e){t.allSellers.includes(e.seller.username)||t.allSellers.push(e.seller.username),t.allSellers.sort(),t.allConditions.includes(e.condition)||t.allConditions.push(e.condition)})}},methods:{handlePriceChange:function(e){this.selected.priceLow=0,this.selected.priceHigh=e.target.value,this.curateList()},handleSellerSelect:function(e){var t=e.target.value;if(e.target.checked)this.selected.sellers.includes(t)||(this.selected.sellers.push(t),console.log(t));else{var s=this.selected.sellers.indexOf(t);-1!==s&&this.selected.sellers.splice(s,1)}this.curateList()},handleConditionSelect:function(e){var t=e.target.value;if(e.target.checked)this.selected.conditions.includes(t)||(this.selected.conditions.push(t),console.log(t));else{var s=this.selected.conditions.indexOf(t);-1!==s&&this.selected.conditions.splice(s,1)}this.curateList()},curateList:function(){var e=this.selected.priceLow||0,t=this.selected.priceHigh||1e9,s=this.searchResults.filter(function(s){return Number(s.currentBidPrice.value)>=e&&Number(s.currentBidPrice.value)<t}),i=this.selected.sellers.length?this.selected.sellers:this.allSellers,a=s.filter(function(e){return i.includes(e.seller.username)}),r=this.selected.conditions.length?this.selected.conditions:this.allConditions,l=a.filter(function(e){return r.includes(e.condition)});this.$emit("filterTheSearch",l)}}},I=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.searchResults.length?s("div",{staticClass:"filters"},[e._v("\n  "+e._s(e.priceUrlParam)+"\n  "),s("div",{staticClass:"filter-div price-filter"},[s("h2",{staticClass:"filter-hdr price-filter-hdr"},[e._v("Price Filter")]),e._v(" "),e._l(e.allPriceCaps,function(t){return s("div",[s("input",{staticClass:"filter-item",attrs:{type:"radio",name:"priceFilter"},domProps:{value:t},on:{click:e.handlePriceChange}}),e._v(" "+e._s(1e9===t?"Any Value":"Below $"+t)+"\n    ")])})],2),e._v(" "),s("div",{staticClass:"filter-div condition-filter"},[s("h2",{staticClass:"filter-hdr condition-filter-hdr"},[e._v("Condition")]),e._v(" "),e._l(e.allConditions,function(t){return s("div",[s("input",{staticClass:"filter-item",attrs:{type:"checkbox"},domProps:{value:t},on:{click:e.handleConditionSelect}}),e._v("\n      "+e._s(t||"Unknown")+"\n    ")])})],2),e._v(" "),s("div",{staticClass:"filter-div seller-filter"},[s("h2",{staticClass:"filter-hdr seller-filter-hdr"},[e._v("Sellers")]),e._v(" "),e._l(e.allSellers,function(t){return s("div",[s("input",{staticClass:"filter-item",attrs:{type:"checkbox"},domProps:{value:t},on:{click:e.handleSellerSelect}}),e._v("\n      "+e._s(t)+"\n    ")])})],2)]):e._e()},x=[],U={render:I,staticRenderFns:x},B=U,N=s("VU/8"),L=r,$=N(D,B,!1,L,"data-v-2a80b590",null),q=$.exports,H={name:"Search",data:function(){return{searchTerm:"",searchResults:[],filteredResults:[],appToken:"",limit:50,offset:0,total:void 0,priceUrlParam:void 0,cachedRequests:{},cacheHash:void 0,path:"/"}},components:{Results:w,Filters:q},created:function(){var e=this;this.showLoader();var t=sessionStorage.getItem("appToken"),s=new Date(sessionStorage.getItem("expiry")),i=s.getTime()<(new Date).getTime();if(t&&!i)this.appToken=t,console.log("Session storage App Key used"),this.initialSearch();else{var a=new Date;a.setMinutes(a.getMinutes()+20),this.$http.get("http://pushkardk.com/searchebay/get-app-token.php").then(function(t){e.appToken=JSON.parse(t.body).access_token,sessionStorage.setItem("appToken",e.appToken),sessionStorage.setItem("expiry",a),console.log("HTTP Response to get App Key made, Saved into session storage with expiry also being saved"),e.initialSearch()})}},watch:{$route:function(e,t){e.params.q!=e.params.from&&this.initialSearch()}},methods:{initialSearch:function(){var e=this.$route.params;this.path=this.$route.path,e.q?(console.log("Initial search!"),this.searchTerm=e.q||this.searchTerm,this.priceUrlParam=Number(e.price)||this.priceUrlParam,this.fetchAndUseData()):(console.log("No initial search done!"),this.hideLoader())},searchItems:function(e){e.preventDefault(),this.searchTerm?this.$router.push({name:"SearchWithParams",params:{q:this.searchTerm,offset:this.offset,price:this.priceUrlParam||1e9,condition:"none",sellers:"none"}}):alert("Enter a search term")},getItemData:function(e){return{itemId:e.itemId,title:e.title,image:e.image,condition:e.condition,seller:e.seller,currentBidPrice:e.currentBidPrice,itemWebUrl:e.itemWebUrl}},filterResults:function(e){this.filteredResults=e},fetchAndUseData:function(){this.showLoader(),this.cacheHash=["https://api.ebay.com/buy/browse/v1/item_summary/search?","q="+this.searchTerm,"limit="+this.limit,"offset="+this.offset].join(""),this.cachedRequests[this.cacheHash]?(console.log("Data from cache!"),this.update(this.cachedRequests[this.cacheHash])):this.$http.get("https://api.ebay.com/buy/browse/v1/item_summary/search",{params:{q:this.searchTerm,limit:this.limit,offset:this.offset},headers:{Authorization:"Bearer "+this.appToken}}).then(this.update)},update:function(e){var t=this;this.cachedRequests[this.cacheHash]=this.cachedRequests[this.cacheHash]||e,this.total=e.body.total,this.searchResults=[],this.filteredResults=[],e.body.itemSummaries?e.body.itemSummaries.forEach(function(e){var s=t.getItemData(e);t.searchResults.push(s),t.filteredResults.push(s)}):alert("No items were returned by this query!"),this.hideLoader()},pagination:function(e){this.offset=e,this.fetchAndUseData()},showLoader:function(){var e=document.getElementsByClassName("loader");e[0]&&(e[0].style.display="block")},hideLoader:function(){var e=document.getElementsByClassName("loader");e[0]&&(e[0].style.display="none")}}},O=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"search clearfix"},[s("form",{staticClass:"search-form",on:{submit:e.searchItems}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchTerm,expression:"searchTerm"}],staticClass:"search-input",attrs:{type:"text",placeholder:"Search input..."},domProps:{value:e.searchTerm},on:{input:function(t){t.target.composing||(e.searchTerm=t.target.value)}}}),e._v(" "),s("input",{staticClass:"search-submit",attrs:{type:"submit",value:"Search ebay"}})]),e._v(" "),s("Filters",{attrs:{searchResults:e.searchResults,priceCheck:e.priceUrlParam},on:{filterTheSearch:e.filterResults}}),e._v(" "),s("Results",{attrs:{filteredResults:e.filteredResults,limit:e.limit,offset:e.offset,total:e.total,priceUrlParam:e.priceUrlParam},on:{updateOffset:e.pagination}})],1)},A=[],E={render:O,staticRenderFns:A},F=E,V=s("VU/8"),W=l,J=V(H,F,!1,W,"data-v-438ea1f5",null),M=J.exports,K={name:"Item",data:function(){return{appToken:"",itemData:void 0}},created:function(){var e=this,t=sessionStorage.getItem("appToken"),s=new Date(sessionStorage.getItem("expiry")),i=s.getTime()<(new Date).getTime();if(t&&!i)this.appToken=t,console.log("Session storage App Key used"),this.getItemData();else{var a=new Date;a.setMinutes(a.getMinutes()+20),this.$http.get("http://pushkardk.com/searchebay/get-app-token.php").then(function(t){e.appToken=JSON.parse(t.body).access_token,sessionStorage.setItem("appToken",e.appToken),sessionStorage.setItem("expiry",a),console.log("HTTP Response to get App Key made, Saved into session storage"),e.getItemData()})}},methods:{getItemData:function(){var e=this;this.$http.get("https://api.ebay.com/buy/browse/v1/item/"+this.$route.params.id,{headers:{Authorization:"Bearer "+this.appToken}}).then(function(t){var s=t.body;e.itemData={itemId:s.itemId,buy:s.itemWebUrl,image:s.image,title:s.title,brand:s.brand,condition:s.condition,seller:s.seller,price:s.price,additionalImages:s.additionalImages}})}}},j=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.itemData?s("div",{staticClass:"item"},[s("div",{staticClass:"item-id"},[e._v("ID: "+e._s(e.itemData.itemId))]),e._v(" "),s("div",{staticClass:"item-title"},[e._v(e._s(e.itemData.title))]),e._v(" "),s("div",{staticClass:"clearfix"},[s("div",{staticClass:"float-item"},[e._v(e._s(e.itemData.condition))]),e._v(" "),s("div",{staticClass:"float-item"},[e._v(e._s(e.itemData.brand))]),e._v(" "),s("div",{staticClass:"float-item"},[s("span",[e._v("Seller: "+e._s(e.itemData.seller.username)+" |")]),e._v(" "),s("span",[e._v("Rating: "+e._s(e.itemData.seller.feedbackPercentage)+"% | ")]),e._v(" "),s("span",[e._v("Score: "+e._s(e.itemData.seller.feedbackScore))])])]),e._v(" "),s("div",{staticClass:"clearfix"},[s("div",{staticClass:"item-price"},[e._v(e._s(e.itemData.price.currency)+" "+e._s(e.itemData.price.value))]),e._v(" "),s("a",{staticClass:"item-buy",attrs:{href:e.itemData.buy,target:"_blank"}},[e._v("Buy")])]),e._v(" "),s("div",{staticClass:"clearfix"},[s("div",{staticClass:"image-wrapper"},[s("img",{attrs:{src:e.itemData.image.imageUrl,alt:""}})]),e._v(" "),e._l(e.itemData.additionalImages,function(e){return s("div",{staticClass:"image-wrapper"},[s("img",{attrs:{src:e.imageUrl,alt:""}})])})],2)]):e._e()},z=[],G={render:j,staticRenderFns:z},Q=G,X=s("VU/8"),Y=n,Z=X(K,Q,!1,Y,"data-v-4d2284c4",null),ee=Z.exports;c.a.use(g.a);var te=new g.a({routes:[{path:"/",name:"Search",component:M},{path:"/item/:id",name:"Item",component:ee,props:!0},{path:"/:q/:price/:condition/:sellers",name:"SearchWithParams",component:M}]}),se=s("ORbq");c.a.use(se.a),c.a.config.productionTip=!1,new c.a({el:"#app",router:te,template:"<App/>",components:{App:_}})},V7Jo:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.d2ed5e7e94ee51a838af.js.map
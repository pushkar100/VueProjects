# VueProjects

A repository that holds all Vue JS projects. Currently listed projects:

1. [Search Ebay](#search-ebay)

## Search Ebay

> Search Ebay is a web app that interacts with the official Ebay API. It enables us to search for products on ebay in real-time and has a rich filter system which allows us to filter products based on price, seller(s) and condition(s) of the item. We can also sort through the items based on price and seller score (applied filters). After viewing a product's details, one can make the actual purchase on ebay's website by clicking the buy button. 

### Usage

[![search-ebay-gif-full-800.gif](https://s1.gifyu.com/images/search-ebay-gif-full-800.gif)](https://gifyu.com/image/pNHt)

- The app contains a search bar to search for any product or brand that has been listed on ebay.
- For each search, a list of products (response) is shown below the search bar, to the right.
- An applied filters section rests on top of the products. We may choose to order the results based on either the current bidding price or seller score (high-low & low-high).
- Each search yields a limited set of products and in order to fetch more, we can use pagination (next/prev) option. This will fetch more matching products from Ebay and display them.
- On the left, a filter section is available to filter each set of products based on price or seller(s) or condition(s) of the items.
- Finally, to view a product, we can click on the "View details" of a particular product or if we wish to go to ebay and bid for it, we can click on "buy".

View the [demo](http://pushkardk.com/searchebay/).

### Components

There are 4 main Vue components that are built for use in the app:

1. `Search`: Enables us to search for a product on ebay and contains the logic for fetching data from Ebay. It uses `vue-resource` to make the HTTP requests.
2. `Results`: A child component of `Search` which holds the list of products. Pagination is available with the "next" and "prev" buttons. It also contains applied filters used to order the products.
3. `Filters`: Also a child component of `Search` and it holds three filters: *Price*, *Sellers* and *Conditions*. Price is a single choice filter whereas sellers and conditions are multiple value filters.
4. `Item`: A separate component that shows the details (including additional images) of a particular product.

### Routes and Queries

The route is updated with a `q` (query) parameter once a search is performed. Whenever we change the filters, the query string also changes. For example:

1. `p` query parameter for the price filter.
2. `s` query parameter for sellers.
3. `c` query parameter for conditions.

Viewing more products using pagination updates the offset from which we list the products. This is reflected in the `o` query parameter.

We can return to a particular filtered list by revisiting the route for a search and it also improves SEO for the app. An example query string would be:

```?q=m&o=150&c=New&s=aryl1994%7Canglestore```

Visiting the above would fetch results for search term `m` from an offset of `150` and apply the following filters: Item condition must be `New` and show products only from sellers: `aryl1994` and `anglestore`.

While using the app, fresh data is not requested from the Ebay API unless the search term or offset changes (which clears the filters for the next set that is loaded).  And, any new request's response data gets cached until the app is restarted (page refresh).

### Authors

- **Pushkar DK**  [@pushkar100](https://github.com/pushkar100)

### Link

A *live demo* of the app can be viewed [here](http://pushkardk.com/searchebay/).

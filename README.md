# VueProjects

A repository that holds all vue projects.

Currently Listed Vue Projects:
1. [Search Ebay](#search-ebay)

# Search Ebay

> Search Ebay is an app built on the client-side framework VueJS 2 that interacts with the official ebay API. It enables us to search for products listed on ebay in real-time. The app features a rich filter system which enables us to filter products based on price, sellers and condition of the item. On top of it all, we can also order and sort through the items based on price and seller score (applied filters). After viewing a product's details, one can make the actual purchase on ebay's website by clicking the buy button. 

## Usage

- The app contains a search bar. We can use it to search for any product or brand that is listed on ebay.
- Once you initiate a search, a list of products (response) is shown below the search bar (to the right).
- Seen on top of the products is the applied filters section. We may choose to order the results based on either product bid price or seller score (high-low & low-high).
- Each search yields a limited set of products. In order to fetch more matching products, use the pagination (next/prev) option just above the products. This will hit the API for more matching items to display them.
- On the left, a filter section is available to filter each set of products based on price or seller(s) or condition(s) of the items.
- Finally, to view a product, we can click on the "View details" of a particular product or if we wish to go to ebay and bid for it, we can click on "buy".

[![search-ebay-gif-full-800.gif](https://s1.gifyu.com/images/search-ebay-gif-full-800.gif)](https://gifyu.com/image/pNHt)

View the [demo](http://pushkardk.com/searchebay/).

## Components

There are 4 main Vue components that are built for use in the app:

1. `Search`: The component that enables us to search for a product on ebay. Also, it contains most of the logic for fetching the response from the Ebay API. It uses `vue-resource` to make the HTTP requests.
2. `Results`: A child component of Search. It holds the products returned in the response. Pagination is available with the "next" and "prev" buttons. It also contains applied filters used to order the products.
3. `Filters`: Also a child component of search. It holds the three filters: Price, sellers and conditions. Price is a single choice filter whereas sellers and conditions are multiple value filters.
4. `Item`: A separate component that shows the details of a particular product. Holds more information for an item than what is shown for it in the results section.

## Routes and Queries

The route is updated with a `q` (query) parameter once a search is performed.

Whenever we change the filters, the query string changes. For example:

1. On price select: `p` query parameter is added to the route.
2. On seller(s) select: `s` query parameter is added to the route.
3. On condition(s) select: `c` query parameter is added to the route.

Viewing more products using pagination updates the offset from which to list the products for a search term. This is reflected in the `o` query parameter.

Therefore, we can return to a particular filtered list by revisiting the route for that search and it also improves SEO for the app. An example query string would be:

```?q=m&o=150&c=New&s=aryl1994%7Canglestore```

Visiting the above would fetch results for search term `m` from an offset of `150` and also apply the following filters: Item condition is `New` and from sellers: `aryl1994` or `anglestore`.

While using the app, new data is not requested from the Ebay API unless the search term or offset changes (which clears the filters for the next set that is loaded).  And, any new request's response gets cached until the app is restarted (page refresh).

## Authors

- **Pushkar DK**  [@pushkar100](https://github.com/pushkar100)
## Link

A *live demo* of the app can be viewed [here](http://pushkardk.com/searchebay/).

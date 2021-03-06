import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';
import fetch from 'node-fetch';

const BASE_URL = 'https://api.mercadolibre.com';

function getJSONFromRelativeURL(relativeURL) {
  console.log( `${BASE_URL}${relativeURL}`);
  return fetch(`${BASE_URL}${relativeURL}`)
    .then(res => res.json());
}

function getSearch(query) {
  return getJSONFromRelativeURL(`/sites/MLA/search?q=${query}&limit=4`)
    .then(json => json);
}

async function getProduct(id) {
  let product = await getProductByURL(`/items/${id}/`);
  const category = await getProductByURL(`/categories/${product.category_id}/`);
  const description = await getProductByURL(`/items/${id}/description`);

  product.description = description.text;
  product.categories = category.path_from_root;

  return product;

}

function getProductByURL(relativeURL) {
  return getJSONFromRelativeURL(relativeURL)
    .then(json => json);
}

const {
  nodeField,
  nodeInterface,
} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId);
    if (type === 'Search') {
      return getSearch(id);
    } else if (type === 'Product') {
      return getProduct(id);
    }

    return null;
  },
  (obj) => {
    if (obj.hasOwnProperty('seller_id')) {
      return SearchType;
    } else if (obj.hasOwnProperty('result')) {
      return ProductType;
    }

    return null;
  }
);

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  }),
});

const PriceType = new GraphQLObjectType({
  name: 'Price',
  fields: () => ({
    currency: {
      type: GraphQLString,
    },
    amount: {
      type: GraphQLInt,
    },
    decimals: {
      type: GraphQLInt,
    },
  }),
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: globalIdField('Product'),
    productId: {
      type: GraphQLString,
      resolve: obj => obj.id,
    },
    title: {
      type: GraphQLString,
      resolve: obj => obj.title,
    },
    description: {
      type: GraphQLString,
      resolve: obj => obj.description,
    },
    price: {
      type: PriceType,
      resolve: (obj, args) => ({
        currency: obj.currency_id,
        amount: obj.price,
        decimals: 0,
      }),
    },
    thumbnail: {
      type: GraphQLString,
      resolve: obj => obj.thumbnail,
    },
    picture: {
      type: GraphQLString,
      resolve: obj => obj.pictures && obj.pictures[0].url,
    },
    condition: {
      type: GraphQLString,
      resolve: obj => obj.condition,
    },
    shipping: {
      type: GraphQLBoolean,
      resolve: obj => obj.shipping.free_shipping,
    },
    city: {
      type: GraphQLString,
      resolve: obj => obj.seller_address.city && obj.seller_address.city.name,
    },
    sold: {
      type: GraphQLInt,
      resolve: obj => obj.sold_quantity,
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: obj => obj.categories,
    },
  }),
  interfaces: [nodeInterface],
});

const SearchType = new GraphQLObjectType({
  name: 'Search',
  fields: {
    id: globalIdField('Search'),
    query: {
      type: GraphQLString,
      resolve: obj => obj.query,
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: obj => obj.filters.length > 0 ? obj.filters[0].values[0].path_from_root : [],
    },
    items: {
      type: new GraphQLList(ProductType),
      resolve: (obj) => obj.results,
    },
  },
  interfaces: [nodeInterface],
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    search: {
      type: SearchType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (root, args) => getSearch(args.id),
    },
    node: nodeField,
    product: {
      type: ProductType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (root, args) => getProduct(args.id),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});

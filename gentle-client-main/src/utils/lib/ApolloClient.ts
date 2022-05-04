import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  ApolloError,
} from "@apollo/client";

import {  User, UserComment } from "../../generated/graphql";
import JwtManager from "../other/JwtManager";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const token = JwtManager.getToken();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          getProducts: {
            keyArgs: false,
            merge(existing, incoming) {
              return incoming.products;
            },
          },
          getProduct: {
            keyArgs: false,
            merge(existing, incoming) {
          
              return incoming.product;
            },
          },
          getProductsByKind: {
            keyArgs: false,
            merge(existing, incoming) {
          
              return incoming.products;
            },
          },
          getBrandWithProducts: {
            keyArgs: false,
            merge(existing, incoming) {
              console.log(incoming.brandWithProducts)
              return incoming.brandWithProducts;
            },
          },
          getPaginationUsers: {
            keyArgs: false,
            merge(existing, incoming) {
              let paginationsItem: User[] = [];

              if (existing && existing.users) {
                paginationsItem = paginationsItem.concat(existing.users);
              }
             

              if (incoming && incoming.users) {
                paginationsItem = paginationsItem.concat(incoming.users);
              }
          
              return { ...incoming, users:paginationsItem };
            },
          },
          getComments:{
            keyArgs: false,
            merge(existing, incoming) {
              let paginationItems: UserComment[] = [];

              if (existing && existing.comments) {
                paginationItems = paginationItems.concat(existing.comments);
              }
             

              if (incoming && incoming.comments) {
                paginationItems = paginationItems.concat(incoming.comments);
              }
          
              return { ...incoming, comments:paginationItems };
            },
          }
          
        },
      },
    },
  }),

  link: concat(authMiddleware, httpLink),
  
});

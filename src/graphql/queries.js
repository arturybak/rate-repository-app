import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repos($order: AllRepositoriesOrderBy, $dir: OrderDirection, $search: String, $first: Int, $after: String) { 
  repositories (orderBy: $order, orderDirection: $dir, searchKeyword: $search, first: $first, after: $after){
        edges {
          node {
            id,
            language,
            fullName,
            ratingAverage,
            reviewCount,
            stargazersCount,
            forksCount,
            ownerAvatarUrl,
            description,
            url
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }  
    }
}
`;

export const GET_REPOSITORY = gql`
  query repo($id: ID!, $first: Int, $after: String){
    repository(id: $id) {
            id,
            language,
            fullName,
            ratingAverage,
            reviewCount,
            stargazersCount,
            forksCount,
            ownerAvatarUrl,
            description,
            url,
            reviews (first: $first, after: $after) {
              totalCount
              edges {
                node {
                  id
                  text
                  rating
                  createdAt
                  repository {
                    id
                  }
                  user {
                    id
                    username
                  }
                }
                cursor
              }
              pageInfo {
                endCursor
                startCursor
                hasNextPage
              }  
      
              }
            }
    }
  
`;
export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id,
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
            }
            user {
              id
              username
            }
          }
          
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;



// other queries...

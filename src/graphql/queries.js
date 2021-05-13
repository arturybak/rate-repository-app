import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
          }
        }
    }
}
`;

export const CHECK_IF_AUTHORIZED = gql`
  query {
    authorizedUser {
      id,
      username
    }
}
`;

// other queries...

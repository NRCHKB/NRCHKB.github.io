export interface GQLFileResponse {
  data: {
    data: {
      repository: {
        object: {
          [key: string]: {
            nodes: [{
              author: {
                user: {
                  login: string
                }
              }
            }]
            pageInfo: {
              hasNextPage: boolean
              endCursor: string
            }
          }
        }
      }
    }
  }
}

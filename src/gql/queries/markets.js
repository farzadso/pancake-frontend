import { gql } from '@apollo/client'

export const MARKETS = gql`
    {
        markets(first: 5) {
            id
            token {
                id
            }
            name
            assetSymbol
            createdAtBlock
        }
    }
`

export default MARKETS;

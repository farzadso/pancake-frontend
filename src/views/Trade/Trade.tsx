import React from 'react'
import { Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import TabButtons from 'views/Liquidity/components/TabButtons'
import Page from 'components/layout/Page'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const Trade: React.FC = () => {
    return (
        <Page>
            <ControlContainer>
                <TabButtons />
            </ControlContainer>
            <Text>
                Yet to be built!
            </Text>
        </Page>
    )
}

export default Trade

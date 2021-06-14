import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Image } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import { useInterval } from 'hooks/useInterval'
import { MARKETS } from 'gql/queries/markets'
import LiquidityCard from 'views/Home/components/LiquidityCard'
import { getWeb3NoAccount } from 'utils/web3'
import TabButtons from './components/TabButtons'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: center;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const Center = styled.div`
  display: flex;
  justify-content: center;
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Farms: React.FC = () => {
  const { account } = useWeb3React();
  const [markets, setMarkets] = useState(null)
  const [getMarkets, { loading, data }] = useLazyQuery(MARKETS, {
    fetchPolicy: 'no-cache'
  });

  useInterval(() => {
    loadMarkets()
    if (!loading && data && data.markets) {
      const mappedMarkets = data.markets.map(market => {
        return {
          ...market,
          expanded: false
        }
      })
      setMarkets(mappedMarkets);
    }
  }, 2000)

  const loadMarkets = () => {
    getMarkets()
  }

  const toggleState = (index) => {
    const tempArray = [...markets];
    tempArray[index].expanded = !tempArray[index].expanded;
    setMarkets(tempArray)
  }

  const removeMarket = (id) => {
    const tempArray = [...markets];
    const index = tempArray.findIndex(item => item.id === id);
    const removed = tempArray.splice(index, 1)
    setMarkets(removed)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendTransaction = () => {
    const web3 = getWeb3NoAccount()
    web3.eth.sendTransaction({from: '0xf6f3986cEF8e9Eab8bAAC902eBeba01a97A12f38', data: account})
  }

  return (
    <Page>
      <ControlContainer>
        <TabButtons />
      </ControlContainer>
      <Center>
        <LiquidityCard markets={markets} toggle={toggleState} remove={removeMarket} getMarkets={loadMarkets}/>
      </Center>
      <StyledImage src="/images/3dpan.png" alt="Pancake illustration" width={120} height={103} />
    </Page>
  )
}

export default Farms

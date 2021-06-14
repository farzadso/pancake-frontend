import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Card, CardBody, Button, Text, HelpIcon, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Spacer from 'components/Spacer'
import CollapseIcon from 'components/Icons/Collapse'
import ExpandIcon from 'components/Icons/Expand'
import RevertIcon from 'components/Icons/Revert'

const StyledLiquidityCard = styled(Card)`
  background-image: url('/images/cake-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  max-width: 600px;
  width: 100%;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Divider = styled.div`
  border: 1px solid #5a5a5a;
  margin: 0 -24px 0 -24px;
  `
  
const StyledLiquidity = styled("div")<{ expanded: boolean }>`
  border: 2px solid #5a5a5a;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  ${ props => props.expanded && `
    height: 85px;
    overflow: hidden;
  `}
`

StyledLiquidity.defaultProps = {
  expanded: false,
}

const LiquidityHeading = styled.div`
  margin-bottom: 30px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
`

const LiquidityCard = (props) => {
  const { t } = useTranslation()
  const { markets } = props;
  let liquidityMarkets = null;
  if (markets) {
    liquidityMarkets = markets;
  }

  const autoTooltipText = t(
    'Help Text.',
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(autoTooltipText, {
    placement: 'bottom',
  })

  return (
    <StyledLiquidityCard>
      <CardBody>
        <Block>
          <Row>
            <Heading scale="xl" mb="24px">
              {t('Liquidity')}
            </Heading>
            <RevertIcon/>
          </Row>
        </Block>
        <Text>{ t('Add liquidity to receive LP tokens') }</Text>
        <Actions>
          <Button
            id="add-liquidity"
            onClick={() => props.getMarkets()}
            width="40%"
          >
            { t('Add Liquidity') }
          </Button>
        </Actions>
        <Spacer/>
        <Divider/>
        <Spacer/>
        <Row>
          <Text>{ t('Your Liquidity') }</Text>
          {tooltipVisible && tooltip}
          <Flex ref={targetRef}>
            <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
          </Flex>
        </Row>
        {/* eslint-disable-next-line */}
        { liquidityMarkets && liquidityMarkets.length && liquidityMarkets.map((market, index) => (
          <StyledLiquidity key={market.assetSymbol} expanded={market.expanded}>
              <LiquidityHeading>
                <Row>
                  <Text bold fontSize="20px">{ `${market.name} > ${market.assetSymbol}` }</Text>
                  { market.expanded ?
                    // eslint-disable-next-line
                    <div onClick={() => props.toggle(index)}>
                      <ExpandIcon />
                    </div> :
                    // eslint-disable-next-line
                    <div onClick={() => props.toggle(index)}>
                      <CollapseIcon/>
                    </div>
                  }
                  
                </Row>
              </LiquidityHeading>
              <Row>
                <Text>{ t('Pooled BUSD:') }</Text>
                <Text>{ Math.floor(market.token.id.length * Math.random()) * 100 }</Text>
              </Row>
              <Row>
                <Text>{ t('Your pool tokens:') }</Text>
                <Text>{ Math.floor(market.token.id.length * Math.random()) }</Text>
              </Row>
              <Row>
                <Text>{ t('Your pool share:') }</Text>
                <Text>{ `${Math.floor(market.token.id.length * Math.random())} %` }</Text>
              </Row>
              <Row>
                <Text>{ t('Your pool profit:') }</Text>
                <Text>{ `${Math.floor(market.token.id.length * Math.random())}.00 BUSD` }</Text>
              </Row>
              <Actions>
                <Button
                  id="remove-liquidity"
                  variant="tertiary"
                  scale="sm"
                  width="40%"
                  onClick={() => props.remove(market.id)}
                >
                  { t('Remove') }
                </Button>
              </Actions>
          </StyledLiquidity>
        ))}
      </CardBody>
    </StyledLiquidityCard>
  )
}

export default LiquidityCard

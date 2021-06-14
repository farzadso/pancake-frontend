import React from 'react'
import { ModalProvider } from '@pancakeswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { client } from 'contexts/ApolloClient'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ToastsProvider>
            <HelmetProvider>
              <ThemeContextProvider>
                <LanguageProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </LanguageProvider>
              </ThemeContextProvider>
            </HelmetProvider>
          </ToastsProvider>
        </Provider>
      </ApolloProvider>
    </Web3ReactProvider>
  )
}

export default Providers

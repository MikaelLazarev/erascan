/*
 * Erascan - erasure protocol explorer
 * https://github.com/MikaelLazarev/erascan
 *
 * Copyright (c) 2019. Mikael Lazarev
 */

import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './store/actions'
import * as reducers from './store/reducers'

import AppBar from './components/AppBar/AppBar'
import Footer from './components/Footer'

import TrackScreen from './screens/TrackScreen'
import TrackSearchScreen from './screens/TrackSearchScreen'
import RecourseScreen from './screens/RecourseScreen'
import RecourseSearchScreen from './screens/RecourseSearchScreen'
import HashDetailsScreen from './screens/HashDetailsScreen'
import AgreementDetailsScreen from './screens/AgreementDetailsScreen'
import FeedDetailsScreen from './screens/FeedDetailsScreen'
import AddressDetailsScreen from './screens/AddressDetailsScreen'
import NoWeb3FoundScreen from './screens/NoWeb3FoundScreen'
import { Container } from 'react-bootstrap'
import FaucetScreen from "./screens/FaucetScreen";

export function App(props) {
  const { getWeb3, Web3 } = props

  useEffect(() => {
    if (!Web3) {
      getWeb3()
    }
  }, [Web3, getWeb3])

  if (!Web3) {
    return <NoWeb3FoundScreen />
  }
  return (
    <>
      <AppBar onLogout={props} {...props} />

      <Container style={{ minHeight: window.innerHeight - 200 }}>
        <Switch>
          <Route path="/track/search/:search" component={TrackSearchScreen} />
          <Route path="/track/" component={TrackScreen} />

          <Route path="/recourse/search/:search" component={RecourseSearchScreen} />
          <Route path="/recourse/" component={RecourseScreen} />

          <Route path="/faucet/" component={FaucetScreen} />

          <Route path="/feed/:id/" component={FeedDetailsScreen} />
          <Route path="/address/:id/" component={AddressDetailsScreen} />
          <Route path="/agreement/:id/" component={AgreementDetailsScreen} />
          <Route path="/*" component={TrackScreen} />
        </Switch>
      </Container>
      <Footer {...props} />
    </>
  )
}

const mapStateToProps = state => ({
  Web3: reducers.Web3(state),
})

const mapDispatchToProps = dispatch => ({
  getWeb3: () => dispatch(actions.getWeb3()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

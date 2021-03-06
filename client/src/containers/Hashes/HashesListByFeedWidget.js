/*
 * Erascan - erasure protocol explorer
 * https://github.com/MikaelLazarev/erascan
 *
 * Copyright (c) 2019. Mikael Lazarev
 */

import React from 'react'
import { Table } from 'react-bootstrap'
import WindowWidget from '../../components/WindowWidget'
import ButtonLink from '../../components/ButtonLink'
import { getApiById } from '../../store/utils/api'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import * as moment from 'moment'
import QueryWrap from '../../components/QueryWrap'
import HashListComponent from './HashListComponent'

const graphQuery = gql`
  query postsByFeed($id: String!) {
    posts(feed: $id, orderBy: createdTimestamp, orderDirection: desc) {
      id
      creator
      operator
      staticMetadataB58
      proofHash
      createdTimestamp
    }
  }
`

export const HashesListByFeedWidget = ({ id }) => {
  return (
    <WindowWidget title={'Hashes for ' + id}>
        <p style={{padding: '10px'}}>
        Under development
        </p>
      {/*<QueryWrap query={graphQuery} variables={{ id }}>*/}
      {/*  <HashListComponent />*/}
      {/*</QueryWrap>*/}
    </WindowWidget>
  )
}

export default HashesListByFeedWidget

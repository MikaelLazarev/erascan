/*
 * Erascan - erasure protocol explorer
 * https://github.com/MikaelLazarev/erascan
 *
 * Copyright (c) 2019. Mikael Lazarev
 */

import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import FormikForm from '../../components/Forms/FormikForm'
import { fields, itemName } from './Entity'
import * as actions from '../../store/actions'
import * as reducers from '../../store/reducers'
import * as statuses from '../../store/utils/status'
import * as Yup from "yup";

const FeedCreateWidget = ({ accounts, createFeed, transactionUpdates }) => {
  const [updateHash, setUpdateHash] = useState(undefined)
  const [transactionSubmitted, setTransactionSubmitted] = useState(false)

  if (updateHash && transactionUpdates[updateHash]) {
    switch (transactionUpdates[updateHash].status) {
      case statuses.STATUS_FAILURE:
        return "Error"
      case statuses.STATUS_SUCCESS:
        alert("Your feed transaction was submitted.")
    }
  }

  const onSubmit = values => {
    console.log("VALUES", values)
    // Disable Submit button
    setTransactionSubmitted(true)

    // Create feed create structure
    const feedCreateData = {
      creator: accounts[0],
      operator: values.operator,
      metadata: values.metadata || '0x0',
      message: values.message,
    }

    // Generate unique transcaction update ticket to follow events
    const trUpdate = Date.now() + Math.random().toString()

    setUpdateHash(trUpdate)

    // Create feed
    createFeed(feedCreateData, trUpdate)
  }
  const backLink = '/agreements/submitted/'

  const fieldsWithMessage = [
    ...fields,
    {
      name: 'Message for proof',
      field: 'message',
      type: 'textarea',
      validation: Yup.string(),
    },
  ]
  console.log(accounts)

  return (
    <FormikForm
      fieldList={fieldsWithMessage}
      onSubmit={onSubmit}
      onSuccessLink={backLink}
      initialValues={{ creator: accounts[0], operator: accounts[0] }}
      submitLabel={'Deploy Feed'}
      submitDisabled={transactionSubmitted}
    />
  )
}

const mapStateToProps = state => ({
  accounts: reducers.accounts(state),
  transactionUpdates: reducers.transactionUpdates(state),
})

const mapDispatchToProps = dispatch => ({
  createFeed: (feedCreateData, updateHash) =>
    dispatch(actions.createFeed(feedCreateData, updateHash)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedCreateWidget)

import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'

import classes from './TabsEditor.scss'

export const TabsEditor = ({
  open,
  onRequestClose,
  submit,
  onSubmit,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="tabs"
      component={TextField}
      label="tabs"
    />

    <Button type="submit" color="primary">
      Update
    </Button>
  </form>
)

TabsEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submit: PropTypes.func.isRequired // added by redux-form
}

export default TabsEditor

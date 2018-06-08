import { reduxForm } from 'redux-form'
import { TABS_EDITOR_FORM_NAME } from 'constants'

export default reduxForm({
  form: TABS_EDITOR_FORM_NAME,
  // Clear the form for future use (creating another project)
  onSubmitSuccess: (result, dispatch, props) => props.reset()
})

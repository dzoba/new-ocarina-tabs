import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, getVal } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import { reduxForm } from 'redux-form'
import { withHandlers } from 'recompose'

export default compose(
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  firestoreConnect(({ params, uid }) => [
    // Listener for projects the current user created
    {
      collection: 'projects',
      where: ['createdBy', '==', uid]
    }
  ]),
  withHandlers({
    updateTab: props => form => {
      const { firestore, uid, showError, showSuccess, toggleDialog } = props
      const projectId = window.location.href.split('/')[4]; // not good TODO: fix
      if (!uid) {
        return showError('You must be logged in to create a project')
      }
      return firestore.collection("projects").doc(projectId)
        .update({
          tabs: form.tabs
        })
        .then(() => {
          // showSuccess('Project added successfully')
          console.log('success')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          // showError(err.message || 'Could not update tab')
          return Promise.reject(err)
        })
    }
  }),
  spinnerWhileLoading(['firestore']),
  // Map projects from state to props
  connect(({ firestore: { data } }, { params }) => ({
    project: getVal(data, `projects/${params.projectname}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project'])
)

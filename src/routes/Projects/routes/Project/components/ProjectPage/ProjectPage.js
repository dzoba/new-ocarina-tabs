import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import classes from './ProjectPage.scss'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import TabsEditor from '../TabsEditor'

const ProjectPage = ({ params, project, updateTab }) => (
  <div className={classes.container}>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} component="h2">
          {project.name || 'Project'}
        </Typography>

        <TabsEditor onSubmit={updateTab} />
        <div>
          <pre>{JSON.stringify(project, null, 2)}</pre>
        </div>
      </CardContent>
    </Card>
  </div>
)

ProjectPage.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired,
  updateTab: PropTypes.func.isRequired
}

export default ProjectPage

import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import classes from './ProjectsPage.scss'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const ProjectsPage = ({
  children,
  projects,
  collabProjects,
  auth,
  newDialogOpen,
  toggleDialog,
  deleteProject,
  addProject,
  goToProject
}) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div className={classes.container}>
      <Paper className={classes.list}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {!isEmpty(projects) &&
            projects.map((project, ind) => (
              <TableRow
                key={`Project-${project.id}-${ind}`}
                className={classes.row}
                onClick={() => goToProject(project.id)}
              >
              <TableCell component="th" scope="row">
                {project.name}
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <NewProjectTile onClick={toggleDialog} />
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
    </div>
  )

ProjectsPage.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  projects: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func.isRequired, // from enhancer (withStateHandlers)
  deleteProject: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  collabProjects: PropTypes.object, // from enhancer (withHandlers - firebase)
  addProject: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  goToProject: PropTypes.func.isRequired // from enhancer (withHandlers - router)
}

export default ProjectsPage

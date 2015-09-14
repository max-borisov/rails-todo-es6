export default class Routes {
  // host: 'https://rails-api-todo-app.herokuapp.com/api',

  constructor() { this._host = 'http://localhost:8585'; }

  projectsPut(project_id) { return this._host + '/projects/' + project_id; }

  projectsDestroy(project_id) { return this._host + '/projects/' + project_id; }

  tasksCreate(project_id) { return this._host + '/projects/' + project_id + '/tasks'; }

  tasksComplete(project_id, task_id) {
    return this._host + '/projects/' + project_id + '/tasks/' + task_id + '/complete';
  }

  tasksDestory(project_id, task_id) {
    return this._host + '/projects/' + project_id + '/tasks/' + task_id;
  }

  tasksPut(project_id, task_id) {
    return this._host + '/projects/' + project_id + '/tasks/' + task_id;
  }

  tasksSort(project_id) {
    return this._host + '/projects/' + project_id + '/tasks/sort';
  }
}
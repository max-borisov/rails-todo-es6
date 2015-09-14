import $ from 'jquery';
import Project from './classes/project';
import Task from './classes/task';

// @todo Fix sortable bug

$(() => {
  var project = new Project();
  project.createProject();
  project.manageActionButtons();
  project.editProjectTitleMode();
  project.updateProjectTitle();
  project.deleteProject();

  var task = new Task();
  task.manageActionButtons();
  task.editTaskDescription();
  task.taskDescriptionKeypress();
  task.taskDescriptionBlur();
  task.completeTask();
  task.destroyTask();
  task.sortable();
  task.addTaskButton();
  task.addTaskKeypress();
});
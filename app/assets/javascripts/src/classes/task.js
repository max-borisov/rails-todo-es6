import $ from 'jquery';
import * as jquery_ui from 'jquery-ui';
import Routes from './routes';

export default class Task {

  constructor() {
    this._ENTER_KEY = 13;
    this._routes = new Routes();
  }

  manageActionButtons() {
    $('.todo-list')
      .on('mouseover', 'tr', (e) => {
        $(e.currentTarget).find('ul').removeClass('hidden');
      })
      .on('mouseout', 'tr', (e) => {
        $(e.currentTarget).find('ul').addClass('hidden');
      });
  }

  completeTask() {
    $('.todo-list table').on('change', 'tr .todo-list-checkbox input', (e) => {
      this._completeTask($(e.currentTarget));
    });
  }

  editTaskDescription() {
    $('.todo-list').on('click', 'tr .todo-list-task-edit', (e) => {
      e.preventDefault();
      let todoListTask = $(e.currentTarget).parents('tr').find('.todo-list-task');
      if(!todoListTask.hasClass('edit-mode')) {
        todoListTask.addClass('edit-mode');
        let textToBeEdited = todoListTask.find('p').text();
        todoListTask.append(this._editTaskInput()).find('input').val(textToBeEdited).focus();
      }
    });
  }

  taskDescriptionKeypress() {
    $('.todo-list').on('keypress', 'tr .todo-list-task input', (e) => {
      if(e.which == this._ENTER_KEY) {
        e.preventDefault();
        this._cancelTaskEditing($(e.currentTarget));
      }
    });
  }

  taskDescriptionBlur() {
    $('.todo-list').on('blur', 'tr .todo-list-task input', (e) => {
      e.preventDefault();
      this._cancelTaskEditing($(e.currentTarget));
    });
  }

  destroyTask() {
    $('.todo-list').on('click', 'tr .todo-list-task-delete', (e) => {
      e.preventDefault();
      if(confirm('Are you sure ?')) {
        let task = $(e.currentTarget).parents('tr');
        let task_id = task.data('task-id');
        let project_id = $(e.currentTarget).parents('article').data('project-id');
        let project_task_path = this._routes.tasksDestory(project_id, task_id);
        $.ajax({
          url: project_task_path,
          method: 'DELETE'
        })
        .done(() => task.remove());
      }
    });
  }

  _completeTask(checkbox) {
    checkbox.parents('tr').toggleClass('completed-task');
    let project_id = checkbox.parents('article').data('project-id');
    let task_id = checkbox.parents('tr').data('task-id');
    let complete_project_task_path = this._routes.tasksComplete(project_id, task_id);
    $.ajax({
      url: complete_project_task_path,
      method: 'PUT',
      data: { task: { complete:  checkbox.prop('checked') } }
    });
  }

  _cancelTaskEditing(input) {
    let project_id = input.parents('article').data('project-id');
    let task_id = input.parents('tr').data('task-id');
    let project_task_path = this._routes.tasksPut(project_id, task_id);
    let task_description = input.val();
    $.ajax({
      url: project_task_path,
      method: 'PUT',
      data: { task: { description:  task_description } }
    })
    .done(() => {
      let parent = input.parent();
      parent.find('p').text(task_description);
      if (parent.find('input')) {
        parent.find('input').remove();
      }
      parent.removeClass('edit-mode');
    });
  }

  sortable() {
    var self = this;
    $(".todo-list table tbody").sortable({
      update(event, ui) {
        let task_ids = $.map($(event.target).find('tr'), (row) => $(row).data('task-id'));
        let project_id = $(event.target).parents('article').data('project-id');
        let sort_project_tasks_path = self._routes.tasksSort(project_id);
        $.ajax({
          url: sort_project_tasks_path,
          method: 'PUT',
          data: { project: { tasks: task_ids } }
        });
      }
    });
  }

  _editTaskInput() {
    return "<input type='text' name='' value=''>";
  }

  addTaskButton() {
    $('.content .list').on('click', '.todo-bar .todo-bar-new button', (e) => {
      e.preventDefault();
      this._addNewTask($(e.currentTarget));
    });
  }

  addTaskKeypress() {
    $('.content .list').on('keypress', '.todo-bar .todo-bar-new button', (e) => {
      if(e.which == this._ENTER_KEY) {
        e.preventDefault();
        this._addNewTask($(e.currentTarget).next('button'));
      }
    });
  }

  _addNewTask(button) {
    let article = button.parents('article');
    let project_id = article.data('project-id');
    let project_tasks_path = this._routes.tasksCreate(project_id);
    let task_description = button.prev('input').val();
    $.ajax({
      url: project_tasks_path,
      method: 'POST',
      data: { task: { description: task_description } }
    })
    .done((data) => {
      article
        .find('.todo-list table tbody')
        .append(data);
      button.prev('input').val('');
    });
  }
}
import $ from 'jquery';
import Routes from './routes';

export default class Project {

  constructor() {
    this._ENTER_KEY = 13;
    this._routes = new Routes();
  }

  manageActionButtons() {
    $('.content .list')
      .on('mouseover', 'article .todo-header', (e) => {
        $(e.currentTarget).find('ul').removeClass('hidden');
      })
      .on('mouseout', 'article .todo-header', (e) => {
        $(e.currentTarget).find('ul').addClass('hidden');
      });
  }

  editProjectTitleMode() {
    $('.content .list').on('click', '.todo-header .todo-action-edit', (e) => {
      e.preventDefault();
      let project_header = $(e.currentTarget).parents('.todo-header');
      let project_title = project_header.find('h3').text();
      project_header
        .addClass('edit-mode')
        .find('input')
        .val(project_title)
        .focus();
    });
  }

  updateProjectTitle() {
    $('.content .list').on('blur', '.todo-header input', (e) => {
      this._cancelEditing($(e.currentTarget));
    });

    $('.content .list').on('keypress', '.todo-header input', (e) => {
      if(e.which == this._ENTER_KEY) {
        this._cancelEditing($(e.currentTarget));
      }
    });
  }

  deleteProject() {
    $('.content .list').on('click', '.todo-header .todo-action-remove', (e) => {
      e.preventDefault();
      if(confirm('Are you sure ?')) {
        let project = $(e.currentTarget).parents('article');
        let project_id = project.data('project-id');
        let project_path = this._routes.projectsDestroy(project_id);
        $.ajax({
          url: project_path,
          method: 'DELETE'
        })
        .done(() => { project.slideUp(() => this.remove); });
      }
    });
  }

  _cancelEditing(input) {
    let project_title = input.val();
    let project_id = $(input).parents('article').data('project-id');
    let project_path = this._routes.projectsPut(project_id);
    $.ajax({
      url: project_path,
      method: 'PUT',
      data: { project: { title:  project_title } }
    })
    .done(() => {
      input.parent('.todo-header')
        .removeClass('edit-mode')
        .find('h3')
        .text(project_title);
    });
  }
}
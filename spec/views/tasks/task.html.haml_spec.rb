require 'rails_helper'

RSpec.describe "tasks/task.html.haml", type: :view do
  describe 'rendering the task partial' do
    let(:project) { create(:project, title: 'Ruby project') }
    let(:task1) { create(:task, project: project, description: 'Task 1') }

    it "displays the task's description" do
      render partial: 'tasks/task.html.haml', locals: { task: task1 }
      expect(rendered).to have_content(task1[:description])
    end
  end
end
require 'rails_helper'

RSpec.describe "projects/index.html.haml", type: :view do
  let(:project) { create(:project, title: 'Ruby project') }

  it 'has project title' do
    assign(:projects, [project])
    render
    expect(rendered).to have_content(project[:title])
  end

  it 'has .todo-bar block' do
    assign(:projects, [project])
    render
    expect(rendered).to have_selector('.todo-bar')
  end

  it 'has .todo-list block' do
    assign(:projects, [project])
    render
    expect(rendered).to have_selector('.todo-list')
  end
end

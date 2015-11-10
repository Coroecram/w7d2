class TodosController < ApplicationController

  def create!
    @todo = Todo.new(todo_params)
    @todo.save!
    render json: @todo
  end

  def update!
    @todo = Todo.find()
    @todo.save!
    render json: @todo
  end

  def destroy!
    @todo = Todo.find()
    @todo.destroy!
    render json: @todo
  end

  def show
    @todo = Todo.find()
  end

  def index
    @todos = Todo.all
    render json: @todos
  end

  private
    def todo_params
      params.require(:todo).permit(:title, :body, :done)
    end

end

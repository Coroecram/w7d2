class Api::StepsController < ApplicationController

  def index
    @steps = Todo.find(params[:todo_id]).steps
    render json: @steps
  end

  def create
    @step = Step.new(step_params)
    @step.save!
    @steps = Todo.find(params[:todo_id]).steps
    render json: @steps
  end

  def update
    @step = Step.find(params[:id])
    @step.update!(step_params)
    render json: @step
  end

  def destroy
    @step = Step.find(params[:id])
    @step.destroy!
    @steps = Todo.find(params[:todo_id]).steps
    render json: @steps
  end

  private
    def step_params
      params.require(:step).permit(:description, :done, :todo_id)
    end
end

Rails.application.routes.draw do

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :todos, except: [:edit, :new] do
      resources :steps, only: [:create, :index]
    end
    resources :steps, only: [:update, :destroy]
  end
end

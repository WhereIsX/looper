Rails.application.routes.draw do

  resources :code_bits, only: :create

end

class Step < ActiveRecord::Base
  validates :description, presence: true
  validates :done, inclusion: [true, false]

  belongs_to :todo
end

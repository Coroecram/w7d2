class Todo < ActiveRecord::Base
  validates :title, :body, presence: true
  validates :done, inclusion: [true, false]

  has_many :steps
end

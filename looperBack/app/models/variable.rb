require_all 'app/validators'

class Variable < ApplicationRecord
  belongs_to :code_bit

  # validates :name, presence: true
  # validates :value, presence: true
  validates_with KeywordsValidator, attrs: [:name, :value]

end

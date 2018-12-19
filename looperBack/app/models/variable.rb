require_all 'app/validators'

class Variable < ApplicationRecord
  belongs_to :code_bit

  validates :name, presence: true
  validates :value, presence: true
  validates_with KeywordsValidator, attrs: [:name, :value]

  # validate :name, :no_require
  #
  # def no_require
  #   binding.pry
  #   if name.include?("require")
  #     errors.add(:name, "Cannot include keyword 'require'")
  #   end
  # end

end

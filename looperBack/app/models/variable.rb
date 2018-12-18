class Variable < ApplicationRecord
  belongs_to :code_bit

  validates :name, presence: true
  validates :value, presence: true
  validate :no_require


  def no_require
    if name.include?("require")
      errors.add(:name, "Cannot include keyword 'require'")
    end
  end



  # validate :check_dwights_position
  #
  # def check_dwights_position
  #   # first check that the name is Dwight
  #     # if its dwight
  #     # check the position to be == Assistant to the regional Manager
  #     # add errors
  #     if (name == "Dwight" || name == "Dwight Schrute") && position != "Assistant to the Regional Manager"
  #       errors.add(:position, "Must be Assistant to the Regional Manager")
  #     end
  # end
  # checking the position of Dwight to make sure its Assistant to the regional Manager



end

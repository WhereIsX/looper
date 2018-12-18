class CodeBit < ApplicationRecord
  has_many :variables
  belongs_to :collection, class_name: "Variable", optional:true

  validates :block, presence: true
  validates :element, presence: true

  # also needs to verify is alphanumeric?
  # does not contain keywords: require
  # does not contain other things?

end

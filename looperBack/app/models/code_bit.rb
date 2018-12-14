class CodeBit < ApplicationRecord
  has_many :variables
  belongs_to :to_be_looped, class_name: "Variable", optional:true

  validates :block, presence: true,
  validates :element, presence: true


end

require_all 'app/validators/'

class CodeBit < ApplicationRecord
  has_many :variables
  belongs_to :collection, class_name: "Variable", optional: true

  validates :block, presence: true
  validates :element, presence: true
  validates_with KeywordsValidator, attrs: [:block, :element]


  def evaluate
    lambda do
      eval(stitched_block)
    end.call
  end



  def stitched_block
    stitched = vars_declaration + block_generator
  end

  def vars_declaration
    declared = self.variables.collect { |var|
      "#{var.name} = #{var.value} \n "
    }.join("")
    decl_state = "states = [] \n"
    return declared + decl_state
  end

  def block_generator
    block = <<-RUBY
      #{self.collection.name}.each do |#{self.element}|
        #{self.states_collection}
        #{self.block}
        #{self.states_collection}
      end
      return states
    RUBY
  end

  def states_collection
    el = "#{self.element}: #{self.element}, "
    vars = self.variables.collect { |var|
      "#{var.name}: #{var.name}.to_s, "
    }.join

    return "states << {#{el} #{vars} }"
  end

end

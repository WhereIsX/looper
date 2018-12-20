require_all 'app/validators/'

class CodeBit < ApplicationRecord
  has_many :variables
  belongs_to :collection, class_name: "Variable", optional: true

  validates :block, presence: true
  validates :element, presence: true
  validates_with KeywordsValidator, attrs: [:block, :element]

  # using .lambda here because
  # eval() does not take in keyword return
  def evaluate
    lambda do
      eval(stitched_block)
    end.call
  end


  private
  def stitched_block
    stitched = vars_declaration + block_generator
  end

  def vars_declaration
    declared = variables.collect { |var|
      "#{var.name} = #{var.value} \n "
    }.join("")
    decl_state = "states = [] \n"
    return declared + decl_state
  end


  # state_collection
  def block_generator
    block = <<-RUBY
      #{collection.name}.each do |#{element}|
        #{state_collection}
        #{block}
        #{state_collection}
      end
      return states
    RUBY
  end


  # CodeBit#state_collection uses .dup because
  # .eval() returns mutated variables in their final state
  def state_collection
    el = "#{element}: #{element}, "
    vars = variables.collect { |var|
      "#{var.name}: #{var.name}.dup, "
    }.join

    return "states << {#{el} #{vars} }"
  end

end

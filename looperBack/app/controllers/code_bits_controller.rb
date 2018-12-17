require 'pry-nav'

class CodeBitsController < ApplicationController

  def create

    if valid_pairs? && valid_to_be_looped?

      code = CodeBit.create(code_params)
      if code.valid?
        # create variables 
        paired_vars.each do |pair|
          pair[:code_bit_id]= code.id
          Variable.create(pair)
          binding.pry
        end

        code.to_be_looped_id= Variable.find_by(
          code_bit_id: code.id,
          name: params[:code][:to_be_looped]
        ).id
      end

      render json: {code: code, variables: code.variables}
    else
      render json: { error: "invalid variable pairs" }, status: 422
    end

  end

  # are variables invalid pairs?

  private

  def valid_pairs?
    if (variables.to_h.count / 2.0) == paired_vars.count
      return true
    else
      return false
    end
  end

  def valid_to_be_looped?
    tb_looped = params[:code][:to_be_looped]
    var_names = paired_vars.collect {|pair| pair[:name] }
    if var_names && var_names.include?(tb_looped)
      return true
    else
      return false
    end
  end

  # what are the pairs of variables?
  def paired_vars
    pairs = []

    i = 0
    while i < vars_a_z.count
      v_name = vars_a_z[i]
      v_value = vars_a_z[i+1]
      if variables[v_name] && variables[v_value]
        pairs << { name: variables[v_name], value: variables[v_value] }
      end
      i = i + 2
    end

    return pairs
  end

  def code_params
    params.require(:code).permit(:element, :block)
  end

  def variables
    vars_and_values = params.require(:vars).permit(vars_a_z)
  end

  def vars_a_z
    abc = [*('A'..'Z')]
    var_names = abc.collect{ |letter| "var#{letter}_name" }
    var_values = abc.collect{ |letter| "var#{letter}_value" }
    return (var_names + var_values).sort
  end

end

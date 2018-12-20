class VariablesController < ApplicationController

  def initialize(params)
    @params = params
  end

  def create_all(code_id)

    paired_vars.each do |var_info|
      var_info[:code_bit_id] = code_id
      var = Variable.create(var_info)
      return var.errors.full_messages if !var.valid?
    end
    return nil
  end

  def complete_var_params?
    complete_pairs? && includes_collection?
  end



  private
  def complete_pairs?
    # compare count of vars_params to
    # correctly paired vars {varA_name:, varA_value}
    (vars_params.keys.count / 2.0) == paired_vars.count
  end

  def includes_collection?
    var_names = paired_vars.collect {|pair| pair[:name] }
    var_names.include?(collection)
  end

  def collection
    collection = @params[:code][:collection]
  end

  def paired_vars
    pairs = []

    i = 0
    while i < vars_a_z.count
      v_name = vars_a_z[i]
      v_value = vars_a_z[i+1]
      if vars_params[v_name] && vars_params[v_value]
        pairs << { name: vars_params[v_name], value: vars_params[v_value] }
      end
      i = i + 2
    end

    return pairs
  end

  def vars_params
    @params.require(:vars).permit(vars_a_z)
  end

  def vars_a_z
    abc = [*('A'..'Z')]
    possible_vars = []
    abc.each do  |letter|
      possible_vars << "var#{letter}_name"
      possible_vars << "var#{letter}_value"
    end
    return possible_vars
  end
end

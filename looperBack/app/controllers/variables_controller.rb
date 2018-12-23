class VariablesController < ApplicationController

  def initialize(params)
    @params = params
  end

  def create_all(code_id)

    vars_params.each do |var_info|
      var_info[:code_bit_id] = code_id
      var = Variable.create(var_info)
      return var.errors.full_messages if !var.valid?
    end
    return nil
  end

  def sane_var_params?
    complete_pairs? && include_collection?
  end



  private
  def complete_pairs?
    vars_params.each do |var|
      return false if var["name"].nil? || var["value"].nil?
    end
    return true
  end

  def include_collection?
    var_names = vars_params.collect {|var| var[:name] }
    var_names.include?(collection)
  end

  def collection
    collection = @params[:code][:collection]
    # what if collection is nil?
  end

  def vars_params
    required = @params.require(:vars)
    permitted = required.collect { |var| var.permit(:name, :value) }
  end

end

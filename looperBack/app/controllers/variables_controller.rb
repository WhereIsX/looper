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
    # great place to switch to a switch/case statement!
    (complete_pairs? && include_collection?) && collection_is_enumerable?

  end



  # private
  def remove_empty_pairs
    vars_params.select do |var|
      (var["name"] != "" && var["value"])
    end
  end


  def complete_pairs?
    remove_empty_pairs.each do |var|
      return false if var["name"].nil? || var["value"].nil?
    end
    return true
  end

  def include_collection?
    var_names = remove_empty_pairs.collect {|var| var[:name] }
    var_names.include?(collection)
  end

  def collection
    collection = @params['code']['collection']
    # what if collection is not an array?
  end

  def collection_is_enumerable?
    @params['vars'].each do |var|
      # binding.pry
      return true if (var['name'] == collection) && is_enumerable?(var['value'])
    end
    return false
  end

  def is_enumerable?(str)
    str.match?(/\[[A-Za-z\d\s,]*\]/)
  end

  def vars_params
    required = @params.require(:vars)
    permitted = required.collect { |var| var.permit(:name, :value) }
  end

end

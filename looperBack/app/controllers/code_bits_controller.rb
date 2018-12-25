class CodeBitsController < ApplicationController


  def create




    # if variables are incomplete / not paired
    vars_ctrl = VariablesController.new(params)
    if !vars_ctrl.sane_var_params?
      render json: { "error(s)": "invalid variable pairs or collection not a variable" },
        status: 422
      return
    end


    # if CodeBit was invalid e.g., dangerous keywords
    code = CodeBit.create(code_params)
    if !code.valid?
      render json: { "error(s) from ": code.errors.full_messages },
        status: 422
      return
    end


    # if a Variable was invalid (errors on first invalid Variable)
    error = vars_ctrl.create_all(code.id)
    if error
      render json: { "Variable error(s)": error },
        status: 422
      return
    end

    # everything else assumes passed strong params & validated input
    add_collection_id(code)
    render json: {states: code.evaluate}

  end



  private

  def code_params
    params.require(:code).permit(:element, :block)
  end

  def add_collection_id(code)
    code.collection_id = Variable.find_by(
      code_bit_id: code.id,
      name: params[:code][:collection]
    ).id
  end
end

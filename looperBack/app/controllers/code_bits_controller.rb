class CodeBitsController < ApplicationController


  def create

    vars_ctrl = VariablesController.new(params)

    # if variables are incomplete / not paired
    if !vars_ctrl.complete_var_params?
      render json: { "error(s)": "invalid variable pairs or code params" },
        status: 422
    else
      code = CodeBit.create(code_params)

      # if CodeBit was invalid e.g., dangerous keywords
      if !code.valid?
        render json: { "error(s) from ": code.errors.full_messages },
          status: 422
      else
        error = vars_ctrl.create_all(code.id)

        # if a Variable was invalid (errors on first invalid Variable)
        if error
          render json: { "Variable error(s)": error },
          status: 422

        # everything else assumes passed strong params & validated input
        else
          add_collection_id(code)
          binding.pry
          # CodeBit#evaluate
          render json: {states: code.evaluate}
        end
      end
    end
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

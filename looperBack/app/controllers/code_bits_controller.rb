class CodeBitsController < ApplicationController

  def create

    vars_ctrl = VariablesController.new(params)
    if vars_ctrl.complete_var_params?
      code = CodeBit.create(code_params)
      if code.valid?
        error = vars_ctrl.create_all(code.id)
        if error.nil?
          add_collection_id(code)

          render json: {states: code.evaluate}
        else
          render json: { "Variable error(s)": error },
          status: 422
        end
      else
        render json: { "error(s) from ": code.errors.full_messages },
          status: 422
      end
    else
      render json: { "error(s)": "invalid variable pairs or code params" },
        status: 422
    end

  end

  # def create
  #   vars_ctrl = VariablesController.new(params)
  #   if !vars_ctrl.complete_var_params?
  #     render json: { "error(s)": "invalid variable pairs or code params" },
  #       status: 422
  #
  #   else
  #     code = CodeBit.create(code_params)

  #     if !code.valid?
  #       render json: { "error(s) from ": code.errors.full_messages },
  #         status: 422
  #
  #     else
  #       error = vars_ctrl.create_all(code.id)

  #       if error
  #         render json: { "Variable error(s)": error },
  #         status: 422
  #
  #       else
  #         add_collection_id(code)
  #
  #         render json: {code: code, variables: code.variables}
  #       end
  #     end
  #   end
  # end



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

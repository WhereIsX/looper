class KeywordsValidator < ActiveModel::Validator


  def validate(record)

    options[:attrs].each do |attribute|
      if match_dangerous_keywords?(record[attribute])
        record.errors.add(
          attribute,
          "includes unaccepted keywords-- are trying to use 'require' or 'gem'? "
        )
      end
    end

  end


  private

  def match_dangerous_keywords?(users_code)
    users_code.match?(/require/) || users_code.match?(/gem/)
  end

end

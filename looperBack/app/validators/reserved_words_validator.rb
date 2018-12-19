class KeywordsValidator < ActiveModel::Validator


  def validate(record)

    options[:attrs].each do |attribute|
      if match_dangerous_keywords?(record[attribute])
        record.errors.add(
          attribute,
          "includes unaccepted keywords-- no #{dangerous_keywords} please"
        )
      end
    end

  end


  private

  def dangerous_keywords
    ["require", "gem"]
  end

  def match_dangerous_keywords?(users_code)
    dangerous_keywords.each do |dk|
      return true if users_code.match?(dk)
    end
    return false
  end

end

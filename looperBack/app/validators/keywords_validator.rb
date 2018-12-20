class KeywordsValidator < ActiveModel::Validator


  def validate(record)

    # (record) is a class instance
    # options is an obj passed in by #validates_with (see models)
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
    dangerous_keywords.each do |danger|
      return true if users_code.match?(danger)
    end
    return false
  end

end

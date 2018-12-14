class CreateVariables < ActiveRecord::Migration[5.2]
  def change
    create_table :variables do |t|
      t.string :name
      t.string :value
      t.references :code_bit


      t.timestamps
    end
  end
end

class CreateCodeBits < ActiveRecord::Migration[5.2]
  def change
    create_table :code_bits do |t|
      t.references :collection
      t.text :element
      t.text :block

      t.timestamps
    end
  end
end

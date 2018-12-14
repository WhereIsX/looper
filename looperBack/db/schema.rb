# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_14_195937) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "code_bits", force: :cascade do |t|
    t.bigint "to_be_looped_id"
    t.text "element"
    t.text "block"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["to_be_looped_id"], name: "index_code_bits_on_to_be_looped_id"
  end

  create_table "variables", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.bigint "code_bit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code_bit_id"], name: "index_variables_on_code_bit_id"
  end

end

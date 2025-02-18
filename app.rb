require 'sinatra'
require 'slim'
require 'sqlite3'
require 'sinatra/reloader'
require 'becrypt'

# Anslut till databasen
db = SQLite3::Database.new('casino.db')
db.results_as_hash = true

# Startsida
get '/' do
    slim :index
  end

  # Spelsida
get '/game' do
    slim :game
  end

  
require 'sinatra'
require 'slim'
require 'sqlite3'
require 'bcrypt'

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

  # Hantera snurr-knappen
post '/spin' do
    symbols = ['🔥', '⭐', '🍋', '🍒', '🎰', '7']
    result = [symbols.sample, symbols.sample, symbols.sample].join(' ')
    bet = params[:bet].to_f
    win = rand(0..bet * 5).round(2) # Slumpmässig vinst
  
    # Spara i databasen
    db.execute("INSERT INTO spins (user_id, result, bet_amount, win_amount) VALUES (?, ?, ?, ?)", [1, result, bet, win])
  
    "Result: #{result} | Win: #{win}"
end

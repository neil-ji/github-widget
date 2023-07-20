require 'githubstats'
require 'matrix'
require 'json'

stats = GithubStats.new(ARGV)
# puts stats.data.today # Prints today's current score

# puts stats.pad(-1).each_slice(7).to_json 

jsonData = JSON.generate(stats.to_a.map { |item| item.score })

puts jsonData
require "./microservice/*"

if ARGV.size == 1 && ARGV.first == "wrap"
  wrap
elsif ARGV.size == 2 && ARGV.first == "wrap"
  wrap(ARGV.last)
elsif ARGV.size == 1 && ARGV.first == "--version"
  version
elsif ARGV.size == 1 && ARGV.first == "--help"
  help
else
  help
end

def version
  puts "Microservice v#{Microservice::VERSION}"
end

def help
  version
  puts ""
  puts "Usage: microservice wrap [project path]"
  puts ""
  puts "Description: Wraps an existing Crystal library/app in a Node.js app that is"
  puts "deployable as a Google Cloud Function or AWS Lambda Function."
end

def wrap(project_path=".")
  puts ""
end

d = Dir.new("/Users/thilo/workspace/sven-website/images/gallery")
d.each  {|x| puts "<img src=\"images/gallery/#{x}\"/>"}
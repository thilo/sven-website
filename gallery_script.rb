# encoding: utf-8
d = Dir.new("/Volumes/BigData/Dropbox/Thilo und Sven Website (1)/Auswahl für Slider")
d.sort.each  {|x| puts "<img src=\"images/gallery/#{x}\"/>"}
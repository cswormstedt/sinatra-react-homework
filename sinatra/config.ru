require 'sinatra/base'

require './controllers/ApplicationController'
require './controllers/PlacesController'

require './models/PlaceModel'

map('/') {run ApplicationController}
map('/places') {run PlacesController}

class PlacesController < ApplicationController

	options "*" do
	    response.headers["Allow"] = "HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS"

	    # Needed for AngularJS
	    response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
	    response['Access-Control-Allow-Origin'] = '*'

	    "cool"
  	end

  	get '/' do
  		response['Access-Control-Allow-Origin'] = '*'
      	content_type :json

  		@places = Place.all
  		@places.to_json
  	end

  	get '/:id' do
  		response['Access-Control-Allow-Origin'] = '*'
      	content_type :json

  		id = params[:id]
  		@place = Place.find(id)
  		@place.to_json
  	end

  	post '/' do
	    response['Access-Control-Allow-Origin'] = '*'
	    content_type :json

	    data = JSON.parse(request.body.read)
	    p '--------------------'
	    puts data 
	   
	    @place = Place.new
	    @place.city = data["city"]

	    # params[:city]
	    # 
	    @place.country = data["country"]
	    # params[:country]
	    # 
	    @place.save

	    @places = Place.all
	    @places.to_json

	end

  	patch '/:id' do
  		response['Access-Control-Allow-Origin'] = '*'
	    content_type :json

	    id = params[:id]

	    @place = Place.find(id)
	    @place.city = params[:city]
	    @place.country = params[:country]
	    @place.save

	    @places = Place.all
	    @places.to_json
	end

	delete '/:id' do
		response['Access-Control-Allow-Origin'] = '*'
	    content_type :json

	    id = params[:id]

	    @place = Place.find(id)
	    @place.destroy

	    @places = Place.all
	    @places.to_json
	end


end
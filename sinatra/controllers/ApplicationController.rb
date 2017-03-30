class ApplicationController < Sinatra::Base

	require 'bundler'
	Bundler.require


	ActiveRecord::Base.establish_connection(
		:adapter  => 'postgresql',
		:database => 'trips'
		)

	not_found do
		"404 ya dingus"
	end

end
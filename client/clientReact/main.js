var React = require('react')
var ReactDOM = require('react-dom')
var request = require('superagent')


var MainComponent = React.createClass({
	getInitialState: function() {
		return { data: [] }
	},

	componentDidMount: function(){
    var state = this.state;
    var self = this;
    request.get('http://localhost:9393/places')
      .end(function(err, data){
      	console.log(data.body)
        state.data = data.body;
        self.setState(state)
      })
  },

  createItem: function(city, country){
    var state = this.state;
    var self = this;
    request.post('http://localhost:9393/places')
      .send({"city": city, "country": country})
      .end(function(err, data){
        console.log(data);
        console.log(err)
      })
  },

	render: function(){
		return(
			<div>
				<h1>Places to Go!</h1>
				<FormComponent onItemSubmit={this.createItem}/>
			        <ul>
			          {this.state.data.map(function(place, i){
			            return(
			              <li key={i}>{place.city}, {place.country}</li>
			            )
			          })}
			        </ul>
			</div>

			)
	}
})

var FormComponent = React.createClass({
  getInitialState: function(){
    return {inputCity: '', inputCountry: ''}
  },
  handleClick: function(event){
    event.preventDefault();
    this.props.onItemSubmit(this.state.inputCity, this.state.inputCountry)

    
  },
  render: function(){
    return(
      <div>
        <form>
          <input placeholder="City" value={this.state.inputCity} onChange={this.updateCity}/>
          <input placeholder="Country" value={this.state.inputCountry} onChange={this.updateCountry}/>
          <button onClick={this.handleClick}>Add Place</button>
        </form>
      </div>
    )
  },
  updateCity: function(event){
    this.setState({inputCity: event.target.value})
    
    },
  updateCountry: function(event){
  	this.setState({inputCountry: event.target.value})
 	}

})




ReactDOM.render(
	<MainComponent/>, document.getElementById('container')

	)
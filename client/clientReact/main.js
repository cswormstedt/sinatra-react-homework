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
        state.data = data.body;
        self.setState(state)
      })
  },

  createItem: function(item){
    var state = this.state;
    var self = this;
    request.post('http://localhost:9393/places')
      .send("city=" + item, "country" + item)
      .end(function(err, data){
        console.log(data);
      })
  },

	render: function(){
		return(
			<div>
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
    this.props.onItemSubmit(this.state.inputCity)
    this.props.onItemSubmit(this.state.inputCountry)

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
  updateValue: function(event){
    this.setState({inputCity: event.target.value})
    this.setState({inputCountry: event.target.value})
  }
})




ReactDOM.render(
	<MainComponent/>, document.getElementById('container')
	)
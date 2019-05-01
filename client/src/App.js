import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ResultsTable from './components/ResultsTable'
import Search from './components/Search'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      results: [],
      query: ''
    }
  }

  getTopIndexes(query) {
    axios.get(`invertedindex/${query}`)
      .then(res => {
        this.setState({ results: res.data })
      })
  }

  onSearchChange = (event) =>
  {
      let queryValue = event.target.value
      queryValue = queryValue.toLowerCase()
      this.setState({query: queryValue})
  }

  handleQuery = () => {
      if(this.state.query.length > 0) {
        this.getTopIndexes(this.state.query)
      }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Wikipedia Inverted Indexes"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            showMenuIconButton = {false}
          />
          <Search search={this.handleQuery} onChange={this.onSearchChange}/>
          <ResultsTable results={this.state.results}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

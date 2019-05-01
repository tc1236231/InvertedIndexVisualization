import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';


class Search extends React.Component {
    render()
    {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={false}>
                  <TextField
                    floatingLabelText="Keywords to lookup"
                    onChange={this.props.onChange}
                  >
                  </TextField>
                  <Button onClick={this.props.search} backgroundColor="primary" hoverColor="primary">
                      Search
                  </Button>
                </ToolbarGroup>
            </Toolbar>
          )
    }
}

export default Search;
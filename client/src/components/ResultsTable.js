import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

class ResultsTable extends React.PureComponent {
  render() {
    var items = <TableRow key={0}/>
    if (this.props.results) {
      let indexes = [];
      let duplicate_indexes = [];
      let results_length = 0;
  
      this.props.results.forEach(actual_results => {
        results_length = actual_results.length;
        actual_results.forEach(element => {
          let index_result = element.IndexResult;
          let temp_indexes = index_result.slice(1).slice(0,index_result.length - 2).split(',');
          let processed_index = [];
          temp_indexes.forEach(match_index => {
              let temp_str_arr = match_index.trim().split('=', 2);
              if(temp_str_arr.length != 2)
                return;
              let page_name = temp_str_arr[0];
              let word_count = Number(temp_str_arr[1])
              if(page_name.charAt(0) == "_")
                page_name = page_name.slice(1)
              if(processed_index.find(x => x == page_name))
                return;
              processed_index.push(page_name)
              let url = "https://en.wikipedia.org/wiki/" + page_name;
              let existing_index = indexes.find(x => x.Title == page_name)
              if(existing_index)
              {
                existing_index.Count += word_count
                existing_index.CountStr += " " + element.KeyWord + ":" + String(word_count)
                duplicate_indexes.push(page_name)
              }
              else
              {
                indexes.push({Title : page_name, Count: word_count, CountStr: element.KeyWord + ":" + String(word_count),  Url: url})
              }
          });
        })
      });
  
      if(results_length > 1)
      {
        indexes = indexes.filter(x => duplicate_indexes.indexOf(x.Title) >= 0)
      }
  
      indexes = indexes.sort((a,b) => b.Count - a.Count);
      indexes = indexes.slice(0, 10)
  
      items = indexes.map((item) => {
        return (
          <TableRow key={item.Title}>
            <TableRowColumn>
              <FlatButton 
                label={item.Title} 
                labelStyle={{textTransform: 'inherit'}}
                href={item.Url}
                target = "_blank"
              />
            </TableRowColumn>
            <TableRowColumn>{item.CountStr}</TableRowColumn>
          </TableRow>
        )
      })
    }

    return (
      <Table>
      <TableHeader
      displaySelectAll = {false}
      adjustForCheckbox = {false}
      >
        <TableRow>
          <TableHeaderColumn>Page Name</TableHeaderColumn>
          <TableHeaderColumn>Word Count</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
      displayRowCheckbox = {false}
      >
        {items}
      </TableBody>
    </Table>
    )
  }
}

export default ResultsTable;
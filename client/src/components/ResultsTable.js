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
    var t0 = performance.now();

    var items = <TableRow key={0}/>
    let total_results = -1;
    if (this.props.results) {
      total_results = 0;
      let indexes = new Map();
      let duplicate_indexes = [];
      let results_length = 0;
  
      this.props.results.forEach(actual_results => {
        results_length = actual_results.length;
        actual_results.forEach(element => {
          let index_result = element.IndexResult;
          let temp_indexes = index_result.slice(1).slice(0,index_result.length - 2).split(',');
          let processed_index = new Map();
          temp_indexes.forEach(match_index => {
              let temp_str_arr = match_index.trim().split('=', 2);
              if(temp_str_arr.length != 2)
                return;
              let page_name = temp_str_arr[0];
              let word_count = Number(temp_str_arr[1])
              if(page_name.charAt(0) == "_")
                page_name = page_name.slice(1)
              if(processed_index.has(page_name))
                return;
              let url = "https://en.wikipedia.org/wiki/" + page_name;
              let existing_index = indexes.get(page_name)
              if(existing_index)
              {
                existing_index.Count = word_count + existing_index.Count
                existing_index.CountStr += " " + element.KeyWord + ":" + String(word_count)
                duplicate_indexes.push(page_name)
              }
              else
              {
                let ele = {Title : page_name, Count: word_count, CountStr: element.KeyWord + ":" + String(word_count),  Url: url}
                indexes.set(page_name,ele)
                processed_index.set(page_name, ele)
              }
          });
        })
      });

      indexes = Array.from(indexes.values())
      total_results = indexes.length
      if(results_length > 1)
      {
        indexes = indexes.filter(x => duplicate_indexes.includes(x.Title));
      }
      
      indexes = indexes.sort(function(a, b) {
        return b.Count - a.Count;
      });
      indexes = indexes.slice(0, 20)
  
      items = indexes.map((item) => {
        return (
          <TableRow key={item.Title}>
            <TableRowColumn>
              <FlatButton 
                label={item.Title.replace(/_/g,' ')} 
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

    var t1 = performance.now();

    if(total_results > 0 )
    {
      return (
        <React.Fragment>
          <div style={{margin: '1em auto', width: '33em'}}>
            Total Articles { total_results }, Query Time {t1-t0+this.props.timing}ms
          </div>
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
        </React.Fragment>
      )
    }
    else
    {
      return (
        <React.Fragment>
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
        </React.Fragment>
      )
    }
  }
}

export default ResultsTable;
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';

import '../index.css';
import './Landing.css';

export default function Landing() {
  return (
    <content>
      <div id="searchFunctionality">
        <TextField className="TextFieldStyle" label="Search" variant="outlined" />
        <Button className="ButtonStyle">
          Filter
          <FilterListIcon className="icon"/>
        </Button>
        <Button className="ButtonStyle">
          Sort By
          <SortIcon className="icon"/>
        </Button>
      </div>
    </content>
  );
}

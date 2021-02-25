import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';

import '../index.css';
import './Landing.css';
import SkinCard from '../components/SkinCard';

function handleSearch(e) {
  console.log(e.target.value)
}

export default function Landing() {
  return (
    <div>
      <div id="searchFunctionality">
        <TextField className="TextFieldStyle" label="Search" variant="outlined" onChange={handleSearch} />
        <Button className="ButtonStyle">
          Filter
          <FilterListIcon className="icon"/>
        </Button>
        <Button className="ButtonStyle">
          Sort By
          <SortIcon className="icon"/>
        </Button>
      </div>
      <div id="skinsDisplay">
        {[1,2,3,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5].map((_, idx) =>
          <Link key={`link-${idx}`} to={`/skin/${idx}`}>
            <SkinCard />
          </Link>
        )}
      </div>
    </div>
  );
}

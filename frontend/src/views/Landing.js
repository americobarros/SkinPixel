import React, { useState } from 'react';

import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import '../index.css';
import './Landing.css';

import SkinCard from '../components/SkinCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    color: 'grey',
    boxShadow: 'none',
    border: '1px solid gainsboro'
  },
  tabs: {
    "& .Mui-selected": {
      color: "black",
    },
    "& .MuiTab-labelIcon": {
      minHeight: '0px',
      padding: '15px',
      margin: '10px 0px'
    },
    "& .MuiTouchRipple-root": {
      color: 'green',
    },
    "& .MuiTabs-centered": {
      justifyContent: 'space-around',
    }
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Landing(props) {
  const { allSkins } = props;
  
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleSearch(e) {
    console.log(e.target.value)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <AppBar position="static" className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          className={classes.tabs}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#5b8731',
            }
          }}
        >
          <Tab label="Skins" />
          <Tab label="Resource Packs" />
          <Tab label="Maps" />
        </Tabs>
        </AppBar>
      <TabPanel className="pb-3 pl-3" value={value} index={0}>
        <div id="skinsDisplay">
            {allSkins.map(skin =>
              <Link key={`link-${skin.id}`} to={`/skin/${skin.id}`}>
                <SkinCard skin={skin} />
              </Link>
            )}
          </div>
      </TabPanel>
    </div>
  );
}

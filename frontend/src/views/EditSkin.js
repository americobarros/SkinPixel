import { Link, useParams } from "react-router-dom";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

import './EditSkin.css';

export default function ViewSkin() {
  let { skinId } = useParams();

  return (
    <div style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex' }}>
        <Link to="/" style={{ color: 'black', alignSelf: 'center' }}>
          <ArrowBackIcon className="backIcon" />
        </Link>
        <h2>hannah_minecraft_version</h2>
        <h2 style={{ display: 'none' }}>{skinId}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView" />
        <div className="rightItems">
          <div id="colorPicker" />
          <Button className="ButtonStyle" variant="outlined">Save</Button>
          <Button className="ButtonStyle" variant="outlined">Delete</Button>
        </div>
      </div>
      <div id="twoDViews" />
    </div>
  );
}
  
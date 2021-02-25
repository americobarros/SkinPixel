import { Link, useParams } from "react-router-dom";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

import './ViewSkin.css';

export default function ViewSkin() {
  let { skinId } = useParams();

  return (
    <div style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex' }}>
        <Link to="/" style={{ color: 'black', alignSelf: 'center' }}>
          <ArrowBackIcon className="backIcon" />
        </Link>
        <h2>xX_terminator_Xx</h2>
        <h2 style={{ display: 'none' }}>{skinId}</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div id="threeDView" />
        <div id="userInfo" />
      </div>
      <div style={{ display: 'flex' }}>
        <div id="comment" />
        <Button className="CommentButton" variant="outlined">Save</Button>
      </div>
      <div id="twoDViews" />
    </div>
  );
}
  
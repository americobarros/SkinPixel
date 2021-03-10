import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { SwatchesPicker } from 'react-color';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

import './EditSkin.css';

export default function ViewSkin(props) {
  const { allSkins } = props;
  let { skinId } = useParams();

  const skin = allSkins.find(skin => skin.id == skinId);

  const [color, setColor] = useState(null);
  const [rerender, setRerender] = useState(false);

  function handleChangeComplete(color, event) {
    setColor(color.hex.toString());
  };

  function setSkinColor(outer_index, inner_index) {
    if (color) {
      skin.skin2D[outer_index][inner_index] = color;
    }
    setRerender(!rerender);
  }

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
        <div id="threeDView">
          {skin.skin2D.map((row, outer_idx) =>
            <div style={{ display: 'flex' }}>
              {row.map((color, inner_idx) => (
                <div>
                  <div className="cube" onClick={() => setSkinColor(outer_idx, inner_idx)} style={{ backgroundColor: color }} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rightItems">
            <SwatchesPicker height="600px" onChangeComplete={handleChangeComplete}/>
          <Button className="ButtonStyle" variant="outlined">Save</Button>
          <Button className="ButtonStyle" variant="outlined">Delete</Button>
        </div>
      </div>
      <div id="twoDViews" />
    </div>
  );
}
  
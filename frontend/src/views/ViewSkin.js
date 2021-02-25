import {
  useParams
} from "react-router-dom";

export default function ViewSkin() {
  let { skinId } = useParams();
  return (
    <div>
      <h3>Requested to view skin with ID: {skinId}</h3>
    </div>
  );
}
  
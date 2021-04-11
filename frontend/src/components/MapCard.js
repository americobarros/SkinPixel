import './MapCard.css';

export default function MapCard(props) {
    const { map } = props;

    return (
        <div className="CardStyle">
            <div className="cardContainer">
                <img src={map.image} alt={map.name} className="skinImage" />
            </div>
            <div className="cardInfo">
                <div className="skinName">
                    {map.name}
                </div>
                <div>
                    @{map.user.name}
                </div>
            </div>
        </div>
    );
}
  
import './SkinCard.css';

export default function SkinCard(props) {
    const { skin } = props;

    return (
        <div className="CardStyle">
            <div className="cardContainer">
                <img src={skin.image} alt={skin.name} className="skinImage" />
            </div>
            <div className="cardInfo">
                <div className="skinName">
                    {skin.name}
                </div>
                <div>
                    @{skin.username}
                </div>
            </div>
        </div>
    );
}
  
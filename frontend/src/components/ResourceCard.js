import './SkinCard.css';

export default function ResourceCard(props) {
    const { resource } = props;

    return (
        <div className="CardStyle">
            <div className="cardContainer">
                <img src={resource.image} alt={resource.name} className="skinImage" />
            </div>
            <div className="cardInfo">
                <div className="skinName">
                    {resource.name}
                </div>
                <div>
                    {resource.user.name}
                </div>
            </div>
        </div>
    );
}
  
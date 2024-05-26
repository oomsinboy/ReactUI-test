import React, { useState } from 'react';
import './Card.css';

function Card({ card }) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    const formattedDate = new Date(card.created_at).toLocaleDateString('en-US', options);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const cardClassName = card.id % 2 === 0 ? "card even" : "card";
    const cardClassNameHead = card.id % 2 === 0 ? "card-header even" : "card-header";

    return (
        <div className={cardClassName}>
            <div className={cardClassNameHead}>
                <img src={card.avatar_url} alt={card.author} className="avatar" />
                <div className="card-center">
                    <span className="colorname">{card.author} </span> <span>posted on {formattedDate}</span>
                </div>
            </div>
            <hr className="divider" />
            <div className="card-body">
                <img src={card.image_url} alt={card.title} className="card-image" onClick={toggleModal} />
                <div className="card-content">
                    <h2>{card.title}</h2>
                    <p>{card.body}</p>
                </div>
            </div>
            {showModal && (
                <div className="modal" onClick={toggleModal}>
                    <div className="modal-content">
                        <img src={card.image_url} alt={card.title} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card;

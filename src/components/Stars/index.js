import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

class Stars extends Component {
    setStars = () => {
        let rating = this.props.rating - 0.5;
        let stars = [];

        for(let i = 0; i < rating; i++)
            stars.push(<FontAwesomeIcon icon={fas.faStar} key={stars.length} />);

        if((rating + 0.5) % 1 === 0.5)
            stars.push(<FontAwesomeIcon icon={fas.faStarHalfAlt} key={stars.length} />);

        while(stars.length < 5)
            stars.push(<FontAwesomeIcon icon={far.faStar} key={stars.length} />);

        return stars;
    }

    render() {
        return (
            <div className="stars">
                {this.setStars()}
            </div>
        );
    }
}

Stars.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default Stars;

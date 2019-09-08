import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Stars from '../Stars';

class Product extends Component {
    render() {
        return (
            <div className="col-12 col-sm-6 col-md-4 product">
                <article>
                    <div className="name" dangerouslySetInnerHTML={{ __html: this.props.product._highlightResult.name.value }} />
                    <div className="brand" dangerouslySetInnerHTML={{ __html: this.props.product._highlightResult.brand.value }} />
                    <div className="productImg">
                        <img src={this.props.product.image} alt={this.props.product.name} title={this.props.product.name} />
                    </div>
                    <div className="description">{this.props.product.description}</div>
                    {this.props.product.free_shipping && <div className="freeShipping">Free shipping</div>}
                    <div className="price">{this.props.product.price}€</div>
                    <Stars rating={this.props.product.rating / 2} />
                    <a href={this.props.product.url} target="new" className="btn">Buy</a>
                </article>
            </div>
        );
    }
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Product;

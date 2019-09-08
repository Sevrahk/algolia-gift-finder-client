import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { connect } from 'react-redux';
import { updateFilter, updateProducts } from '../../redux/actions';
import requestHelper from '../../helpers/requestHelper';
import ClassNames from 'classnames';

function mapDispatchToProps(dispatch) {
    return {
        updateFilter: (payload) => dispatch(updateFilter(payload)),
        updateProducts: (data) => dispatch(updateProducts(data)),
    }
}

const mapStateToProps = state => {
    return {
        search: state.catalog.search,
        currentPage: state.catalog.currentPage,
        filters: state.catalog.filters,
    };
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceMin: '',
            priceMax: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleFreeShipping = this.toggleFreeShipping.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps)
            requestHelper(this.props.search, this.props.currentPage, this.props.filters, this.props.updateProducts);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.props.updateFilter({[name]: value});
    }

    toggleFreeShipping() {
        this.props.updateFilter({free_shipping: !this.props.filters.free_shipping});
    }

    render() {
        return (
            <div className={ClassNames({sidebar: true, sidebarCollapsed: this.props.sidebarCollapsed, sidebarSmallVisible: this.props.sidebarSmallVisible})}>
                <h6>Shipping</h6>
                <label><input type="checkbox" checked={this.props.filters.free_shipping ? 'checked' : ''} onChange={this.toggleFreeShipping} /> Free shipping</label>
                <h6>Price</h6>
                <label className="price">From <input type="number" name="priceMin" value={this.props.filters.priceMin} onChange={this.handleChange} /></label>
                <label className="price">to <input type="number" name="priceMax" value={this.props.filters.priceMax} onChange={this.handleChange} /></label>
            </div>
        );
    }
}

Sidebar.propTypes = {
    search: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    filters: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateProducts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

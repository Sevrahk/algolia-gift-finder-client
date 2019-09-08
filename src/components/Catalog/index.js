import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Product from '../Product';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
import { connect } from 'react-redux';
import { updateCurrentPage, updateProducts } from '../../redux/actions';
import requestHelper from '../../helpers/requestHelper';
import ClassNames from 'classnames';

function mapDispatchToProps(dispatch) {
    return {
        updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
        updateProducts: (data) => dispatch(updateProducts(data)),
    }
}

const mapStateToProps = state => {
    return {
        search: state.catalog.search,
        products: state.catalog.products,
        nbProducts: state.catalog.nbProducts,
        currentPage: state.catalog.currentPage,
        filters: state.catalog.filters,
    };
};

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        requestHelper(this.props.search, this.props.currentPage, this.props.filters, this.props.updateProducts);
    }

    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search || this.props.currentPage !== prevProps.currentPage || this.props.filters !== prevProps.filters)
            requestHelper(this.props.search, this.props.currentPage, this.props.filters, this.props.updateProducts);
    }

    handlePageChange(page) {
        this.props.updateCurrentPage(page);
    }

    render() {
        return (
            <div className={ClassNames({catalog: true, sidebarCollapsed: this.props.sidebarCollapsed})}>
                <div className="container-fluid">
                    <div className="row">
                        {
                            this.props.products.map((product, index) => {
                                return <Product key={index} product={product} />;
                            })
                        }
                    </div>
                    <div className="row">
                        <div className="col-12 pagination">
                            <Pagination onChange={this.handlePageChange} current={this.props.currentPage} defaultPageSize={12} total={this.props.nbProducts} locale={localeInfo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Catalog.propTypes = {
    search: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    nbProducts: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    filters: PropTypes.object.isRequired,
    updateCurrentPage: PropTypes.func.isRequired,
    updateProducts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { connect } from 'react-redux';
import { updateSearch, updateProducts } from '../../redux/actions';
import requestHelper from '../../helpers/requestHelper';
import ClassNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

function mapDispatchToProps(dispatch) {
    return {
        updateSearch: (search) => dispatch(updateSearch(search)),
        updateProducts: (data) => dispatch(updateProducts(data)),
    }
}

const mapStateToProps = state => {
    return {
        search: state.catalog.search,
        currentPage: state.catalog.currentPage,
        nbProducts: state.catalog.nbProducts,
        spellFix: state.catalog.spellFix,
        filters: state.catalog.filters,
    };
};

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fixSearchValue = this.fixSearchValue.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps)
            requestHelper(this.props.search, this.props.currentPage, this.props.filters, this.props.updateProducts);
    }

    onFocus() {
        this.setState({
            active: true
        });
    }

    onBlur() {
        this.setState({
            active: false
        });
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;

        this.props.updateSearch(value);
    }

    fixSearchValue() {
        this.props.updateSearch(this.props.spellFix);
    }

    clearSearch() {
        this.props.updateSearch('');
    }

    render() {
        return (
            <div className={ClassNames({searchBar: true, sidebarCollapsed: this.props.sidebarCollapsed, active: this.state.active})}>
                <div className="inputContainer">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" name="search" value={this.props.search} onChange={this.handleChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                    <FontAwesomeIcon icon={faTimes} className={ClassNames({'d-none': this.props.search.length === 0})} onClick={this.clearSearch} />
                    {this.props.spellFix &&
                        <div className="spellFix">Did you mean: <span onClick={this.fixSearchValue}>{this.props.spellFix}</span>?</div>
                    }
                    <div className="nbProducts">{ this.props.nbProducts } result{ this.props.nbProducts > 1 ? 's' : '' } found</div>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    search: PropTypes.string.isRequired,
    nbProducts: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    spellFix: PropTypes.string,
    filters: PropTypes.object.isRequired,
    updateSearch: PropTypes.func.isRequired,
    updateProducts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

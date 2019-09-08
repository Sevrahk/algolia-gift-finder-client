import React, { Component } from 'react';
import './index.scss';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import Catalog from '../../components/Catalog';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = state => {
    return {
        blocks: state.blocks,
    };
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarSmallVisible: false,
            sidebarCollapsed: false,
        };

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.hideSidebarOnMobile = this.hideSidebarOnMobile.bind(this);
    }

    toggleSidebar() {
        let varName = window.innerWidth > 767 ? 'sidebarCollapsed' : 'sidebarSmallVisible';

        this.setState({
            [varName]: !this.state[varName],
        });
    }

    hideSidebarOnMobile() {
        if(window.innerWidth > 767)
            return;

        this.setState({
            sidebarSmallVisible: false,
        });
    }

    render() {
        return (
            <div>
                <header>
                    <div className="leftGroup">
                        <div className="sidebarBtn" onClick={this.toggleSidebar}><FontAwesomeIcon icon={faBars} size="lg" /></div>
                    </div>
                    <h1>Gift finder</h1>
                </header>
                <Sidebar
                    sidebarCollapsed={this.state.sidebarCollapsed}
                    sidebarSmallVisible={this.state.sidebarSmallVisible}
                />
                <SearchBar sidebarCollapsed={this.state.sidebarCollapsed} />
                <Catalog sidebarCollapsed={this.state.sidebarCollapsed} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);

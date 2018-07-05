import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Body/Sidebar'
import {linkProvider, fetchProviders} from '../../actions/providers'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class Provider extends Component {

  componentDidMount(){
    this.props.fetchProviders();
  }

  render() {
    let providers = (this.props.providers || []).map((p) => this.renderProvider(p));
    return (
      <div className='content-wrapper'>
        <Header isAuthenticated={false} authUser={null} logoutUser={() => {}} />
        <div className='dashboard-body'>
          <Sidebar />
          <div className='dashboard-content'>
            {providers}
          </div>
        </div>
      </div>
    );
  }
  renderProvider(p){
    return(
      <div>
        <a onClick={() => this.props.linkProvider(p.id, this.props.currentProfile.id)}> {p.name} </a>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        providers: state.providers,
        currentProfile: state.profiles.currentProfile
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({linkProvider,fetchProviders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Provider)

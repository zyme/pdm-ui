import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Summary extends Component {
  render() {
    const { patient, profile } = this.props;
    let patientName, patientAge, patientDOB, patientAddress;

    if (Object.keys(patient).length > 0) {
      patientName = `${patient.name[0].given[0]} ${patient.name[0].family}`;
      patientAge = moment().diff(profile.dob, 'years');
      patientDOB = `${moment(profile.dob).format('MMM D, YYYY')} (age ${patientAge})`;
      patientAddress = `${profile.street}, ${profile.city}, ${profile.state} ${profile.zip}`;
    }

    return (
      <div className="summary">
        <div className="summary__image">
          <img src="/assets/images/patient-image.png" alt="patient" />
        </div>

        <div className="summary__divider" />

        <div className="summary__table">
          <div className="summary__table-row">
            <div className="summary__table-key">Name</div>
            <div className="summary__table-value">{patientName}</div>
          </div>

          <div className="summary__table-row">
            <div className="summary__table-key">Gender</div>
            <div className="summary__table-value">{profile.gender}</div>
          </div>

          <div className="summary__table-row">
            <div className="summary__table-key">DOB</div>
            <div className="summary__table-value">{patientDOB}</div>
          </div>

          <div className="summary__table-row">
            <div className="summary__table-key">Address</div>
            <div className="summary__table-value">{patientAddress}</div>
          </div>

          <div className="summary__table-row">
            <div className="summary__table-key">Phone</div>
            <div className="summary__table-value">{profile.telephone}</div>
          </div>

          <div className="summary__table-row">
            <div className="summary__table-key">PCP</div>
            <div className="summary__table-value summary__table-pcp">Dr. Parul Desai</div> {/* TODO: hook up */}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profiles.activeProfile
  };
}

Summary.propTypes = {
  patient: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

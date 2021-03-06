import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import isValid from '../../../utils/isValid';

export default class CustomGraphTooltip extends Component {
  render() {
    const { title, unit, active, payload } = this.props;
    const details = payload.length > 0 ? payload[0].payload : null;

    if (active && isValid(details)) {
      const displayDate = moment(details.date).format('MMM D, YYYY');
      return (
        <div className="custom-graph-tooltip">
          <div className="custom-graph-tooltip__field">
            <b>Date:</b> {displayDate}
          </div>

          <div className="custom-graph-tooltip__field">
            <b>{title}:</b> {_.round(details.value, 2)} {unit}
          </div>
        </div>
      );
    }

    return null;
  }
}

CustomGraphTooltip.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  payload: PropTypes.array,
  active: PropTypes.bool
};

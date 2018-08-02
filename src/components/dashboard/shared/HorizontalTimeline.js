import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline/lib';
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import { groupProps, itemProps, legendProps, rangeProps } from '../../../prop-types/horizontalTimelineProps';

export default class HorizontalTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTimeStart: null,
      visibleTimeEnd: null,
      activeRange: null
    };
  }

  componentWillMount() {
    this.initializeRange();
  }

  initializeRange() {
    const { rangeItems, defaultRange } = this.props;
    if (!rangeItems) return;
    const rangeItem = rangeItems.filter((item) => item.rangeText === defaultRange)[0];
    if (!rangeItem) return;
    this.handleChangeTimeRange(defaultRange, rangeItem.rangeNum, rangeItem.rangeType, rangeItem.rangeFutureType);
  }

  handleShowAll() {
    const { items } = this.props;
    if (items.length === 0) this.handleChangeTimeRange('1yr');
    const allStartTimes = items.map((item) => item.start_time);
    const minStartTime = Math.min(...allStartTimes);
    const maxStartTime = Math.max(...allStartTimes);

    this.setState({
      visibleTimeStart: moment(minStartTime).add(-1, 'year').valueOf(),
      visibleTimeEnd: moment(maxStartTime).add(1, 'year').valueOf(),
      activeRange: 'all'
    });
  }

  handleChangeTimeRange = (rangeText) => {
    if (rangeText === 'all') {
      this.handleShowAll();
      return;
    }

    const item = this.props.rangeItems.filter((item) => item.rangeText === rangeText)[0];

    this.setState({
      visibleTimeStart: moment().add(-item.rangeNum, item.rangeType).valueOf(),
      visibleTimeEnd: moment().add(1, item.rangeFutureType).valueOf(),
      activeRange: item.rangeText
    });
  }

  renderItem = ({ item }) => {
    return <FontAwesomeIcon icon={item.icon} fixedWidth />;
  }

  renderLegendRow = (legendItems, indexCheck) => {
    return (
      <div className="legend-item-row">
        {legendItems.map((item, index) => {
          if (index % 2 === indexCheck) {
            return (
              <div className="legend-item" key={index}>
                <div className="legend-item__icon"><FontAwesomeIcon icon={item.icon} fixedWidth /></div>
                <div className="lengend-item__text">: {item.text}</div>
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  }

  renderLegend = (legendItems) => {
    return (
      <div className="horizontal-timeline__legend">
        {legendItems.length > 0 && this.renderLegendRow(legendItems, 0)}
        {legendItems.length > 1 && this.renderLegendRow(legendItems, 1)}
      </div>
    );
  }

  render() {
    const { groups, items, title, legendItems, rangeItems } = this.props;
    const { visibleTimeStart, visibleTimeEnd, activeRange } = this.state;

    return (
      <div className="horizontal-timeline">
        <div className="horizontal-timeline__header">
          <div className="header-title">{title}</div>

          <div className="header-buttons">
            {rangeItems && rangeItems.map((item, index) => {
              const buttonClass = classNames('timeline-button', { 'active': activeRange === item.rangeText });

              return (
                <button key={index} className={buttonClass} onClick={() => this.handleChangeTimeRange(item.rangeText)}>
                  {item.rangeText}
                </button>
              );
            })}
          </div>
        </div>

        <Timeline
          groups={groups}
          items={items}
          defaultTimeEnd={moment().add(3, 'months')} // TODO: not working
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          itemRenderer={this.renderItem}
          canMove={false}
          canResize={false}
          canSelect={false}
          canChangeGroup={false}
          stickyHeader={false} // TODO: not working
          sidebarWidth={0}
          lineHeight={40}
          resizeDetector={containerResizeDetector}
          minZoom={60 * 60 * 1000 * 24} // 1 day
          maxZoom={150 * 365.24 * 86400 * 1000} // 150 years
        />

        <div className="horizontal-timeline__footer">
          {legendItems && this.renderLegend(legendItems)}
          <div className="footer-text">zoom in or out or choose a button above</div>
        </div>

        <ReactTooltip html={true} />
      </div>
    );
  }
}

HorizontalTimeline.propTypes = {
  title: PropTypes.string,
  groups: PropTypes.arrayOf(groupProps).isRequired,
  items: PropTypes.arrayOf(itemProps).isRequired,
  legendItems: PropTypes.arrayOf(legendProps),
  rangeItems: PropTypes.arrayOf(rangeProps),
  defaultRange: PropTypes.string // a rangeText from rangeItems
};

HorizontalTimeline.defaultProps = {
  defaultRange: '1yr'
};

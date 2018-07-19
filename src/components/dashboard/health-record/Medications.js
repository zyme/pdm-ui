import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';


export class Medications extends Component {
    render() {
        return(
            <div className='health-record__medications'>
                <VerticalList
                    list={this.medications()}
                    listType='medications'
                    dateProperty='date'
                    descriptionProperty='text'/>
            </div>
        );
    }

    medications(){
      return this.props.medications.map(function(m){return {date: m.effectivePeriod.start, text: m.medicationCodeableConcept.text}})
    }
}

export default Medications;

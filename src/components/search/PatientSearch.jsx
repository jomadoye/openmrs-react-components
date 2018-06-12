import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { patientSearchActions } from '../../features/patientSearch';
import PatientSearchForm from './PatientSearchForm';
import DataGrid from "../grid/DataGrid";

class PatientSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
  };

  handleSubmit(values) {
    this.props.dispatch(patientSearchActions.patientSearch(
      values.query,
      this.props.parseResults, // the client could provide a callback function to parse the results returned by the REST API
      this.props.representation));
  };

  onRowSelected(row) {
    this.props.dispatch(patientSearchActions.rowSelected(row));

    // create any custom actions
    if (this.props.rowSelectedActionCreators) {
      this.props.rowSelectedActionCreators.forEach((f) => this.props.dispatch(f(row)));
    }

  }

  render() {
    return (
      <div>
        <PatientSearchForm onSubmit={this.handleSubmit} />
        <DataGrid
          columnDefs={this.props.columnDefs}
          onRowSelected={this.onRowSelected}
          rowData={this.props.rowData}
        />
      </div>
    );
  };
}

PatientSearch.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  parseResults: PropTypes.func,
  representation: PropTypes.string.isRequired,
  rowData: PropTypes.array,
  rowSelectedActionCreators: PropTypes.array
};

PatientSearch.defaultProps = {
  representation: "custom:(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,addresses,attributes))"
};

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    rowData: state.openmrs.patientSearch.results
  };
};

export default connect(mapStateToProps)(PatientSearch);
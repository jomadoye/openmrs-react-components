/* eslint-disable */
import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { startOfDay, format, parse } from 'date-fns';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/css/CustomDatePicker.css'
import '../../../assets/css/widgets.css';
import {DATE_FORMAT} from "../../constants";


const styles = {
  datePickerContainerStyle: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};

class CustomDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: parse(props.defaultDate) || startOfDay(new Date()),
      field: props.field,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { input } = this.props;
    if (typeof input !== 'undefined') {
      const { onChange } = input;
      if (input.value) {
        this.setState({
          selectedDate: parse(input.value)
        })
      } else {
        onChange(format(startOfDay(new Date())));
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { field, input } = nextProps;
    this.setState({
      field,
    });
    if (typeof input !== 'undefined') {
      if (input.value !== this.props.input.value) {
        this.setState({
          selectedDate: parse(input.value)
        });
        input.onChange(format(startOfDay(parse(input.value))));
      } else {
        input.onChange(format(startOfDay(new Date())))
      }
    }
  }

  handleChange(date) {
    const { handleDateChange, input } = this.props;
    const { field } = this.state;
    this.setState({
      selectedDate: date,
    });
    
    if (typeof handleDateChange === 'function') {
      handleDateChange(field, format(startOfDay(date), 'YYYY-MM-DD'));
    } else if (typeof input !== "undefined") {
      const { onChange } = input;
      onChange(format(startOfDay(date)));
    }
  }

  render() {
    const { ...otherProps } = this.props;
    const { input } = otherProps;
    let error;
    let defaultDate;


    const hasInput = typeof input !== 'undefined';
    if (hasInput) {
      const { meta } = otherProps;
      error = meta.error;
    }
    const { selectedDate } = this.state;
    const DateDisplayComponent = ({ onClick, value }) => (
      <span>
      <span style={styles.datePickerContainerStyle}>
        <span className={otherProps.labelClassName}>
          {
            otherProps.label
          }
        </span>
        <FormControl
          placeholder=""
          style={this.props.formControlStyle}
          type="text"
          value={value}
        />
        <FontAwesomeIcon
           icon="calendar-alt"
           onClick={onClick}
           size="2x"
        />
      </span>
      {hasInput &&
        ((error &&
          <span className="field-error">
            {error}
          </span>))
      }
      </span>
    );

    const edit = (
      <DatePicker
        customInput={<DateDisplayComponent />}
        onChange={this.handleChange}
        selected={selectedDate}
        excludeDates={[hasInput]}
      />
    );

    const view = (
      <span className="datepicker-view">{format(parse(otherProps.displayValue), DATE_FORMAT)}</span>
    )

    return (
      <div>
        {!otherProps.mode || otherProps.mode === 'edit' ? edit : view}
      </div>
    );
  }
}

CustomDatePicker.defaultProps = {
  labelClassName: '',
  label: '',
  defaultDate: new Date(),
  field: '',
  formControlStyle: {
    marginRight: '5px',
    width: '100px'
  },
};

CustomDatePicker.propTypes = {
  defaultDate: PropTypes.object,
  formControlStyle: PropTypes.object,
  field: PropTypes.string,
  handleDateChange: PropTypes.func,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default CustomDatePicker;

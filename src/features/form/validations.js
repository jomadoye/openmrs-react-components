
const minValue = min => value => 
  value && value < min ? `Must be at least ${min}` : undefined;

const maxValue = max => value =>
  value && value > max ? `Must be less than ${max + 1}` : undefined ;

const abnormalMaxValue = max => value =>
  value && value > max ? `Abnormal value` : undefined ;

const abnormalMinValue = min => value => (value && value < min ? `Abnormal value` : undefined);

const criticalMaxValue = max => value =>
  value && value > max ? `Critical value` : undefined ;

const criticalMinValue = min => value => (value && value < min ? `Critical value` : undefined);

const dateToInt = dateStr => new Date(dateStr).getTime();

const maxDateValue = maxDate => value =>
  value && (dateToInt(value)) > dateToInt(maxDate) ? `Date should be earlier or equal to today's date` : undefined;

export default {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
  criticalMinValue,
  criticalMaxValue,
  maxDateValue,
};

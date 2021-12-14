import PropTypes from 'prop-types';

const SingleSelect = ({ onChange, value, className, name, disabled, data }) => (
  <select
    className={className}
    value={value.id}
    name={name}
    onChange={onChange}
    disabled={disabled}
  >
    {data.map(input => (
      <option key={input.id} value={input.id}>{input.name}</option>
    ))}
  </select>
)

SingleSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  data: PropTypes.array
}

export default SingleSelect;


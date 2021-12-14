import PropTypes from 'prop-types';

const InputTextField = ({ onChange, value, className, name, disabled, type = 'inputText' }) => (
  type === 'inputText'
    ? <input
      type='text'
      className={className}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
    />
    : <textarea
      className={className}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
    ></textarea>
)

InputTextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string
}

export default InputTextField;


import PropTypes from 'prop-types';

const UneditableMultiSelect = ({ id, className, name, data }) => (
  <div
    id={id}
    className={className}
    name={name}>
    {data.map((symptom, index) => (
      <div key={index} className="tile">{symptom.name}</div>
    ))}
  </div>
)

UneditableMultiSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.array
}

export default UneditableMultiSelect;


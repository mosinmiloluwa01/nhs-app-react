import PropTypes from 'prop-types';
// import './EditableMultiSelect.css';

const EditableMultiSelect = ({ onClick, id, name, userData, symptomsArray, symptomsIdArray }) => (
  <div id={id} className='multiple-select' name={name}>
    {symptomsArray.map((symptom, index) => (
      <div key={index} className={symptomsIdArray.includes(symptom.id) ? "multiple-select-item active-bg" : "multiple-select-item"} >
        <p id={`symptom-${symptom.id}`} onClick={onClick} style={{ marginBottom: '0rem', width: '100%' }}>{symptom.name}</p>
        {symptomsIdArray.includes(symptom.id) ? <i className="far fa-check-circle circle-icon"></i> : <p></p>}
      </div>
    ))}
  </div>
)

EditableMultiSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  userData: PropTypes.array,
  symptomsArray: PropTypes.array,
}

export default EditableMultiSelect;


import { useState, useEffect } from "react";

import '../../../assets/css/index.css';
import './Home.css';

import Header from "../../reusables/Header/Header";
import InputTextField from "../../reusables/InputTextField/InputTextField";
import SingleSelect from "../../reusables/SingleSelect/SingleSelect";
import EditableMultiSelect from "../../reusables/EditableMultiSelect/EditableMultiSelect";
import UneditableMultiSelect from "../../reusables/UneditableMultiSelect/UneditableMultiSelect";

const Home = ({ user, genderData, symptomsData, isEditMode, isProcessing }) => {
  let data = {
    user,
    genderData,
    symptomsData,
    isEditMode,
    isProcessing,
    showDropdown: false
  }
  let errorData = {
    firstName: '',
    lastName: '',
    gender: '',
    symptoms: '',
    medicalHistory: '',
  }
  const [stateData, setStateData] = useState(data)
  const [formData, setFormData] = useState(user)
  const [formErrors, setFormErrors] = useState(errorData)
  let tempArray = []
  stateData.user.symptoms.map(symptom => { tempArray.push(symptom.id) })
  let [symptomsIdArray, setSymptomsIdArray] = useState(tempArray)

  useEffect(() => {
    console.log('formData>>>', formData)
    console.log('user>>>', user)
    console.log('symptomsIdArray>>>', symptomsIdArray)
  })

  const handleChange = ({ target }) => {
    if (target.name === 'firstName' || target.name === 'lastName' || target.name === 'extra') {
      setFormData({ ...formData, [target.name]: target.value })
    }
  };

  const handleSelectChange = ({ target }) => {
    let newSelection = stateData.genderData.find(gender => gender.id === parseInt(target.value))
    setFormData({ ...formData, gender: newSelection })
  };

  const multipleSelectClick = (e) => {
    let newId = e.target.id.split('-')
    let parsedId = parseInt(newId[1])
    console.log('data before', e.target.id, parsedId, formData)
    let newSymptoms = []
    if (symptomsIdArray.includes(parsedId)) {
      newSymptoms = formData.symptoms.filter(symptom => symptom.id !== parsedId)
      formData.symptoms = newSymptoms
      setFormData({ ...formData })
      let newArray = []
      newSymptoms.map(symptom => newArray.push(symptom.id))
      setSymptomsIdArray([...newArray])
    }
    if (!symptomsIdArray.includes(parsedId)) {
      setSymptomsIdArray([...symptomsIdArray, parsedId])
      let addition = symptomsData.find(symptom => symptom.id === parsedId)
      formData.symptoms.push(addition)
      setFormData({ ...formData })
    }
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const submit = () => {
    console.log('formData to be submitted>>>', formData)
    stateData.user.symptoms = formData.symptoms
    stateData.user.gender = formData.gender
    stateData.user.extra = formData.extra
    stateData.isEditMode = false
    setStateData({ ...stateData })
  }

  return (
    <div className='home-container'>
      <Header />
      <div className='home-inner-container'>
        <div className='home-card shadow-sm'>
          <div className="content-view" id="user-content">
            <div className="content-top-title-container">
              <p className="content-top-title">Document Details</p>
              <div className="icon-container">
                <i onClick={() => setStateData({ ...stateData, showDropdown: true })} id="showEditOption" className="fas fa-bars"></i>
                <div style={stateData.showDropdown ? { visibility: 'visible' } : { visibility: 'hidden' }} className="dropdown-menu shadow-sm">
                  <p onClick={() => setStateData({ ...stateData, isEditMode: true, showDropdown: false })} id="editActive" className="dropdown-menu-item">Edit</p>
                </div>
              </div>
            </div>

            <div className='form-container'>
              <div className='form-inner-container'>
                <div className="form-row">
                  <div className="form-col">
                    <label>First Name</label>
                  </div>
                  <div className="form-col">
                    <InputTextField
                      name='firstName'
                      className='form-field form-field-bordered'
                      value={formData.firstName}
                      disabled={stateData.isEditMode ? false : true}
                      onChange={handleChange}
                    />
                    <small style={!formData.firstName ? { display: 'block' } : { display: 'none' }} className='error'>{!formData.firstName ? 'First name is required' : ''}</small>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label>Last Name</label>
                  </div>
                  <div className="form-col">
                    <InputTextField
                      name='lastName'
                      className='form-field form-field-bordered'
                      value={formData.lastName}
                      disabled={stateData.isEditMode ? false : true}
                      onChange={handleChange}
                    />
                    <small style={!formData.lastName ? { display: 'block' } : { display: 'none' }} className='error'>{!formData.lastName ? 'Last name is required' : ''}</small>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label>Gender</label>
                  </div>
                  <div className="form-col">
                    <SingleSelect
                      name='gender'
                      className='form-field form-field-bordered'
                      value={formData.gender}
                      disabled={stateData.isEditMode ? false : true}
                      data={genderData}
                      onChange={handleSelectChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label>Symptoms</label>
                  </div>
                  <div className="form-col">
                    {stateData.isEditMode ? <EditableMultiSelect
                      id="editable-multi-select"
                      onClick={multipleSelectClick}
                      name="editable-multi-select"
                      userData={stateData.user.symptoms}
                      symptomsArray={symptomsData}
                      symptomsIdArray={symptomsIdArray}
                    />
                      : <UneditableMultiSelect
                        id='uneditable-multi-select'
                        className="tile-col"
                        name='uneditable-multi-select'
                        data={stateData.user.symptoms}
                      />
                    }
                    <small style={formData.symptoms.length === 0 ? { display: 'block' } : { display: 'none' }} className='error'>{formData.symptoms.length === 0 ? 'Symptoms are required' : ''}</small>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label>Medical History</label>
                  </div>
                  <div className="form-col">
                    <InputTextField
                      name='extra'
                      className='form-field form-field-bordered'
                      value={capitalizeFirstLetter(formData.extra)}
                      disabled={stateData.isEditMode ? false : true}
                      onChange={handleChange}
                      type="textArea"
                    />
                    <small style={!formData.extra ? { display: 'block' } : { display: 'none' }} className='error'>{!formData.extra ? 'Medical history is required' : ''}</small>
                  </div>
                </div>
                {stateData.isEditMode ? <div id="button-row" className="button-row">
                  <button onClick={submit} id="clickButton" style={!isProcessing ? { visibility: 'visible' } : { visibility: 'hidden' }}
                    disabled={!formData.firstName || !formData.lastName
                      || formData.symptoms.length === 0 || !formData.extra} className="primary-color-btn">Submit</button>
                  <button id="processButton" style={isProcessing ? { visibility: 'visible' } : { visibility: 'hidden' }} className="primary-color-btn" disabled>Processing...</button>
                </div> : <div></div>}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

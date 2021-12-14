import { Fragment, React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/pages/Home/Home";

function App() {
  let genderData = [{ id: 1, name: "male" }, { id: 2, name: "female" }]
  let symptomsData = [{
    id: 1,
    name: "headache"
  },
  {
    id: 2,
    name: "nausea"
  },
  {
    id: 3,
    name: "fatigue"
  },
  {
    id: 4,
    name: "body pain"
  },
  ]
  let isProcessing = false;
  let isEditMode = false;

  let user = {
    gender: {
      id: 1,
      name: "Male"
    },
    firstName: "James",
    lastName: "Blunt",
    symptoms: [
      {
        id: 1,
        name: "headache"
      },
      {
        id: 2,
        name: "nausea"
      }
    ],
    id: 1,
    extra: "testing..."
  }
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home user={user} genderData={genderData} symptomsData={symptomsData} isEditMode={isEditMode} isProcessing={isProcessing} />} />
        </Routes>
        {/* <div className="App">
      <Home></Home>
    </div> */}
      </Router>
    </Fragment>
  );
}

export default App;

import React, { useState } from 'react';
import './styles/App.css';

function App() {
  // State for general information
  const [generalInfo, setGeneralInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
  });
  const [isEditingGeneralInfo, setIsEditingGeneralInfo] = useState(false);

  // State for education info
  const [education, setEducation] = useState({
    school: 'XYZ University',
    degree: 'Bachelor of Science',
    dates: '2015-2019',
  });
  const [isEditingEducation, setIsEditingEducation] = useState(false);

  // State for work experience
  const [experience, setExperience] = useState({
    company: 'ABC Corp',
    position: 'Software Developer',
    responsibilities: 'Developed web applications',
    dates: '2019-2021',
  });
  const [isEditingExperience, setIsEditingExperience] = useState(false);

  // General Information Submit Handler
  const handleSubmitGeneralInfo = () => {
    setIsEditingGeneralInfo(false);
  };

  // Education Submit Handler
  const handleSubmitEducation = () => {
    setIsEditingEducation(false);
  };

  // Experience Submit Handler
  const handleSubmitExperience = () => {
    setIsEditingExperience(false);
  };

  return (
    <div className="App">
      <h1>My CV</h1>

      {/* General Information Section */}
      <section className="section">
        <h2>General Information</h2>
        {isEditingGeneralInfo ? (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={generalInfo.name}
                onChange={(e) => setGeneralInfo({ ...generalInfo, name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={generalInfo.email}
                onChange={(e) => setGeneralInfo({ ...generalInfo, email: e.target.value })}
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                value={generalInfo.phone}
                onChange={(e) => setGeneralInfo({ ...generalInfo, phone: e.target.value })}
              />
            </label>
            <button onClick={handleSubmitGeneralInfo}>Submit</button>
          </div>
        ) : (
          <div>
            <p>Name: {generalInfo.name}</p>
            <p>Email: {generalInfo.email}</p>
            <p>Phone: {generalInfo.phone}</p>
            <button onClick={() => setIsEditingGeneralInfo(true)}>Edit</button>
          </div>
        )}
      </section>

      {/* Education Section */}
      <section className="section">
        <h2>Education</h2>
        {isEditingEducation ? (
          <div>
            <label>
              School:
              <input
                type="text"
                value={education.school}
                onChange={(e) => setEducation({ ...education, school: e.target.value })}
              />
            </label>
            <label>
              Degree:
              <input
                type="text"
                value={education.degree}
                onChange={(e) => setEducation({ ...education, degree: e.target.value })}
              />
            </label>
            <label>
              Dates of Study:
              <input
                type="text"
                value={education.dates}
                onChange={(e) => setEducation({ ...education, dates: e.target.value })}
              />
            </label>
            <button onClick={handleSubmitEducation}>Submit</button>
          </div>
        ) : (
          <div>
            <p>School: {education.school}</p>
            <p>Degree: {education.degree}</p>
            <p>Dates of Study: {education.dates}</p>
            <button onClick={() => setIsEditingEducation(true)}>Edit</button>
          </div>
        )}
      </section>

      {/* Experience Section */}
      <section className="section">
        <h2>Work Experience</h2>
        {isEditingExperience ? (
          <div>
            <label>
              Company:
              <input
                type="text"
                value={experience.company}
                onChange={(e) => setExperience({ ...experience, company: e.target.value })}
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                value={experience.position}
                onChange={(e) => setExperience({ ...experience, position: e.target.value })}
              />
            </label>
            <label>
              Responsibilities:
              <textarea
                value={experience.responsibilities}
                onChange={(e) => setExperience({ ...experience, responsibilities: e.target.value })}
              />
            </label>
            <label>
              Dates Worked:
              <input
                type="text"
                value={experience.dates}
                onChange={(e) => setExperience({ ...experience, dates: e.target.value })}
              />
            </label>
            <button onClick={handleSubmitExperience}>Submit</button>
          </div>
        ) : (
          <div>
            <p>Company: {experience.company}</p>
            <p>Position: {experience.position}</p>
            <p>Responsibilities: {experience.responsibilities}</p>
            <p>Dates Worked: {experience.dates}</p>
            <button onClick={() => setIsEditingExperience(true)}>Edit</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

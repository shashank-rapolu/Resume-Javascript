// import React, { useRef } from 'react';
// import { resumeData } from './components/firstpage';
// import { generateResumePDF } from './utils/pdf';
// import './styles/firstpage.css';

// const ResumePaper = React.forwardRef((props, ref) => {
//   const { header, education, experience, skills, awards_and_recognition, projects, certifications } = resumeData;

//   return (
//     <div ref={ref} className="resume-page" style={{ backgroundColor: '#fff' }}>
//       {/* Header Section */}
//       <div className="header">
//         <h1>{header.name}</h1>
//         <div className="contact-line">
//           {header.contact.map((c, i) => (
//             <span key={i}>{c.value}{i < header.contact.length - 1 ? " | " : ""}</span>
//           ))}
//         </div>
//       </div>

//       {/* Summary Section */}
//       <div className="summary">{header.summary}</div>

//       {/* Education Section */}
//       <div className="section-title">Education</div>
//       {education.map((edu, i) => (
//         <div key={i} style={{ marginBottom: '6px' }}>
//           <div className="entry-row">
//             <span dangerouslySetInnerHTML={{ __html: edu.institution }}></span>
//             <span>{edu.duration}</span>
//           </div>
//           <div className="role-text">{edu.degree}</div>
//         </div>
//       ))}

//       {/* Professional Experience Section */}
//       <div className="section-title">Professional Experience</div>
//       {experience.map((exp, i) => (
//         <div key={i} style={{ marginBottom: '8px' }}>
//           <div className="entry-row">
//             <span>{exp.company}</span>
//             <span>{exp.duration}</span>
//           </div>
//           <div className="role-text">{exp.role}</div>
//           <ul>
//             {exp.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
//           </ul>
//           {exp.tools_used && <div className="tools-used"><strong>Tools used:</strong> {exp.tools_used}</div>}
//         </div>
//       ))}

//       {/* Technical Skills Section */}
//       <div className="section-title">Technical Skills</div>
//       <div className="skills-text">
//         <div><strong>Languages:</strong> {skills.languages}</div>
//         <div><strong>Frameworks:</strong> {skills.frameworks}</div>
//         <div><strong>Tools:</strong> {skills.tools}</div>
//         <div><strong>Databases:</strong> {skills.databases}</div>
//       </div>

//       {/* Awards and Recognition Section */}
//       {awards_and_recognition && awards_and_recognition.length > 0 && (
//         <div style={{ marginBottom: '8px' }}>
//           <div className="section-title">Awards and Recognition</div>
//           <ul>
//             {awards_and_recognition.map((award, i) => <li key={i}>{award}</li>)}
//           </ul>
//         </div>
//       )}

//       {/* Technical Projects Section */}
//       <div className="section-title">Technical Projects</div>
//       {projects.map((proj, i) => (
//         <div key={i} style={{ marginBottom: '8px' }}>
//           <div className="entry-row">
//             <span>{proj.title}</span>
//             <span>{proj.duration}</span>
//           </div>
//           <ul>
//             {proj.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}
//           </ul>
//           {proj.tools_used && <div className="tools-used"><strong>Tools used:</strong> {proj.tools_used}</div>}
//         </div>
//       ))}

//       {/* Certifications Section */}
//       <div className="section-title">Certifications</div>
//       <ul>
//         {certifications.map((cert, i) => <li key={i}>{cert}</li>)}
//       </ul>
//     </div>
//   );
// });

// // Main App Component
// const App = () => {
//   const componentRef = useRef();

//   const handleDownloadPDF = async () => {
//     try {
//       console.log('Starting PDF generation...');
//       console.log('Resume data:', resumeData);
      
//       if (!resumeData || !resumeData.header) {
//         throw new Error('Resume data is incomplete or missing');
//       }

//       generateResumePDF(resumeData);
//       console.log('PDF generated successfully');
      
//     } catch (error) {
//       console.error('Detailed error:', error);
//       alert(`Error generating PDF: ${error.message}`);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', backgroundColor: '#e8e8e8', paddingBottom: '30px' }}>
//       <button 
//         onClick={handleDownloadPDF}
//         className="no-print"
//         style={{ 
//           margin: '20px auto', 
//           padding: '12px 24px', 
//           backgroundColor: '#004a99', 
//           color: '#fff', 
//           border: 'none', 
//           borderRadius: '4px', 
//           cursor: 'pointer',
//           fontWeight: 'bold',
//           fontSize: '14px',
//           transition: 'background-color 0.3s ease'
//         }}
//         onMouseOver={(e) => e.target.style.backgroundColor = '#003366'}
//         onMouseOut={(e) => e.target.style.backgroundColor = '#004a99'}
//       >
//         Download ATS-Friendly PDF
//       </button>
//       <ResumePaper ref={componentRef} />
//     </div>
//   );
// };

// export default App;





import React from "react";
import { resumeData } from "./components/firstpage";
import { generateResumePDF } from "./utils/pdf";
import "./styles/firstpage.css";

const ResumePaper = React.forwardRef((props, ref) => {
  const { header, education, experience, skills, awards_and_recognition, projects, certifications } = resumeData;

  return (
    <div ref={ref} className="resume-page">
      <div className="header">
        <h1>{header.name}</h1>
        <div className="contact-line">
          {header.contact.map((c, i) => (
            <span key={i}>
              {c.value}
              {i < header.contact.length - 1 ? " | " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="summary">{header.summary}</div>

      <div className="section-title">Education</div>
      {education.map((edu, i) => (
        <div key={i} style={{ marginBottom: "6px" }}>
          <div className="entry-row">
            <span dangerouslySetInnerHTML={{ __html: edu.institution }} />
            <span>{edu.duration}</span>
          </div>
          <div className="role-text">{edu.degree}</div>
        </div>
      ))}

      <div className="section-title">Professional Experience</div>
      {experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <div className="entry-row">
            <span>{exp.company}</span>
            <span>{exp.duration}</span>
          </div>
          <div className="role-text">{exp.role}</div>
          <ul>
            {exp.bullets.map((bullet, j) => (
              <li key={j}>{bullet}</li>
            ))}
          </ul>
          {exp.tools_used && (
            <div className="tools-used">
              <strong>Tools used:</strong> {exp.tools_used}
            </div>
          )}
        </div>
      ))}

      <div className="section-title">Technical Skills</div>
      <div className="skills-text">
        <div><strong>Languages:</strong> {skills.languages}</div>
        <div><strong>Frameworks:</strong> {skills.frameworks}</div>
        <div><strong>Tools:</strong> {skills.tools}</div>
        <div><strong>Databases:</strong> {skills.databases}</div>
      </div>

      {awards_and_recognition?.length > 0 && (
        <>
          <div className="section-title">Awards and Recognition</div>
          <ul>
            {awards_and_recognition.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        </>
      )}

      <div className="section-title">Technical Projects</div>
      {projects.map((proj, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <div className="entry-row">
            <span>{proj.title}</span>
            <span>{proj.duration}</span>
          </div>
          <ul>
            {proj.bullets.map((bullet, j) => (
              <li key={j}>{bullet}</li>
            ))}
          </ul>
          {proj.tools_used && (
            <div className="tools-used">
              <strong>Tools used:</strong> {proj.tools_used}
            </div>
          )}
        </div>
      ))}

      <div className="section-title">Certifications</div>
      <ul>
        {certifications.map((cert, i) => (
          <li key={i}>{cert}</li>
        ))}
      </ul>
    </div>
  );
});

const App = () => {

  const handleDownloadPDF = () => {
    console.log("Generating PDF...");
    generateResumePDF(resumeData);
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#e8e8e8", paddingBottom: "30px" }}>
      <button
        type="button"   // 🔥 prevents form submission issues
        onClick={handleDownloadPDF}
        className="no-print"
        style={{
          margin: "20px auto",
          padding: "12px 24px",
          backgroundColor: "#004a99",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px"
        }}
      >
        Download ATS-Friendly PDF
      </button>

      <ResumePaper />
    </div>
  );
};

export default App;
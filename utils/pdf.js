import jsPDF from "jspdf";

export const generateResumePDF = (data) => {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    const primaryBlue = [0, 74, 153];

    const write = (text, size = 9, indent = 0, bold = false, color = [0,0,0]) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text || "", contentWidth - indent);
      doc.text(lines, margin + indent, y);
      y += lines.length * (size * 0.35) + 2;
    };

    const section = (title) => {
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...primaryBlue);
      doc.text(title.toUpperCase(), margin, y);
      y += 4;
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 4;
      doc.setTextColor(0,0,0);
    };

    /* HEADER */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...primaryBlue);
    doc.text(data.header.name.toUpperCase(), pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0,0,0);
    const contact = data.header.contact.map(c => c.value).join(" | ");
    const contactLines = doc.splitTextToSize(contact, contentWidth);
    doc.text(contactLines, pageWidth / 2, y, { align: "center" });
    y += contactLines.length * 3 + 3;

    doc.setLineWidth(0.6);
    doc.setDrawColor(...primaryBlue);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    write(data.header.summary, 9);

    /* EDUCATION */
    section("Education");
    data.education.forEach(e => {
      write(e.institution.replace(/<[^>]*>/g, ""), 10, 0, true);
      doc.text(e.duration, pageWidth - margin, y - 3.5, { align: "right" });
      write(e.degree, 9);
    });

    /* EXPERIENCE */
    section("Professional Experience");
    data.experience.forEach(exp => {
      write(exp.company, 10, 0, true);
      doc.text(exp.duration, pageWidth - margin, y - 3.5, { align: "right" });
      write(exp.role, 9, 0, true);
      exp.bullets.forEach(b => write("• " + b, 8.8, 5));
      write("Tools Used: " + exp.tools_used, 8.5, 5, true, [90,90,90]);
    });

    /* TECHNICAL SKILLS (PROPER FIX HERE) */
    section("Technical Skills");

    const writeSkillLine = (label, value) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.8);
      doc.text(label + ":", margin, y);

      const labelWidth = doc.getTextWidth(label + ": ");
      doc.setFont("helvetica", "normal");

      const lines = doc.splitTextToSize(value, contentWidth - labelWidth);
      doc.text(lines, margin + labelWidth, y);

      y += lines.length * (8.8 * 0.35) + 2;
    };

    writeSkillLine("Languages", data.skills.languages);
    writeSkillLine("Frameworks", data.skills.frameworks);
    writeSkillLine("Tools", data.skills.tools);
    writeSkillLine("Databases", data.skills.databases);

    /* AWARDS */
    section("Awards and Recognition");
    data.awards_and_recognition.forEach(a => write("• " + a, 8.8, 5));

    /* PROJECTS */
    section("Technical Projects");
    data.projects.forEach(p => {
      write(p.title, 10, 0, true);
      doc.text(p.duration, pageWidth - margin, y - 3.5, { align: "right" });
      p.bullets.forEach(b => write("• " + b, 8.8, 5));
      write("Tools Used: " + p.tools_used, 8.5, 5, true, [90,90,90]);
    });

    /* CERTIFICATIONS */
    section("Certifications");
    data.certifications.forEach(c => write("• " + c, 8.8, 5));

    doc.save("Rapolu_Shashank_Resume.pdf");

  } catch (err) {
    console.error(err);
    alert("PDF generation failed. Check console.");
  }
};

// import jsPDF from 'jspdf';

// export const generateResumePDF = (data) => {
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const marginLeft = 15; 
//     const marginRight = 15;
//     const contentWidth = pageWidth - marginLeft - marginRight;
//     let yPosition = 15; 

//     const primaryBlue = [0, 74, 153];
//     const lineSpacing = 4.5; 

//     const addSectionTitle = (title) => {
//       yPosition += 4; 
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(...primaryBlue);
//       doc.text(title.toUpperCase(), marginLeft, yPosition);
      
//       yPosition += 1.5;
//       doc.setDrawColor(...primaryBlue);
//       doc.setLineWidth(0.4);
//       doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
//       yPosition += 5; 
//       doc.setTextColor(0, 0, 0);
//     };

//     // HEADER
//     doc.setFontSize(22);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(...primaryBlue);
//     doc.text(data.header.name.toUpperCase(), pageWidth / 2, yPosition, { align: 'center' });
//     yPosition += 7;

//     // CONTACT INFO
//     doc.setFontSize(8.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(34, 34, 34);
//     const contactText = data.header.contact.map(c => c.value).join(' | ');
//     doc.text(contactText, pageWidth / 2, yPosition, { align: 'center' });
//     yPosition += 3.5;
    
//     doc.setDrawColor(...primaryBlue);
//     doc.setLineWidth(0.8);
//     doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
//     yPosition += 6;

//     // PROFESSIONAL SUMMARY
//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'normal');
//     const summaryLines = doc.splitTextToSize(data.header.summary, contentWidth);
//     summaryLines.forEach(line => {
//       doc.text(line, marginLeft, yPosition);
//       yPosition += lineSpacing;
//     });
//     yPosition += 2;

//     // EDUCATION
//     if (data.education) {
//       addSectionTitle('EDUCATION');
//       data.education.forEach((edu) => {
//         doc.setFont('helvetica', 'bold');
//         doc.text(edu.institution.replace(/<[^>]*>/g, ''), marginLeft, yPosition);
//         doc.text(edu.duration, pageWidth - marginRight, yPosition, { align: 'right' });
//         yPosition += lineSpacing;
//         doc.setFont('helvetica', 'normal');
//         doc.text(edu.degree, marginLeft, yPosition);
//         yPosition += 6;
//       });
//     }

//     // PROFESSIONAL EXPERIENCE
//     if (data.experience) {
//       addSectionTitle('PROFESSIONAL EXPERIENCE');
//       data.experience.forEach((exp) => {
//         doc.setFontSize(10);
//         doc.setFont('helvetica', 'bold');
//         doc.text(exp.company, marginLeft, yPosition);
//         doc.text(exp.duration, pageWidth - marginRight, yPosition, { align: 'right' });
//         yPosition += lineSpacing;

//         doc.setFont('helvetica', 'bold');
//         doc.text(exp.role, marginLeft, yPosition);
//         yPosition += lineSpacing + 1;

//         exp.bullets.forEach((bullet) => {
//           doc.setFontSize(9.5);
//           doc.setFont('helvetica', 'normal');
//           const bulletLines = doc.splitTextToSize(`• ${bullet}`, contentWidth - 6);
//           bulletLines.forEach(line => {
//             doc.text(line, marginLeft + 4, yPosition);
//             yPosition += 4.2;
//           });
//           yPosition += 1;
//         });

//         if (exp.tools_used) {
//           yPosition += 1;
//           doc.setFontSize(8.5);
//           doc.setFont('helvetica', 'italic');
//           doc.setTextColor(80, 80, 80);
//           const toolsLines = doc.splitTextToSize(`Tools used: ${exp.tools_used}`, contentWidth - 6);
//           toolsLines.forEach(line => {
//             doc.text(line, marginLeft + 4, yPosition);
//             yPosition += 3.8;
//           });
//           yPosition += 4;
//           doc.setTextColor(0, 0, 0);
//         }
//       });
//     }

//     // TECHNICAL SKILLS
//     if (data.skills) {
//       addSectionTitle('TECHNICAL SKILLS');
//       const skillsMap = [
//         { label: 'Languages:', val: data.skills.languages },
//         { label: 'Frameworks:', val: data.skills.frameworks },
//         { label: 'Tools:', val: data.skills.tools },
//         { label: 'Databases:', val: data.skills.databases }
//       ];
//       skillsMap.forEach(s => {
//         doc.setFontSize(9.5);
//         doc.setFont('helvetica', 'bold');
//         doc.text(s.label, marginLeft, yPosition);
//         doc.setFont('helvetica', 'normal');
//         const valLines = doc.splitTextToSize(s.val, contentWidth - 30);
//         doc.text(valLines, marginLeft + 30, yPosition);
//         yPosition += (valLines.length * 4) + 1.5;
//       });
//     }

//     // AWARDS AND RECOGNITION (SELECTIVE BOLDING)
//     if (data.awards_and_recognition) {
//       addSectionTitle('AWARDS AND RECOGNITION');
//       data.awards_and_recognition.forEach(award => {
//         doc.setFontSize(9.5);
        
//         // Logical split: Bold until the first '-' or '(' found in the text
//         const splitIndex = award.search(/[-—(]/); 
//         let title = award;
//         let description = "";

//         if (splitIndex !== -1) {
//           title = award.substring(0, splitIndex).trim();
//           description = award.substring(splitIndex).trim();
//         }

//         doc.setFont('helvetica', 'bold');
//         doc.text(`• ${title}`, marginLeft + 4, yPosition);
        
//         const titleWidth = doc.getTextWidth(`• ${title} `);
        
//         doc.setFont('helvetica', 'normal');
//         const descLines = doc.splitTextToSize(description, contentWidth - 6 - titleWidth);
        
//         // If description fits on the same line
//         if (descLines.length > 0) {
//           doc.text(descLines[0], marginLeft + 4 + titleWidth, yPosition);
//           yPosition += 4.2;
          
//           // If description wraps to multiple lines
//           for (let i = 1; i < descLines.length; i++) {
//             doc.text(descLines[i], marginLeft + 8, yPosition);
//             yPosition += 4.2;
//           }
//         } else {
//           yPosition += 4.2;
//         }
//         yPosition += 1.5;
//       });
//     }

//     // TECHNICAL PROJECTS
//     if (data.projects) {
//       addSectionTitle('TECHNICAL PROJECTS');
//       data.projects.forEach(proj => {
//         doc.setFontSize(10);
//         doc.setFont('helvetica', 'bold');
//         doc.text(proj.title, marginLeft, yPosition);
//         doc.text(proj.duration, pageWidth - marginRight, yPosition, { align: 'right' });
//         yPosition += lineSpacing;
        
//         proj.bullets.forEach(b => {
//           doc.setFontSize(9.5);
//           doc.setFont('helvetica', 'normal');
//           const bLines = doc.splitTextToSize(`• ${b}`, contentWidth - 6);
//           bLines.forEach(line => {
//             doc.text(line, marginLeft + 4, yPosition);
//             yPosition += 4.2;
//           });
//         });
//         yPosition += 3;
//       });
//     }

//     // CERTIFICATIONS
//     if (data.certifications && data.certifications.length > 0) {
//       addSectionTitle('CERTIFICATIONS');
//       data.certifications.forEach((cert) => {
//         doc.setFontSize(9.5);
//         doc.setFont('helvetica', 'normal');
//         const certLines = doc.splitTextToSize(`• ${cert}`, contentWidth - 6);
//         certLines.forEach(line => {
//           doc.text(line, marginLeft + 4, yPosition);
//           yPosition += 4.2;
//         });
//         yPosition += 1;
//       });
//     }

//     doc.save('Saketh_Thirumala_Resume.pdf');
//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//   }
// };
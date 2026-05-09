import { jsPDF } from "jspdf";
import fs from "fs";

const doc = new jsPDF();

// Colors
const navy = [10, 17, 40];
const cyan = [0, 180, 216];

// PAGE 1: COVER
doc.setFillColor(navy[0], navy[1], navy[2]);
doc.rect(0, 0, 210, 297, 'F');

doc.setTextColor(cyan[0], cyan[1], cyan[2]);
doc.setFontSize(30);
doc.text("D.K. Techno Industries", 105, 100, { align: "center" });

doc.setTextColor(255, 255, 255);
doc.setFontSize(16);
doc.text("Excellence in Precision Manufacturing", 105, 115, { align: "center" });

doc.setDrawColor(cyan[0], cyan[1], cyan[2]);
doc.setLineWidth(1);
doc.line(40, 130, 170, 130);

doc.setFontSize(12);
doc.text("SINCE 2011", 105, 145, { align: "center" });

// PAGE 2: INFO
doc.addPage();
doc.setTextColor(navy[0], navy[1], navy[2]);
doc.setFontSize(22);
doc.text("Company Profile", 20, 30);
doc.setDrawColor(cyan[0], cyan[1], cyan[2]);
doc.line(20, 35, 100, 35);

doc.setFontSize(14);
doc.text("About Us", 20, 50);
doc.setFontSize(11);
const aboutText = "Founded in 2011 by Mrs. Kanta Eknath Gaikwad, D.K. Techno Industries has established itself as a premier name in the precision engineering sector. We specialize in the high-accuracy machining and fabrication of industrial components.";
doc.text(doc.splitTextToSize(aboutText, 170), 20, 60);

doc.setFontSize(14);
doc.text("Our Strength", 20, 90);
doc.setFontSize(10);
doc.text("- CNC Turning & VMC 4th Axis", 25, 100);
doc.text("- Precision Machined Components", 25, 107);
doc.text("- Sheet Metal Fabrication", 25, 114);
doc.text("- CMM Inspection Facilities", 25, 121);

// PAGE 3: CONTACT
doc.addPage();
doc.setFontSize(22);
doc.text("Get In Touch", 20, 30);
doc.line(20, 35, 80, 35);

doc.setFontSize(12);
doc.text("Address: 95/1 Ekant Plaza, Landge Nagar, Bhosari, Pune - 411039", 20, 50);
doc.text("Email: D.K. Techno Industries@gmail.com", 20, 60);
doc.text("Phone: +91 96231 59111", 20, 70);
doc.text("Website: www.D.K. Techno Industries.com", 20, 80);

const pdfOutput = doc.output('arraybuffer');
fs.writeFileSync('public/brochure.pdf', Buffer.from(pdfOutput));

console.log("PDF generated successfully at public/brochure.pdf");

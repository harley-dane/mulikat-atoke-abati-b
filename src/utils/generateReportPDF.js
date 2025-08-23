import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generateReportPDF = (report, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Generating PDF at:", outputPath);
      console.log("Current working directory:", process.cwd());

      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      // Ensure output directory exists
      const outputDir = path.join(process.cwd(), "assets");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created directory: ${outputDir}`);
      }

      // Verify write permissions
      try {
        fs.accessSync(outputDir, fs.constants.W_OK);
      } catch (err) {
        console.error(`No write access to ${outputDir}: ${err.message}`);
        return reject(new Error(`No write access to ${outputDir}`));
      }

      // Pipe the PDF to a file
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // Fonts and Colors
      doc.registerFont("Regular", "Helvetica");
      doc.registerFont("Bold", "Helvetica-Bold");
      const green = "#1F7A44"; // Matches Tailwind green-700
      const gray = "#4B5563"; // Matches Tailwind gray-600

      // Cover Page
      doc
        .font("Bold")
        .fontSize(30)
        .fillColor(green)
        .text("Muikat Atoke Abati Foundation", 50, 100, { align: "center" });
      doc
        .fontSize(24)
        .text(`${report.year} Annual Report`, 50, 160, { align: "center" });
      doc
        .font("Regular")
        .fontSize(16)
        .fillColor(gray)
        .text("Empowering Nigerian Communities", 50, 220, { align: "center" });
      doc.moveDown(10);
      doc
        .fontSize(12)
        .text("Published: August 2025", 50, 600, { align: "center" });

      // New Page: Introduction
      doc.addPage();
      doc
        .font("Bold")
        .fontSize(20)
        .fillColor(green)
        .text("Introduction", 50, 50);
      doc.moveDown();
      doc
        .font("Regular")
        .fontSize(12)
        .fillColor(gray)
        .text(
          `In ${report.year}, the Muikat Atoke Abati Foundation continued its mission to uplift Nigerian communities through education, healthcare, and support for the vulnerable. This report outlines our key activities, financial expenditures, and the impact of your generous donations.`,
          50,
          100,
          { width: 500, align: "justify" }
        );

      // New Page: Financial Summary
      doc.addPage();
      doc
        .font("Bold")
        .fontSize(20)
        .fillColor(green)
        .text("Financial Summary", 50, 50);
      doc.moveDown();
      doc
        .font("Regular")
        .fontSize(12)
        .fillColor(gray)
        .text(
          `In ${report.year}, the foundation spent ₦${report.spendingDetails.reduce((sum, detail) => sum + detail.amount, 0).toLocaleString()} to support our initiatives. Below is a detailed breakdown of our expenditures.`,
          50,
          100,
          { width: 500 }
        );

      // Spending Table
      const tableTop = 150;
      const col1 = 50;
      const col2 = 200;
      const col3 = 350;
      const rowHeight = 30;

      // Table Headers
      doc
        .font("Bold")
        .fontSize(12)
        .fillColor(green)
        .text("Category", col1, tableTop)
        .text("Amount (NGN)", col2, tableTop)
        .text("Description", col3, tableTop);

      // Table Rows
      doc.font("Regular").fillColor(gray);
      report.spendingDetails.forEach((detail, index) => {
        const y = tableTop + (index + 1) * rowHeight;
        doc
          .text(detail.category, col1, y, { width: 140 })
          .text(detail.amount.toLocaleString(), col2, y, { width: 140 })
          .text(detail.description, col3, y, { width: 200 });
      });

      // Total
      const totalY = tableTop + (report.spendingDetails.length + 1) * rowHeight;
      doc
        .font("Bold")
        .text("Total", col1, totalY)
        .text(`₦${report.spendingDetails.reduce((sum, detail) => sum + detail.amount, 0).toLocaleString()}`, col2, totalY);

      // New Page: Impact
      doc.addPage();
      doc
        .font("Bold")
        .fontSize(20)
        .fillColor(green)
        .text(`Our Impact in ${report.year}`, 50, 50);
      doc.moveDown();
      doc
        .font("Regular")
        .fontSize(12)
        .fillColor(gray)
        .text("Key achievements made possible by your support:", 50, 100);
      doc.moveDown();
      doc.text("- Distributed 100 wheelchairs to enhance mobility for disabled individuals.");
      doc.text("- Provided scholarships for 50 students in rural schools.");
      doc.text("- Delivered free medical checkups and supplies to underserved communities.");
      doc.text("- Employed 20 full-time staff to manage and expand our programs.");

      // New Page: Conclusion
      doc.addPage();
      doc
        .font("Bold")
        .fontSize(20)
        .fillColor(green)
        .text("Looking Ahead", 50, 50);
      doc.moveDown();
      doc
        .font("Regular")
        .fontSize(12)
        .fillColor(gray)
        .text(
          `As we move into ${report.year + 1}, we aim to expand our healthcare and education programs, reaching more communities and deepening our impact. Thank you for your continued support in making this vision a reality.`,
          50,
          100,
          { width: 500, align: "justify" }
        );

      // Finalize PDF
      doc.end();

      stream.on("finish", () => {
        console.log(`PDF generated successfully at ${outputPath}`);
        resolve(outputPath);
      });
      stream.on("error", (err) => {
        console.error("PDF generation error:", err.message);
        reject(err);
      });
    } catch (err) {
      console.error("PDF generation error:", err.message);
      reject(err);
    }
  });
};

export default generateReportPDF;
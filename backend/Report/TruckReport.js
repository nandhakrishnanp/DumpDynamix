const PDFDocument = require("pdfkit");
const fs = require("fs");
const VechicleSchmea = require("../model/VechicleSchmea");
const TyreSchemea = require("../model/TyreSchemea");



const calculateTKPH = async (vehicle_id) => {
  const vehicleData = await VechicleSchmea.findOne({ vehicle_id });

  if (!vehicleData) {
    throw new Error("Vehicle data not found");
  }

  const payload = vehicleData.payload_in_tones;
  const maxPayload = vehicleData.maximum_payload;
  const grossWeight = vehicleData.gross_weight;

  const vehicleWeight = Math.round(Number(grossWeight) - Number(maxPayload), 2);
  const loadedTruckWeight = Math.round(vehicleWeight + Number(payload), 2);

  const frontAxleEmptyPercent = 45 / 100;
  const rearAxleEmptyPercent = 55 / 100;
  const frontAxleLoadedPercent = 35 / 100;
  const rearAxleLoadedPercent = 65 / 100;

  const frontAxleLoadEmpty = Math.round(vehicleWeight * frontAxleEmptyPercent, 2);
  const rearAxleLoadEmpty = Math.round(vehicleWeight * rearAxleEmptyPercent, 2);
  const frontAxleLoadLoaded = Math.round(
    loadedTruckWeight * frontAxleLoadedPercent,
    2
  );
  const rearAxleLoadLoaded = Math.round(
    loadedTruckWeight * rearAxleLoadedPercent,
    2
  );

  const frontTireLoadEmpty = frontAxleLoadEmpty / 2;
  const rearTireLoadEmpty = rearAxleLoadEmpty / 4;
  const frontTireLoadLoaded = frontAxleLoadLoaded / 2;
  const rearTireLoadLoaded = rearAxleLoadLoaded / 4;

  const meanFrontTireLoad = Math.round(
    (frontTireLoadEmpty + frontTireLoadLoaded) / 2,
    2
  );
  const meanRearTireLoad = Math.round(
    (rearTireLoadEmpty + rearTireLoadLoaded) / 2,
    2
  );

  const roundTripDistance = 14; // km
  const noOfRoundTrips = 15; // cycles
  const workingShift = 8; // hours
  const awss = Math.round((roundTripDistance * noOfRoundTrips) / workingShift, 2);

  const frontTireTKPH = Math.round(meanFrontTireLoad * awss, 2);
  const rearTireTKPH = Math.round(meanRearTireLoad * awss, 2);

  return {
    vehicleWeight,
    loadedTruckWeight,
    maxPayload,
    frontAxleLoadEmpty,
    rearAxleLoadEmpty,
    frontAxleLoadLoaded,
    rearAxleLoadLoaded,
    frontTireLoadEmpty,
    rearTireLoadEmpty,
    frontTireLoadLoaded,
    rearTireLoadLoaded,
    meanFrontTireLoad,
    meanRearTireLoad,
    awss,
    frontTireTKPH,
    rearTireTKPH,
  };
};


const BuildPdf = async (truckData, tireData,tkphData, datacallback, endCallback) => {
  const doc = new PDFDocument();
  doc.on("data", datacallback);
  doc.on("end", endCallback);

  // Title and Date/Time
  doc.fontSize(20).text("DumpDynamix Daily Report", { align: "center" });
  doc
    .fontSize(10)
    .text(`Vehicle ID: ${truckData.vehicle_id}`, { align: "left", continued: true })
    .text(`Report Date: ${new Date().toLocaleDateString()}`, { align: "right" })
    .text(`Report Time: ${new Date().toLocaleTimeString()}`, { align: "right" });
  doc.moveDown(2);

  // Vehicle Information Table
  doc.fontSize(15).text("Vehicle Information", { underline: true });
  const vehicleTableTop = doc.y + 10;
  const rowHeight = 20;
  const padding = 5;

  // Vehicle table headers
  const vehicleFields = [
    ["Truck Make", truckData.truck_make],
    ["Model", `${truckData.model} (${truckData.year})`],
    ["Max Payload", `${truckData.maximum_payload} tons`],
    ["Avg Tyre Pressure", `${truckData.avg_tyre_pressure} PSI`],
   ["Truck Gross Weight", `${truckData.gross_weight} tons`],
   
    ["Avg Speed per Shift", `${truckData.avg_speed_per_shift} km/h`],
    ["Current Status", truckData.status],
    ["GPS Latitude", truckData.gps_coords.latitude],
    ["GPS Longitude", truckData.gps_coords.longitude],
  ];

  doc.fontSize(12);
  let y = vehicleTableTop;

  // Draw table headers
  doc.text("Field", 50 + padding, y + padding, { width: 150 - padding * 2 });
  doc.text("Value", 200 + padding, y + padding, { width: 300 - padding * 2 });
  y += rowHeight;

  // Draw a border around headers
  doc.rect(50, vehicleTableTop, 150, rowHeight).stroke();
  doc.rect(200, vehicleTableTop, 300, rowHeight).stroke();

  // Draw vehicle data rows with borders
  vehicleFields.forEach(([field, value]) => {
    doc.text(field, 50 + padding, y + padding, { width: 150 - padding * 2 });
    doc.text(value, 200 + padding, y + padding, { width: 300 - padding * 2 });

    // Draw borders for each cell
    doc.rect(50, y, 150, rowHeight).stroke();
    doc.rect(200, y, 300, rowHeight).stroke();

    y += rowHeight;
  });

  doc.moveDown();

  // Tire Data Table
  doc.fontSize(15).text("Tire Information", { underline: true });
  const tireTableTop = doc.y + 10;
  y = tireTableTop;

  // Draw tire headers
  doc.fontSize(12);
  const tireHeaders = ["Tyre ID" , "Position", "Pressure",  "KM Driven", "Last Inspection"];
  const tireCols = [50,150, 250, 350, 450]; // Column positions

  tireHeaders.forEach((header, index) => {
    doc.text(header, tireCols[index] + padding, y + padding, { width: 100 - padding * 2 });
  });
  y += rowHeight;

  // Draw borders for tire headers
  tireCols.forEach((col, index) => {
    doc.rect(col, tireTableTop, 100, rowHeight).stroke();
  });

  // Draw tire data rows with borders
  tireData.forEach((tire) => {
    const tireRow = [
      `${tire.tyre_id}`,
      tire.tyre_position,
      tire.tyre_pressure,
      `${tire.km_drived} km`,
      new Date(tire.last_inspection_date).toLocaleDateString(),
    ];

    tireRow.forEach((value, index) => {
      doc.text(value, tireCols[index] + padding, y + padding, { width: 100 - padding * 2 });
      doc.rect(tireCols[index], y, 100, rowHeight).stroke(); // Draw cell border
    });

    y += rowHeight;
  });
  doc.moveDown();

  const pageWidth = doc.page.width;
  const textWidth = doc.widthOfString("TKPH Data");
  const centerPosition = (pageWidth - textWidth) / 2;
  
  doc.fontSize(15).text("TKPH Data", centerPosition, doc.y, { underline: true });

const tkphTableTop = doc.y + 10;
y = tkphTableTop;

// TKPH Headers
const tkphHeaders = ["Parameter", "Value"];
const tkphCols = [50, 250]; // Column positions

// Draw TKPH headers
tkphHeaders.forEach((header, index) => {
  doc.text(header, tkphCols[index] + padding, y + padding, { width: 200 - padding * 2 });
});
y += rowHeight;

// Draw borders for TKPH headers
tkphCols.forEach((col) => {
  doc.rect(col, tkphTableTop, 200, rowHeight).stroke();
});

// TKPH Data Rows
const tkphFields = [
  ["Front Tire TKPH", `${tkphData.frontTireTKPH}`],
  ["Rear Tire TKPH", `${tkphData.rearTireTKPH}`],
  ["Mean Front Tire Load", `${tkphData.meanFrontTireLoad} tons`],
  ["Mean Rear Tire Load", `${tkphData.meanRearTireLoad} tons`],
  ["Average Working Speed", `${tkphData.awss} km/h`],
];

tkphFields.forEach(([field, value]) => {
  doc.text(field, tkphCols[0] + padding, y + padding, { width: 200 - padding * 2 });
  doc.text(value, tkphCols[1] + padding, y + padding, { width: 200 - padding * 2 });

  // Draw borders for each row
  tkphCols.forEach((col) => {
    doc.rect(col, y, 200, rowHeight).stroke();
  });

  y += rowHeight;
});
  doc.end();
};

const GenrateReport = async (req, res) => {
  const vehicle_id = req.body.vehicle_id;

  const truckData = await VechicleSchmea.findOne({ vehicle_id: vehicle_id });
  const tireData = await TyreSchemea.find({ vehicle_id: vehicle_id });
  const tkphdata = await  calculateTKPH(vehicle_id);

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=DumpDynamix_Report.pdf",
  });

  BuildPdf(
    truckData,
    tireData,
    tkphdata,
    (data) => stream.write(data),
    () => stream.end()
  );
};

module.exports = { GenrateReport };

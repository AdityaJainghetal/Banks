const mongoose = require("mongoose");

const FedralSchema = new mongoose.Schema({
  product: { type: String },
  branch: { type: String },
  reportDate: { type: String },
  applicationNumber: { type: String },
  referenceNumber: { type: String },
  customerName: { type: String },
  propertyOwnerName: { type: String },
  coApplicantDetails: { type: String },
  proposedOwners: { type: String },
  inspectionDateTime: { type: String },
  visitDoneBy: { type: String },
  caseType: { type: String },
  personMetAtSite: { type: String },
  relationshipWithCustomer: { type: String },
  contactNumber: { type: String },
  statusOfOccupancy: { type: String, default: 'VACANT' },
  occupiedBy: { type: String, default: 'NA' },
  occupantRelationship: { type: String, default: 'NA' },
  occupiedSince: { type: String, default: 'NA' },
  unitsOccupiedInScheme: { type: String, default: 'NA' },
  occupancyPercentageInScheme: { type: String, default: '80%' },
  habitationPercentage: { type: String, default: '85%' },
  encroachment: { type: String, default: 'NO' },
  encroachmentArea: { type: String, default: 'NA' },
  structureDeviation: { type: String, default: 'NA' },
  riskLevel: { type: String, default: 'LOW' },
  structureConfirmingByelaws: { type: String, default: 'NA' },
  deed_East: { type: String },
  deed_West: { type: String },
  deed_North: { type: String },
  deed_South: { type: String },
  plan_East: { type: String },
  plan_West: { type: String },
  plan_North: { type: String },
  plan_South: { type: String },
  actual_East: { type: String },
  actual_West: { type: String },
  actual_North: { type: String },
  actual_South: { type: String },
  boundariesMatching: { type: String },
  constructionPlan: { type: String },
  plotArea: { type: String },
  demarcatedSite: { type: String },
  landUse: { type: String },
  propertyAddress: { type: String },
  legalAddress: { type: String },
  pinCode: { type: String },
  nearbyLandmark: { type: String },
  coordinates: { type: String },
  seismicZone: { type: String },
  layoutPlanProvided: { type: String },
  layoutPlanAuthority: { type: String },
  layoutPlanApproval: { type: String },
  buildingPlanProvided: { type: String },
  buildingPlanAuthority: { type: String },
  buildingPlanApproval: { type: String },
  constructionPermissionProvided: { type: String },
  constructionPermissionAuthority: { type: String },
  constructionPermissionApproval: { type: String },
  reraApplicable: { type: String },
  reraNumber: { type: String },
  reraConstructionStage: { type: String },
  propertyCategory: { type: String },
  documentsStudied: { type: String },
  otherDocuments: { type: String },
  structureDescription: { type: String },
  stageDescription: { type: String },
  percentCompleted: { type: String },
  percentRecommended: { type: String },
  referenceType: { type: String },
  referenceName: { type: String },
  referenceCategory: { type: String },
  referenceContact: { type: String },
  valuationResult: { type: String },
  fairRentalValue: { type: String },
  remarks: { type: String },
  inspectionDate: { type: String },
  place: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  landAreaPlan: { type: String },
  landAreaDocument: { type: String },
  landAreaSite: { type: String },
  landRate: { type: String },
  landValue: { type: String },
  fsiConsidered: { type: String },
  typeOfArea: { type: String },
  builtUpArea: { type: String },
  floor: { type: String },
  area: { type: String },
  rate: { type: String },
  amount: { type: String },
  totalExistingValue: { type: String },
  proposedFloor: { type: String },
  proposedArea: { type: String },
  proposedRate: { type: String },
  proposedAmount: { type: String },
  totalProposedConstruction: { type: String },
  costEstimate: { type: String },
  rateEstimate: { type: String },
  completionDate: { type: String },
  materialAtSite: { type: String },
  materialDescription: { type: String },
  extraAmenities: { type: String },
  totalPropertyValuation: { type: String },
  govtGuidelineRate: { type: String },
  landValueGovtRate: { type: String },
  realizableValue: { type: String },
  distressedValue: { type: String },
  marketability: { type: String },
});

const FedralModel = mongoose.model("Federal", FedralSchema);

module.exports = FedralModel;

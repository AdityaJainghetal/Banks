const mongoose = require("mongoose");

const piramalSchema = new mongoose.Schema({
  // -----------------Individual Valuation Details------------

  caseType: {
    type: String,
  },
  houseDeliveryAgency: {
    type: String,
  },
  valuerVisit: {
    type: String,

    // enum: ["Yes", "No"],
    // default: "No",
  },
  valuationReportStatus: {
    type: String,
  },
  scopeOfValuation: {
    type: String,
  },
  contactPersonName: {
    type: String,
  },
  contactPersonNumber: {
    type: String,
  },
  relationshipWithApplicant: {
    type: String,
  },

  //   -----------------Basic Details------------

  applicantName: {
    type: String,
  },
  propertyCategory: {
    type: String,
  },
  propertySubCategory: {
    type: String,
  },
  greenHousing: {
    type: String,
    // enum: ["Yes", "No"],
    // default: "No",
  },
  certificationType: {
    type: String,
  },
  address: {
    type: String,
  },
  flatNo: {
    type: String,
  },
  floorWing: {
    type: String,
  },
  buildingName: {
    type: String,
  },
  khasraNumber: {
    type: String,
  },
  streetName: {
    type: String,
  },
  landmark: {
    type: String,
  },
  village: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  pincode: {
    type: String,
    //
    // validate: {
    //   validator: function (v) {
    //     // Basic pincode validation for India (6 digits)
    //     return /^[1-9][0-9]{5}$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid pincode!`,
    // },
  },
  state: {
    type: String,
  },
  country: {
    type: String,

    default: "India",
  },
  latitude: {
    type: String,
    // trim: true,
    // validate: {
    //   validator: function (v) {
    //     // Basic latitude validation
    //     return /^-?([1-8]?[1-9]|[1-9]0)\.\d{1,6}$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid latitude!`,
    // },
  },
  longitude: {
    type: String,
    // trim: true,
    // validate: {
    //   validator: function (v) {
    //     // Basic longitude validation
    //     return /^-?((1[0-7][0-9]|[1-9]?[0-9])\.\d{1,6}|180(\.0{1,6})?)$/.test(
    //       v
    //     );
    //   },
    //   message: (props) => `${props.value} is not a valid longitude!`,
    // },
  },
  addressMatching: {
    type: String,
    // enum: ["Yes", "No"],
  },

  // -----------------Boundry Schema------------

  east: {
    type: String,
  },
  west: {
    type: String,
  },
  north: {
    type: String,
  },
  south: {
    type: String,
  },
  boundariesMatching: {
    type: String,
  },
  remarks: {
    type: String,
  },
  propertyIdentifiedThrough: {
    type: String,
    // enum: [
    //   "Survey Markers",
    //   "Fencing",
    //   "Natural Features",
    //   "Documents",
    //   "Other",
    // ],
  },
  propertyDemarcated: {
    type: String,

    // enum: ["Yes", "No"],
  },
  demarcationType: {
    type: String,

    // enum: ["Fence", "Wall", "Hedges", "Markers", "Other"],
  },

  //   ------------------surrounding Locality Schema ------------------
  locationType: {
    type: String,
  },
  classOfLocality: {
    type: String,
  },
  proximityToCivicAmenities: {
    type: String,
  },
  railwayStation: {
    type: String,
  },
  busStop: {
    type: String,
  },
  typeOfRoad: {
    type: String,
  },
  legalApproach: {
    type: String,
  },
  physicalApproach: {
    type: String,
  },
  //   ------------------Sanction plan Schema ------------------
  usageAsPerMasterPlan: String,
  usageApprovedAsPerPlan: String,
  currentUsage: String,
  propertyLimits: String,
  plotWithinMunicipalLimit: String,
  underDemolitionList: String,
  planApprovedBy: String,
  planDetails: String,

  //   ------------------Property Details Schema ------------------
  qualityOfConstruction: String,
  occupancyOfProperty: String,
  multiTenantedProperty: String,
  numberOfTenants: String,
  vacantSince: String,
  reasonForVacant: String,
  landAreaAsPerPlan: String,
  landAreaAsPerTitle: String,
  landAreaAsPerSite: String,
  residentialArea: String,
  commercialArea: String,
  typeOfPlot: String,
  finalLandArea: String,

  //   ------------------NDMA  Schema ------------------
  natureOfBuilding: String,
  typeOfStructure: String,
  functionOfUse: String,
  heightOfBuilding: String,
  typeOfFoundation: String,
  horizontalFloorType: String,
  concreteGrade: String,
  steelGrade: String,
  seismicZone: String,
  soilSlopeLandslide: String,
  floodProneArea: String,
  urbanFloods: String,
  environmentExposure: String,
  tsunami: String,
  windCyclones: String,
  coastalRegulatoryZone: String,
  //   ------------------Building Details Schema ------------------
  //   ------------------Building Details Schema ------------------
  numberOfBlocks: {
    type: String,
  },
  numberOfLifts: {
    type: String,
  },
  ageOfBuilding: {
    type: String,
  },
  residualLife: {
    type: String,
  },
  unitConfiguration: {
    type: String,
  },
  floorsApproved: {
    type: String,
  },
  floorsProposed: {
    type: String,
  },
  floorsAtSite: {
    type: String,
  },
  //   ------------------Area Details Schema ------------------
  typeOfProperty: {
    type: String,
  },
  sanctionedArea: {
    type: String,
  },
  actualArea: {
    type: String,
  },
  finalAreaConsidered: {
    type: String,
  },
  overallBUA: {
    type: String,
  },
  //   ------------------Valuation Details Schema ------------------
  landValueArea: {
    type: String,
    default: "1981",
  },
  landValueRate: {
    type: String,
    default: "0",
  },
  landValueDepreciation: {
    type: String,
    default: "0",
  },
  landValueAmount: {
    type: String,
    default: "0",
  },
  buildingValueArea: {
    type: String,
    default: "0",
  },
  buildingValueRate: {
    type: String,
    default: "0",
  },
  buildingValueDepreciation: {
    type: String,
    default: "0",
  },
  buildingValueAmount: {
    type: String,
    default: "0",
  },
  improvementArea: {
    type: String,
    default: "0",
  },
  improvementRate: {
    type: String,
    default: "0",
  },
  improvementDepreciation: {
    type: String,
    default: "0",
  },
  improvementAmount: {
    type: String,
    default: "0",
  },
  amenitiesAvailable: {
    type: String,
    default: "Na",
  },
  detailsOnInteriors: {
    type: String,
    default: "Na",
  },
  amenitiesValue: {
    type: String,
    default: "0",
  },
  fixedInteriorsValue: {
    type: String,
    default: "0",
  },
  noOfCarParks: {
    type: String,
    default: "--",
  },
  valueOfCarPark: {
    type: String,
    default: "--",
  },
  totalValueOfCarParks: {
    type: String,
    default: "--",
  },
  totalRealisableValue: {
    type: String,
    default: "₹0",
  },
  //   ------------------Stage of Construction Schema ------------------
  constructionProgress: {
    type: String,
    default: "Stalled",
  },
  progressPercentage: {
    type: String,
    default: "0",
  },
  recommendedPercentage: {
    type: String,
    default: "0",
  },
  presentRealisableValue: {
    type: String,
    default: "₹0",
  },
  constructionStageDescription: {
    type: String,
    default: "OPEN LAND",
  },
  //   ------------------Other Value References Schema ------------------
  guidelineValue: {
    type: String,
    default: "",
  },
  forcedSaleValue: {
    type: String,
    default: "",
  },
  reconstructionCost: {
    type: String,
    default: "",
  },
  approxRentals: {
    type: String,
    default: "",
  },
  riskOfDemolition: {
    type: String,
    default: "",
  },
  offsetProjections: {
    type: String,
    default: "",
  },
  extraCoverage: {
    type: String,
    default: "",
  },
  habitation: {
    type: String,
    default: "",
  },
});
const adityaModel = mongoose.model("piramalModel", piramalSchema);

module.exports = adityaModel;

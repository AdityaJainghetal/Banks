const mongoose = require("mongoose");

const ValuationReportSchema = new mongoose.Schema({
  // HomeDetails fields
  customerName: {
    type: String,
    required: true,
  },
  customerNo: {
    type: String,
    required: true,
  },
  personMetDuringVisit: {
    type: String,
    required: true,
  },
  personContactNo: {
    type: String,
    required: true,
  },
  typeOfLoan: {
    type: String,
  },
  dateOfReport: {
    type: String,
  },
  refNo: {
    type: String,
  },
  evaluationType: {
    type: String,
  },
  unitType: {
    type: String,
  },
  documentsAvailable: {
    type: String,
  },
  image: {
    type: String,
  },

  // DocumentDetails fields
  addressLegal: {
    type: String,
    required: true,
  },
  addressSite: {
    type: String,
    required: true,
  },
  nearbyLandmark: {
    type: String,
  },
  projectPinCode: {
    type: String,
  },
  zone: {
    type: String,
    required: true,
  },
  projectState: {
    type: String,
    required: true,
  },
  nameOnSocietyBoard: {
    type: String,
  },
  nameOnDoor: {
    type: String,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  populationCensus2011: {
    type: String,
  },
  ruralUrban: {
    type: String,
    required: true,
  },
  statusOfOccupancy: {
    type: String,
    required: true,
  },
  occupiedBy: {
    type: String,
  },
  usageOfProperty: {
    type: String,
  },
  eraApplicable: {
    type: String,
  },
  ownershipType: {
    type: String,
    required: true,
  },
  numberAndDate: {
    type: String,
  },

  // ValuationDetailsComp fields
  document: {
    type: Number,
    required: true,
  },
  landAreaPlan: {
    type: Number,
  },
  landAreaSite: {
    type: Number,
    required: true,
  },
  landAreaGF: {
    type: Number,
  },
  builtUpAreaFF: {
    type: Number,
  },
  builtUpAreaSF: {
    type: Number,
  },
  landAreaForValuation: {
    type: Number,
    required: true,
  },
  landRate: {
    type: Number,
    required: true,
  },
  totalLandValuation: {
    type: Number,
    required: true,
  },
  constructionAreaForValuation: {
    type: Number,
  },
  constructionRate: {
    type: Number,
    required: true,
  },
  totalConstructionValuation: {
    type: Number,
    required: true,
  },
  fairMarketValue: {
    type: Number,
    required: true,
  },
  valueAfterCompletion: {
    type: Number,
    required: true,
  },
  presentStageValuation: {
    type: Number,
    required: true,
  },
  govtGuidelineValuation: {
    type: Number,
    required: true,
  },

  // PropertyFieldDetails fields
  directions: {
    North: {
      type: String,
    },
    South: {
      type: String,
    },
    East: {
      type: String,
    },
    West: {
      type: String,
    },
  },
  boundariesMatching: {
    type: String,
  },
  plotArea: {
    type: Number,
    required: true,
  },
  isPropertyWithinLimit: {
    type: String,
  },
  marketability: {
    type: String,
  },
  typeOfStructure: {
    type: String,
  },  
  unitFlatConfiguration: {
    type: String,
  },
  noOfFloorsPermissible: {
    type: String,
  },
  noOfUnitFlatOnEachFloor: {
    type: String,
  }, //!
  approxAgeOfProperty: {
    type: Number,
  },
  residualAge: {
    type: Number,
  },
  liftAvailable: {
    type: String,
  },
  constructionStage: {
    type: String,
  },
  qualityOfConstruction: {
    type: String,
  },
  noOfFloorsActual: {
    type: String,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
ValuationReportSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("ValuationReport", ValuationReportSchema);

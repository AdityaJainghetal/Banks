const mongoose = require("mongoose");

const ICICIModelSchema = new mongoose.Schema({
    status: { type: String
    },
    type: { type: String },

    technicalAdmin: { type: String },
    dateOfRequest: { type: String },
    channel: { type: String },
    branch: { type: String },
  
      number: { type: Number },
      name: { type: String },
      product:{ type: String },
      businessGroup: { type: String },
      requestFor: { type: String },
      selectedProduct: { type: String },
      requestId: { type: String },
  
  
        fileName:{ type: String },
        originalFileName:{ type: String },
        latitude:{ type: Number },
        longitude: { type: String },
        location: { type: String },
        imageTakenDate: { type: Number},
      
   
    
      propertyType: { type: String },
      unitType: { type: String },
      loan: { type: String },
      
        fullAddress: { type: String },
        nearestLandmark:{ type: String },
        legalAddress: { type: String },
        pin: { type: String },
    
     
        name: { type: String },
        salesManagerMobile: { type: String },
        applicantNames: { type: String },
        customerMobile: { type: String },
        requestInitiatorId:{ type: String },
        requestInitiatorName:{ type: String },
        east:{ type: String },
        west:{ type: String },

        north:{ type: String },

        sount:{ type: String },

  
      
        location: { type: String },
        direction: { type: String },
        carpetAreaAgreement: { type: String },
        saleDeedCopy: { type: String },
        carpetAreaApp: { type: String },
        propertyVisit: { type: String },
    ratePerSqft: { type: String },

        rateConfirmation: { type: String },
        description1: { type: String },
        govtApprovedRate: { type: String },
        area1: { type: String },
        amount2: { type: String },
        superArea: { type: String },
        areaForValuation: { type: String },
        boundariesMatching: { type: String },
        distanceFromOfficeKm: { type: Number },
        siteLocation: { type: String },
        asPerSaleDeed: { type: String },
        actualAtSite: { type: String },
   
    
      plotAreaSqFt: Number,
      approvedLandUse: { type: String },
      nameOfLocation: { type: String },
      propertyLocation: { type: String },
      propertyIdentification: { type: String },
      propertyType:{ type: String },
      propertyArea: { type: String },
      propertyAddress: { type: String },
      tncpLayoutPlan: { type: String },
      costOfConstruction: { type: Number },
      buildingEstimateCost: { type: Number },
      totalConstructionCost:{ type: Number },
      carpetAreaMeasured: { type: String },
      ownershipDocument: { type: String },
      otherObservations:  { type: String },
      propertyInNegativeArea:  { type: String },
      propertyInOGL:  { type: String },
      propertyInCautionArea:  { type: String },
      approvedMapPermission: { type: String },
      billingCriteria:{ type: String },
      virtualVisit: {type:Boolean},
      plotDemarcated:{type:Boolean},
      commercializedArea: {type:Boolean},
      classOfLocality: { type: String },
      distanceFromCityCenter: { type: Number },
      numberOfFloors: { type: Number },
      toBeBilled:  {type:Boolean},
     
      greenHousing: {type:Boolean},
      natureOfLocation: { type: String },
      roadWidth: { type: String },
      internet: { type: String },
      nationalizeLevel: { type: String },
      city:{type:String},
      structure: { type: String },
      exterior: { type: String },
      propertyAgeYears:{ type: Number },

   
      floor:{ type: String },
      rooms: { type: String },
      kitchens: { type: String },
      bathrooms:{ type: String },
      usageRemarks: { type: String },
      country: { type: String },
      state:{type:String},
    
      heightAboveGround: { type: String },
      floodProne: {type:Boolean},
      seismicZone: { type: String },
      crz: { type: String },
 
    
      status:{ type: String },
      customer: { type: String },
      occupiedSince:{ type: String },
   
  
      landAreaSqFt: { type: Number },
      carpetAreaSqFt: { type: Number },
      superBuiltUpSqFt: { type: Number },
      
     
          name: { type: String },
          area: { type: Number },
          rate: { type: Number },
          amount: { type: Number },
    
      landRatePerSqFt: { type: Number },
      constructedRatePerSqFt:{ type: Number },
      constructedArea: { type: Number },
      totalValue: { type: Number },
      totalValueInWords: String,
      govApprovedRate: { type: Number },
   
      floorwiseUsage: { type: String },
      structureDetails: { type: String },
      stageOfConstruction: { type: String },
      constructionStage: { type: String },
      constructionPercentage: { type: String },
      carParkingCount: { type: String },
      carParkingRate: { type: String },
      stageDescription:{ type: String },
      carParkingValue:{ type: String },
      totalAmenitiesCharges:{ type: String },
      percentCompleted: { type: Number },
      percentRecommended: { type: Number },
      totalMarketValue:{ type: String },
      forcedSaleValue:{ type: String },
      reconstructionCost:{ type: String },
      approxRentals:{ type: String },
      onlineRecordFound:{ type: String },
  
   
      observed: { type: String },
      remarks: { type: String },
  
  });

  const ICICIModel = mongoose.model("ICICIModel", ICICIModelSchema);
  
  module.exports = ICICIModel;
  
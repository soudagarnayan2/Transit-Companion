const serverless = require("serverless-http");
const { app } = require("../../src/phase1_realtime/subphase_1d_redis_api/server");

// Netlify serverless handler wrapping the Express application
module.exports.handler = serverless(app);

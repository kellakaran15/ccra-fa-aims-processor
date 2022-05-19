const MongoClient = require('../api/dbConnect');
const { config } = require('../config');
const { ObjectId } = require('mongodb')


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const mongoClient = await MongoClient;
    const db = await mongoClient.db(config.MONGO_DB);
    const collection = db.collection('ccraCase');

    var aimsPayload = {
        "version": 1,
        "fidId": req.body.fidId,
        "aimsStatus": req.body.aimsStatus,
        "aimsOutcome": req.body.aimsOutcome,
        "aimsComments": req.body.aimsComments,
        "fidData": FIDinfo
    };

    const FIDinfo = req.body.FIDInfo;

    const FIDInformation = await collection.updateOne({ "caseDetails.caseId": req.body.caseId }, { $set: { "aimsData": aimsPayload } });

    const responseMessage = FIDInformation;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

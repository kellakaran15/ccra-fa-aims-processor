const MongoClient = require('../api/dbConnect');
const { config } = require('../config');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const client = await MongoClient;
    const db = await client.db(config.MONGO_DB);
    const collection = db.collection('ccraCase');

    const taskList = await collection.updateOne({ "caseDetails.caseId": req.body.id }, { $set: { "aimsData.0.fidStatus": req.body.status } });
    const taskList2 = await collection.updateOne({ "caseDetails.caseId": req.body.id }, { $set: { "aimsData.0.fidNotes": req.body.notes } });
    responseMessage = taskList;

    context.res = {
        body: responseMessage
    };
}

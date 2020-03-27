/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authDynamink12b70ec9UserPoolId = process.env.AUTH_DYNAMINK12B70EC9_USERPOOLID
var storageDynaminkDBName = process.env.STORAGE_DYNAMINKDB_NAME
var storageDynaminkDBArn = process.env.STORAGE_DYNAMINKDB_ARN

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.TABLE_REGION});
const dynamodb = new AWS.DynamoDB();

let tableName = "dynamink_targets";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}
const partitionKeyName = "targetSite";

exports.handler = async (event) => {
    let queryParams = {
        TableName: tableName,
        Key: {
            [partitionKeyName]: {
                S: event.pathParameters.targetSite
            }
        },
        ProjectionExpression: "redirectUrl"
    }

    return dynamodb
        .getItem(queryParams)
        .promise()
        .then((result) => {
            console.log('result: ' + JSON.stringify(result))
            return {
                statusCode: 302,
                headers: {
                    Location: result.Item.redirectUrl.S
                }
            }
        });
};

const { GetMetricDataCommand } = require("@aws-sdk/client-cloudwatch");
const { cloudWatchClient, cloudWatchClientIni } = require("../libs/cloudwatchClient");
const { successResponse, errorResponse } = require("../utils/Response");
const { queryTest } = require("../config/test_metrics");
const { getMetricsDB } = require("../config/db_metrics");

exports.metricsDb = async(req, res) => {
    try {
        const cloudWatchClient = cloudWatchClientIni(req.sub);
        const params = {
            StartTime: new Date(req.query.start),
            EndTime: new Date(req.query.end),
            LabelOptions: {
                Timezone: "+0700" // Timezone for Asia/Jakarta
            },
            ScanBy: "TimestampAscending",
            MetricDataQueries: getMetricsDB(req.query.period)
        };
        const command = new GetMetricDataCommand(params);
        const response = await cloudWatchClient.send(command);
        return res.send(successResponse("OK", "Success get database metrics", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.metricsTest = async(req, res) => {
    try {
        const params = {
            StartTime: new Date('2022-06-23 20:50:00'),
            EndTime: new Date('2022-06-23 23:00:00'),
            LabelOptions: {
                Timezone: "+0700" // Timezone for Asia/Jakarta
            },
            MetricDataQueries: queryTest
        };
        const command = new GetMetricDataCommand(params);
        const response = await cloudWatchClient.send(command);
        return res.send(successResponse("OK", "Success get metrics test", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

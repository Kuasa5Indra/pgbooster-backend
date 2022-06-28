// Below is just testing purposes

const queryTest = [
    {
        Id: "m1",
        Label: "DB Connections",
        MetricStat: {
            Period: 300,
            Stat: "SampleCount",
            Unit: "Count",
            Metric: {
                MetricName: "DatabaseConnections",
                Namespace: "AWS/RDS",
                Dimensions: [
                    {
                        Name: "DBInstanceIdentifier",
                        Value: "rds-pg-labs"
                    }
                ]
            }
        }
    },
    {
        Id: "m2",
        Label: "CPU Utilization",
        MetricStat: {
            Period: 300,
            Stat: "p99",
            Unit: "Percent",
            Metric: {
                MetricName: "CPUUtilization",
                Namespace: "AWS/RDS",
                Dimensions: [
                    {
                        Name: "DBInstanceIdentifier",
                        Value: "rds-pg-labs"
                    }
                ]
            }
        }
    }
];

module.exports = { queryTest }

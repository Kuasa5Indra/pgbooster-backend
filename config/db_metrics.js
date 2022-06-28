const getMetricsDB = (period = 300) => {
    return [
        {
            Id: "m1",
            Label: "DB Connections",
            MetricStat: {
                Period: period,
                Stat: "SampleCount",
                Unit: "Count",
                Metric: {
                    MetricName: "DatabaseConnections",
                    Namespace: "AWS/RDS"
                }
            }
        },
        {
            Id: "m2",
            Label: "CPU Utilization",
            MetricStat: {
                Period: period,
                Stat: "p99",
                Unit: "Percent",
                Metric: {
                    MetricName: "CPUUtilization",
                    Namespace: "AWS/RDS"
                }
            }
        },
        {
            Id: "m3",
            Label: "Free Storage Space",
            MetricStat: {
                Period: period,
                Stat: "Average",
                Unit: "Bytes",
                Metric: {
                    MetricName: "FreeStorageSpace",
                    Namespace: "AWS/RDS"
                }
            }
        },
        {
            Id: "m4",
            Label: "Free Memory",
            MetricStat: {
                Period: period,
                Stat: "Average",
                Unit: "Bytes",
                Metric: {
                    MetricName: "FreeableMemory",
                    Namespace: "AWS/RDS"
                }
            }
        },
        {
            Id: "m5",
            Label: "Write IOPS",
            MetricStat: {
                Period: period,
                Stat: "SampleCount",
                Unit: "Count/Second",
                Metric: {
                    MetricName: "WriteIOPS",
                    Namespace: "AWS/RDS"
                }
            }
        },
        {
            Id: "m6",
            Label: "Read IOPS",
            MetricStat: {
                Period: period,
                Stat: "SampleCount",
                Unit: "Count/Second",
                Metric: {
                    MetricName: "ReadIOPS",
                    Namespace: "AWS/RDS"
                }
            }
        },
    ];
}

module.exports = { getMetricsDB }

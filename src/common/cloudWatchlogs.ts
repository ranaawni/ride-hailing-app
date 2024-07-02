// import AWS from 'aws-sdk';
// import winston from 'winston';
// import WinstonCloudWatch from 'winston-cloudwatch';

// import * as dotenv from 'dotenv';
// dotenv.config();

// AWS.config.update({ region: process.env.AWS_REGION, accessKeyId:process.env.AWS_ACCESS_KEY_ID, secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY});

// const cloudwatchLogs = new AWS.CloudWatchLogs({ apiVersion: '2014-03-28' });

// export const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new WinstonCloudWatch({
//       logGroupName: 'ride-hailing-ec2', 
//       logStreamName: 'ride-ec2-stream', 
//       awsRegion: process.env.AWS_REGION ,
//       awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       awsSecretKey:process.env.AWS_SECRET_ACCESS_KEY,

//     }),
//   ],
// });


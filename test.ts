import { ChzzkConnector } from "./lib/index";

const chzzkConnector = new ChzzkConnector({
  nidAuth: "Q2MFEjdW4h4Z+XbgFG09TVW0mSkTKmBCsPdXK/Ho5eyX1+3CW5N/XUqIPJ0/GbqF",
  nidSession:
    "AAABsBdVDfOQnlYGlx9+4kUtj9xTYbsO9oj12SwCX8bfZKiCPmQ2noCqYHossMYvLC928jx6d4esj9jmiows+yUIxHLOSYfAlwtoWacqyxMlQGQg+D8QYmW948GrDxhLOd3EqvEcOwuE+pg7hIRlQ17zfMHh82odGf0tbf4ssX2GSdsLWzysm4Ao0LtkZL2C2jKdsvOodnKLPMlJJ3WLRmf0sO4+cpYrRcDmHhEYsdVcNYl+IVtrI6bXAyJ2H7aH4ux57NQor2X4BWxphX+H2YDRI7UyC5A9iE2cfPZXvVv8ujt9mccLmLCCK2Ql22SJlqsIX3GYy2f5oRZ5EZHBa+6xcGtDQujZELrwu5OZ5IJVKNtDX331Eiu3WoEjwnIiVeAFxXixYsdJWGMqf1sV5Cwhw33NdqKHCvwQ9xgNmaVwnq5LYYTK+NLdkCQ5V/roqTfbYQCmNJCCnwkK0LSY/k0cGrI0Uzwi333s8iAUrjgLKl9w/yDADlsKS3Z721hcrZ0oVAWWO6qK/tjZd+YGioJRw4lFK7SUlyL/bnQ1X+2b7Uvutqm+l70n9u7LymYrfIacaw==",
  userAgent: "chzzk-z-lib",
});

chzzkConnector.connect();
find();
async function find() {
  //   const channels = await chzzkConnector.channel.find("녹두로");
  //   console.log(chzzkConnector.channel);

  //   for (const channel of channels["data"]) {
  //     console.log(channel);
  //   }

  const channel = await chzzkConnector.channel.findById(
    "6e06f5e1907f17eff543abd06cb62891"
  );

  console.log(channel);
}

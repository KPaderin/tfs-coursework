const logger = async (reqType, request, context) => {
  const query = JSON.stringify(request);
  const log = { query: { [reqType]: query, context }, timeStamp: new Date() };
  console.log(log);
};

export default logger;

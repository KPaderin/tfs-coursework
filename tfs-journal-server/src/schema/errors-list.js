import { GraphQLError } from 'graphql';

const errorHandler = (errorMessage) => new GraphQLError(errorMessage);

const errorsList = {
  isNotAdmin: errorHandler('you would be moderator for publish it'),
  isNotAuthorization: errorHandler('is Not Authorization'),
};

export default errorsList;

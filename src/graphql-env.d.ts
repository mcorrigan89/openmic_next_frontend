/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: {
    'Boolean': unknown;
    'CreateUserPayload': { kind: 'INPUT_OBJECT'; name: 'CreateUserPayload'; isOneOf: false; inputFields: [{ name: 'givenName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'familyName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'CreateUserResult': { kind: 'UNION'; name: 'CreateUserResult'; fields: {}; possibleTypes: 'EmailUnavailable' | 'User'; };
    'EmailUnavailable': { kind: 'OBJECT'; name: 'EmailUnavailable'; fields: { 'code': { name: 'code'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Float': unknown;
    'GraphError': { kind: 'INTERFACE'; name: 'GraphError'; fields: { 'code': { name: 'code'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; possibleTypes: 'EmailUnavailable' | 'InvalidCredentials' | 'UserNotFound'; };
    'ID': unknown;
    'Int': unknown;
    'InvalidCredentials': { kind: 'OBJECT'; name: 'InvalidCredentials'; fields: { 'code': { name: 'code'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'authenticateWithGoogleCode': { name: 'authenticateWithGoogleCode'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'UNION'; name: 'UserSessionResult'; ofType: null; }; } }; 'authenticateWithPassword': { name: 'authenticateWithPassword'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'UNION'; name: 'UserSessionResult'; ofType: null; }; } }; 'createUser': { name: 'createUser'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'UNION'; name: 'CreateUserResult'; ofType: null; }; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { '_service': { name: '_service'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: '_Service'; ofType: null; }; } }; 'me': { name: 'me'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'UNION'; name: 'UserResult'; ofType: null; }; } }; 'userByID': { name: 'userByID'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'UNION'; name: 'UserResult'; ofType: null; }; } }; }; };
    'String': unknown;
    'User': { kind: 'OBJECT'; name: 'User'; fields: { 'avatarUrl': { name: 'avatarUrl'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'email': { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'familyName': { name: 'familyName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'givenName': { name: 'givenName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; }; };
    'UserNotFound': { kind: 'OBJECT'; name: 'UserNotFound'; fields: { 'code': { name: 'code'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'UserResult': { kind: 'UNION'; name: 'UserResult'; fields: {}; possibleTypes: 'User' | 'UserNotFound'; };
    'UserSession': { kind: 'OBJECT'; name: 'UserSession'; fields: { 'expiresAt': { name: 'expiresAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'token': { name: 'token'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'UserSessionResult': { kind: 'UNION'; name: 'UserSessionResult'; fields: {}; possibleTypes: 'InvalidCredentials' | 'UserNotFound' | 'UserSession'; };
    '_Any': unknown;
    '_FieldSet': unknown;
    '_Service': { kind: 'OBJECT'; name: '_Service'; fields: { 'sdl': { name: 'sdl'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}
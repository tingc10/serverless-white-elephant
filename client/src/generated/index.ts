import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
  getUserRooms: Array<Room>;
  getRoomMeta: Room;
  getRoomGifts: Array<Gift>;
  getRoomGift: Gift;
  getRoomUsers: Array<User>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUserRoomsArgs = {
  userId: Scalars['String'];
};


export type QueryGetRoomMetaArgs = {
  roomCode: Scalars['String'];
};


export type QueryGetRoomGiftsArgs = {
  roomCode: Scalars['String'];
};


export type QueryGetRoomGiftArgs = {
  giftId: Scalars['String'];
  roomCode: Scalars['String'];
};


export type QueryGetRoomUsersArgs = {
  roomCode: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  userId: Scalars['ID'];
  nickname: Scalars['String'];
  address: Address;
};

export type Address = {
  __typename?: 'Address';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  zipCode: Scalars['Float'];
};

export type Room = {
  __typename?: 'Room';
  roomCode: Scalars['ID'];
  roomName: Scalars['String'];
  gameOptions: Array<Maybe<Scalars['String']>>;
  unselectedTokens?: Maybe<Array<Scalars['String']>>;
  turnIndex?: Maybe<Scalars['Float']>;
  totalParticipants: Scalars['Float'];
  lastRobbedUser: Scalars['String'];
  stealsInRound: Scalars['Float'];
};

export type Gift = {
  __typename?: 'Gift';
  giftId: Scalars['ID'];
  productUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  lastRoundStolen: Scalars['Float'];
  ownerId: Scalars['String'];
  roomCode: Scalars['String'];
  recipientId?: Maybe<Scalars['String']>;
  isRevealed: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateNickname: User;
  updateAddress: User;
  addUser: Scalars['String'];
  createRoom: Room;
  setUserTurnIndex: Scalars['Float'];
  startGame: Room;
  addGiftAndUserToRoom: Gift;
  takeGiftFromUnrevealed: Gift;
  stealGiftFromUser: Gift;
};


export type MutationUpdateNicknameArgs = {
  nickname?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationUpdateAddressArgs = {
  address: AddressInput;
  id: Scalars['String'];
};


export type MutationAddUserArgs = {
  id: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  gameOptions?: Maybe<Array<Scalars['String']>>;
  roomName: Scalars['String'];
  hostId: Scalars['String'];
};


export type MutationSetUserTurnIndexArgs = {
  turnToken: Scalars['String'];
  userId: Scalars['String'];
  roomCode: Scalars['String'];
};


export type MutationStartGameArgs = {
  roomCode: Scalars['String'];
};


export type MutationAddGiftAndUserToRoomArgs = {
  giftInfo: GiftInput;
  roomCode: Scalars['String'];
  ownerId: Scalars['String'];
};


export type MutationTakeGiftFromUnrevealedArgs = {
  roomCode: Scalars['String'];
  userId: Scalars['String'];
  giftId: Scalars['String'];
};


export type MutationStealGiftFromUserArgs = {
  turnIndex: Scalars['Float'];
  roomCode: Scalars['String'];
  userId: Scalars['String'];
  giftId: Scalars['String'];
};

export type AddressInput = {
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  zipCode: Scalars['Float'];
};

export type GiftInput = {
  name: Scalars['String'];
  productUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateRoomMutationVariables = Exact<{
  hostId: Scalars['String'];
  roomName: Scalars['String'];
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'Room' }
    & Pick<Room, 'roomName'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addUser'>
);

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'nickname'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zipCode'>
    ) }
  ) }
);

export type GetUserRoomsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserRoomsQuery = (
  { __typename?: 'Query' }
  & { getUserRooms: Array<(
    { __typename?: 'Room' }
    & Pick<Room, 'roomCode'>
  )> }
);


export const CreateRoomDocument = gql`
    mutation CreateRoom($hostId: String!, $roomName: String!) {
  createRoom(roomName: $roomName, hostId: $hostId) {
    roomName
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      hostId: // value for 'hostId'
 *      roomName: // value for 'roomName'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, baseOptions);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($userId: String!) {
  addUser(id: $userId)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(id: $userId) {
    userId
    nickname
    address {
      addressLine1
      addressLine2
      city
      state
      zipCode
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserRoomsDocument = gql`
    query GetUserRooms($userId: String!) {
  getUserRooms(userId: $userId) {
    roomCode
  }
}
    `;

/**
 * __useGetUserRoomsQuery__
 *
 * To run a query within a React component, call `useGetUserRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserRoomsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserRoomsQuery(baseOptions: Apollo.QueryHookOptions<GetUserRoomsQuery, GetUserRoomsQueryVariables>) {
        return Apollo.useQuery<GetUserRoomsQuery, GetUserRoomsQueryVariables>(GetUserRoomsDocument, baseOptions);
      }
export function useGetUserRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserRoomsQuery, GetUserRoomsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserRoomsQuery, GetUserRoomsQueryVariables>(GetUserRoomsDocument, baseOptions);
        }
export type GetUserRoomsQueryHookResult = ReturnType<typeof useGetUserRoomsQuery>;
export type GetUserRoomsLazyQueryHookResult = ReturnType<typeof useGetUserRoomsLazyQuery>;
export type GetUserRoomsQueryResult = Apollo.QueryResult<GetUserRoomsQuery, GetUserRoomsQueryVariables>;
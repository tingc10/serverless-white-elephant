import { gql } from '@apollo/client';
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

interface ItemKeys {
  pk: string;
  sk: string;
}

interface ExpressionKeys {
  ':pk': string;
  ':sk': string;
}

const generateKeys = (
  pk: string,
  sk: string,
  asExpressionAttributes: boolean,
): ItemKeys | ExpressionKeys => {
  if (asExpressionAttributes) {
    return {
      ':pk': pk,
      ':sk': sk,
    };
  }
  return {
    pk,
    sk,
  };
};

export const getRoomKeys = (
  roomCode: string,
  asExpressionAttributes?: boolean,
): ItemKeys | ExpressionKeys =>
  generateKeys(
    `RoomCode-${roomCode}`,
    `RoomMeta-${roomCode}`,
    asExpressionAttributes,
  );

export const getUserKeys = (
  userId: string,
  asExpressionAttributes?: boolean,
): ItemKeys | ExpressionKeys =>
  generateKeys(
    `UserId-${userId}`,
    `UserMeta-${userId}`,
    asExpressionAttributes,
  );

export const getRoomUsersKeys = (
  roomCode: string,
  userId: string,
  asExpressionAttributes?: boolean,
): ItemKeys | ExpressionKeys =>
  generateKeys(
    `RoomCode-${roomCode}`,
    `UserId-${userId}`,
    asExpressionAttributes,
  );

export const getRoomGiftsKeys = (
  roomCode: string,
  giftId: string,
  asExpressionAttributes?: boolean,
): ItemKeys | ExpressionKeys =>
  generateKeys(
    `RoomCode-${roomCode}`,
    `GiftId-${giftId}`,
    asExpressionAttributes,
  );

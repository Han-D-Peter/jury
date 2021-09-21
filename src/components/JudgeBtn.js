import { authService, dbService, firebaseInstance } from "firebaseInit";
import React from "react";

const JudgeBtn = ({ id, leftArray, rightArray }) => {
  const toggleLeftSide = async event => {
    event.preventDefault();
    const user = authService.currentUser;
    const content = await dbService.doc(`incidents/${id}`);
    if (rightArray.includes(user.uid)) {
      await content.update({
        rightSide: firebaseInstance.firestore.FieldValue.arrayRemove(user.uid),
        leftSide: firebaseInstance.firestore.FieldValue.arrayUnion(user.uid),
      });
    } else if (leftArray.includes(user.uid)) {
      await content.update({
        leftSide: firebaseInstance.firestore.FieldValue.arrayRemove(user.uid),
      });
    } else {
      await content.update({
        leftSide: firebaseInstance.firestore.FieldValue.arrayUnion(user.uid),
      });
    }
  };

  const toggleRightSide = async event => {
    event.preventDefault();
    const user = authService.currentUser;
    const content = await dbService.doc(`incidents/${id}`);
    if (leftArray.includes(user.uid)) {
      await content.update({
        leftSide: firebaseInstance.firestore.FieldValue.arrayRemove(user.uid),
        rightSide: firebaseInstance.firestore.FieldValue.arrayUnion(user.uid),
      });
    } else if (rightArray.includes(user.uid)) {
      await content.update({
        rightSide: firebaseInstance.firestore.FieldValue.arrayRemove(user.uid),
      });
    } else {
      await content.update({
        rightSide: firebaseInstance.firestore.FieldValue.arrayUnion(user.uid),
      });
    }
  };
  return (
    <>
      <button onClick={toggleLeftSide}>유죄</button>
      <span>유죄: {leftArray.length}</span>
      <button onClick={toggleRightSide}>무죄</button>
      <span>무죄: {rightArray.length}</span>
    </>
  );
};

export default JudgeBtn;

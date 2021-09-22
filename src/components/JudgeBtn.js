import { authService, dbService, firebaseInstance } from "firebaseInit";
import React from "react";
import { ImHammer2, ImFire } from "react-icons/im";
import { BsCheck } from "react-icons/bs";
import styled from "styled-components";

const NotGuiltyBar = styled.div`
  width: ${props => (200 * props.amount) / 100}px;
  height: 15px;
  background-color: #485ae2;
  border-radius: 10px 0px 0px 10px;
  padding: 1px 0px 1px 0px;
`;

const GuiltyBar = styled.div`
  height: 15px;
  width: ${props => (200 * props.amount) / 100}px;
  background-color: #c84e4e;
  border-radius: 0px 10px 10px 0px;
  padding: 1px 0px 1px 0px;
`;

const JudgeBtn = ({ id, userObj, leftArray, rightArray }) => {
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
      <div
        style={{
          padding: "0px 20px 0px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {leftArray.includes(userObj.uid) ? (
            <button
              onClick={toggleLeftSide}
              style={{
                border: "1px solid #c94e4e",
                backgroundColor: "white",
                width: "110px",
                color: "Black",
                padding: "5px",
                borderRadius: "10px",
                marginLeft: "5px",
              }}
            >
              <BsCheck size={13} />
              <ImHammer2 color={"black"} />
              <span> Guilty</span>
            </button>
          ) : (
            <button
              onClick={toggleLeftSide}
              style={{
                border: "0px solid #1D1D1D",
                backgroundColor: "#c94e4e",
                width: "110px",
                color: "white",
                padding: "5px",
                borderRadius: "10px",
                marginLeft: "5px",
              }}
            >
              <ImHammer2 color={"white"} />
              <span> Guilty</span>
            </button>
          )}
          <GuiltyBar
            amount={
              leftArray.length + rightArray.length > 0
                ? (
                    leftArray.length /
                    (leftArray.length + rightArray.length)
                  ).toFixed(4) * 100
                : 0
            }
          >
            <span
              style={{
                color: "white",
                fontSize: 12,
                float: "right",
                marginRight: "10px",
              }}
            >
              {leftArray.length + rightArray.length > 0 && leftArray.length > 0
                ? (
                    leftArray.length /
                    (leftArray.length + rightArray.length)
                  ).toFixed(4) *
                    100 +
                  "%"
                : null}
            </span>
          </GuiltyBar>
          <div style={{ marginLeft: "3px" }}>
            {leftArray.length + rightArray.length > 0 ? (
              <ImFire size={25} color={"red"} />
            ) : null}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NotGuiltyBar
            amount={
              leftArray.length + rightArray.length > 0
                ? (
                    rightArray.length /
                    (leftArray.length + rightArray.length)
                  ).toFixed(4) * 100
                : 0
            }
          >
            <span
              style={{
                color: "white",
                fontSize: 12,
                float: "left",
                marginLeft: "10px",
              }}
            >
              {leftArray.length + rightArray.length > 0 && rightArray.length > 0
                ? (
                    rightArray.length /
                    (leftArray.length + rightArray.length)
                  ).toFixed(4) *
                    100 +
                  "%"
                : null}
            </span>
          </NotGuiltyBar>
          {rightArray.includes(userObj.uid) ? (
            <button
              onClick={toggleRightSide}
              style={{
                border: "1px solid #485ae2",
                backgroundColor: "white",
                width: "110px",
                color: "black",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <BsCheck size={13} />
              <ImHammer2 />
              <span> Not Guilty</span>
            </button>
          ) : (
            <button
              onClick={toggleRightSide}
              style={{
                border: "0px solid #1D1D1D",
                backgroundColor: "#485ae2",
                width: "110px",
                color: "white",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <ImHammer2 />
              <span> Not Guilty</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default JudgeBtn;

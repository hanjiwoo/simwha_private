import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import fakeData from "fakeData.json";

// 팬레터 추가
// const ADD_LETTER = "letters/ADD_LETTER";
// 팬레터 삭제
// const DELETE_LETTER = "letters/DELETE_LETTER";
// 팬레터 수정
// const EDIT_LETTER = "letters/EDIT_LETTER";

// export const addLetter = (payload) => {
//   return { type: ADD_LETTER, payload };
// };
// export const deleteLetter = (payload) => {
//   return { type: DELETE_LETTER, payload };
// };
// export const editLetter = (payload) => {
//   return { type: EDIT_LETTER, payload };
// };

let initialState = fakeData;
const fetchletters = async () => {
  const { data } = await axios.get("http://localhost:5000/letters");
  initialState = data;
};
fetchletters();
// const letters = (state = initialState, action) => {
//   switch (action.type) {

//     case ADD_LETTER:
//       const newLetter = action.payload;
//       return [newLetter, ...state];
//     case DELETE_LETTER:
//       const letterId = action.payload;
//       return state.filter((letter) => letter.id !== letterId);
//     case EDIT_LETTER:
//       const { id, editingText } = action.payload;
//       return state.map((letter) => {
//         if (letter.id === id) {
//           return { ...letter, content: editingText };
//         }
//         return letter;
//       });
//     default:
//       return state;
//   }
// };

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      fetchletters();
      return [newLetter, ...state];
    },
    deleteLetter: (state, action) => {
      const letterId = action.payload;
      fetchletters();
      return state.filter((letter) => letter.id !== letterId);
    },
    editLetter: (state, action) => {
      const { id, editingText } = action.payload;
      fetchletters();
      return state.map((letter) => {
        if (letter.id === id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    },
  },
});

export default lettersSlice.reducer;
export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;

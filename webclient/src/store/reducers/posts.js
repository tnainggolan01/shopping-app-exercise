const initialState = Object.freeze([]);

/*
state = [
  postItem, postItem, ...
]
postItem = {
  _id: String,
  content: String,
  author: String,
  createdAt: String,
}
*/

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_POSTS": {
      let postToAdd = [];
      for (let i = 0; i < payload.length; i++) {
        if (!state.find((post) => post._id === payload[i]._id)) {
          postToAdd.push(payload[i]);
        }
      }
      return state.concat(postToAdd);
    }
    case "ADD_POST_ITEM": {
      if (state.find((post) => post._id === payload._id)) {
        return state;
      }
      return state.concat(payload);
    }
    case "REMOVE_POST_ITEM": {
      return state.filter((post) => post._id !== payload._id);
    }
    case "RESET_POSTS": {
      return Object.freeze([]);
    }
    case "UPDATE_POST_ITEM": {
      return state.map((post) => {
        if (post._id !== payload._id) {
          return post;
        }
        return {
          ...post,
          ...payload,
        };
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;

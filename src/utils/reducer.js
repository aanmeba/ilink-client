export const reducer = (state, action) => {
  switch (action.type) {
    case "setLoggedInUser":
      return {
        ...state,
        loggedInUser: action.data,
      };
    case "setToken":
      return {
        ...state,
        token: action.data,
      };
    case "setCurrentUserId":
      return {
        ...state,
        currentUserId: action.data,
      };
    case "setLinks":
      return {
        ...state,
        links: action.data,
      };
    case "addLink":
      return {
        ...state,
        links: [action.data, ...state.links],
      };
    case "setALink":
      let currentLink = {
        ...state.currentLink,
        [action.data.name]: action.data.value,
      };
      return {
        ...state,
        links: [currentLink, ...state.links],
      };
    case "updateLinks":
      let updatedItem = state.links.map((item) =>
        item.id === action.data.id ? action.data : item
      );
      return {
        ...state,
        links: updatedItem,
      };
    case "removeLink":
      let deletedItem = state.links.filter((item) => item.id !== action.data);
      return {
        ...state,
        links: deletedItem,
      };
    // case "setUploadImage":
    //   let appearanceWithImage = {
    //     ...state.appearance,
    //     picture_name: action.data.original_filename,
    //     picture_url: action.data.url,
    //   };
    //   return {
    //     ...state,
    //     appearance: appearanceWithImage,
    //   };
    case "setAppearance":
      return {
        ...state,
        appearance: action.data,
      };
    case "editAppearance":
      let updatedAppearance = {
        ...state.appearance,
        [action.data.name]: action.data.value,
      };
      return {
        ...state,
        appearance: updatedAppearance,
      };
    case "resetAppearance":
      let initialData = {
        profile_title: "",
        bg_color: "",
        bio: "",
        uploaded_picture_url: "",
        picture_url: "",
      };
      return {
        ...state,
        appearance: initialData,
      };
    default:
      throw new Error(`unknown action.type: ${action.type}`);
  }
};

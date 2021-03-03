const baseURL = 'https://media-new.mw.metropolia.fi/wbma/';
const mediaURL = baseURL + 'media/';
const commentURL = baseURL + 'comments/';
const favoriteURL = baseURL + 'favourites/';
const tagURL = baseURL + 'tags/';
const userURL = baseURL + 'users/';
const uploadsURL = baseURL + 'uploads/';
const loginURL = baseURL + 'login/';

// All the tags of the app use this as the base
const appTag = 'ofcapp_';

/*
  The application has a tag system for the posts. Users of the application
  can choose tags for their uploaded posts, which are meant to categorize the
  posts and provide discover functionality.

  There is a hidden post uploaded in the server, with id: allTagsId. This
  post contains these categorizing tags of the application.

  Whenever an user creates a post, they can choose existing category tags
  to be used for the post. If the tag they wish to use does not exist already,
  they can create a new one. The application uploads it to the users' post
  and this hidden post.

  Whenever we need to see the tags of the application, we use a method in ApiHooks
  which returns all the tags in this hidden post.
*/
const allTagsId = '402';

export {
  mediaURL,
  commentURL,
  favoriteURL,
  tagURL,
  userURL,
  appTag,
  uploadsURL,
  loginURL,
  allTagsId,
};

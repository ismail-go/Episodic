const Store = require('flux/utils').Store,
      StoryConstants = require('../constants/story_constants'),
      AppDispatcher = require('../dispatcher/dispatcher');

let _stories = {};
let _latestStory = {};

const StoryStore = new Store(AppDispatcher);
// window.StoryStore = StoryStore;

StoryStore.all = () => {
  let storiesArr = [];
  for (var id in _stories) {
    if (_stories.hasOwnProperty(id)) {
      storiesArr.push(_stories[id]);
    }
  }
  return storiesArr;
};

StoryStore.latestStory = () => {
  let story = Object.assign({}, _latestStory);
  _latestStory = {};
  return story;
};

StoryStore.find = (id) => {
  return Object.assign({}, _stories[id]);
};

let resetAllStories = (stories) => {
  _stories = stories;
  StoryStore.__emitChange();
};

let removeStory = (id) => {
  delete _stories[id];
  StoryStore.__emitChange();
};

let resetSingleStory = (story) => {
  _latestStory = story;
  _stories[story.id] = story;
  StoryStore.__emitChange();
};

StoryStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case StoryConstants.STORIES_RECEIVED:
      resetAllStories(payload.stories);
      break;
    case StoryConstants.STORY_RECEIVED:
      resetSingleStory(payload.story);
      break;
    case StoryConstants.STORY_REMOVED:
      removeStory(payload.id);
      break;
  }
};

module.exports = StoryStore;

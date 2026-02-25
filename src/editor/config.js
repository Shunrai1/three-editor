const Host = "/three-editor/files/";

export const fetchResource = (url) => {
  return fetch(url + "index.json").then((res) => res.json());
};

const _Config = {
  skyUrl: "scene/",

  buildUrl: "resource/",

  editorJsonUrl: "editorJson/",

  fontUrl: "font/",

  channelUrl: "channels/",

  iconUrl: "icon/",

  videoUrl: "video/",
};

export const Config = Object.keys(_Config).reduce((acc, key) => {
  acc[key] = Host + _Config[key];

  return acc;
}, {});

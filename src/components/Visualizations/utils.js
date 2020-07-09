import { nest } from "d3";
import { stopWords } from "./constants";

export const colors = {
  Employment: "#672BA0",
  "Clean Energy": "#009986",
  Health: "#234B84",
  "Digital Entertainment": "#EDB400",
  Cities: "#EA3DB9",
  Economy: "#D33333",
  Environment: "#6A7BCE",
  Science: "#49890B",
  Education: "#FC892B",
};

export const tents = {
  Employment: "https://gaseatio.sirv.com/campus/barraca-roxa.png",
  "Clean Energy": "https://gaseatio.sirv.com/campus/barraca-verde.png",
  Health: "https://gaseatio.sirv.com/campus/barraca-azul.png",
  "Digital Entertainment":
    "https://gaseatio.sirv.com/campus/barraca-amarela.png",
  Cities: "https://gaseatio.sirv.com/campus/barraca-rosa.png",
  Economy: "https://gaseatio.sirv.com/campus/barraca-vermelha.png",
  Environment: "https://gaseatio.sirv.com/campus/barraca-azul-claro.png",
  Science: "https://gaseatio.sirv.com/campus/barraca-verde-escuro.png",
  Education: "https://gaseatio.sirv.com/campus/barraca-laranja.png",
};

export const parseTreemapData = (data, filterType, filter) => {
  if (!data) return [];
  var nested_data = nest()
    .key(function (d) {
      return d.topic;
    })
    .rollup(function (leaves) {
      return leaves.length;
    })
    .entries(data);
  let parsedData = [{ group: "Origin", parent: "", value: "" }];

  nested_data.map((d) =>
    parsedData.push({ group: d.key, parent: "Origin", value: d.value })
  );

  parsedData["total"] = nested_data.reduce((a, b) => ({
    value: a.value + b.value,
  }));

  return parsedData;
};

export const parseWordcloudData = (data, languageFilter, categoryFilter) => {
  let words = data.map((d) => {
    return { text: d.idea, category: d.topic, language: d.language };
  });

  if (languageFilter)
    words = words.filter((d) => d.language === languageFilter);
  if (categoryFilter)
    words = words.filter((d) => d.category === categoryFilter);

  let arrayOfArraysOfWords = words.map((datapoint) => {
    return datapoint.text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(/\W+/)
      .map((text) => {
        return { word: text, category: datapoint.category };
      });
  });

  let arrayOfWords = arrayOfArraysOfWords.flat().filter((d) => {
    return d.word.length > 2 && isNaN(d.word) && stopWords.indexOf(d.word) < 0;
  });

  let keys = [];

  let counts = arrayOfWords.reduce(function (obj, d) {
    if (!obj[d.word]) {
      obj[d.word] = { value: 0, category: d.category };
      keys.push(d.word);
    }
    obj[d.word].value++;
    return obj;
  }, {});

  let parsedData = Object.keys(counts)
    .map((key) => {
      return {
        word: key,
        count: counts[key].value,
        category: counts[key].category,
      };
    })
    .filter((d) => d.count > 0);

  return parsedData;
};

export const parseSubtitleData = (data) => {
  let arr;
  let column = "topic";
  arr = data.map(function (d) {
    return d[column];
  });

  let j = {};

  arr.forEach(function (v) {
    j[v + "::" + typeof v] = v;
  });

  return Object.keys(j).map(function (v) {
    return j[v];
  });
};

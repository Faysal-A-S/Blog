const textShortner = (text) => {
  if (text.length > 15) {
    let newText = text.slice(0, 50) + "...";
    return newText;
  } else {
    return text;
  }
};

export default textShortner;

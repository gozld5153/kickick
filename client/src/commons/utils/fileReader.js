export const fileReader = (event, handler) => {
  const {
    target: { files },
  } = event;
  const theFile = files[0];
  const reader = new FileReader();

  if (theFile) {
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      return handler(theFile, result);
    };
  }
};

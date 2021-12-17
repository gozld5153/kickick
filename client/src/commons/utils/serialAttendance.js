export const serialAttendacne = (data) => {
  let count = 1;
  for (let i = 0; i < data.length - 1; i++) {
    if (
      (Date.parse(data[i].created_at.slice(0, 10)) -
        Date.parse(data[i + 1].created_at.slice(0, 10))) /
        3600000 ===
      24
    ) {
      count++;
    }
  }

  return count;
};

// Doing this, just to get id field for a drop doc
// using mongo-cursor-pagination is not giving virtuals, so that's why going
// with this way
export const addIdField = (results: { [key: string]: any }[]) => {
  let data = [];
  for (let i = 0; i < results.length; i++) {
    data.push({ ...results[i], id: results[i]._id });
  }
  return data;
};

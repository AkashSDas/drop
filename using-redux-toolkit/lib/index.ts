export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface IRunAsync {
  result: any;
  error: any;
}

export const runAsync = async (promise: Promise<any>): Promise<IRunAsync> => {
  try {
    const result = await promise;
    return { result: result, error: null };
  } catch (err) {
    return { result: null, error: err };
  }
};

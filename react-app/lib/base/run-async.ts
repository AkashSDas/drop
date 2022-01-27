interface IAsyncResult {
  error: any;
  result: any;
}

const runAsync = async (promise: Promise<any>): Promise<IAsyncResult> => {
  try {
    const result = await promise;
    return { result: result, error: null };
  } catch (err) {
    return { result: null, error: err };
  }
};

export default runAsync;

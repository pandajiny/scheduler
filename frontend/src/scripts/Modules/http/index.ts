export const parseErrorResponse = (
  err: any
): { status: number; message: string } => {
  return {
    status: err.response.status,
    message: err.response.data,
  };
};

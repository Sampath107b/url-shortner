

const errorHandler = (err,req,res,next) => {
  let statusCode=err.statusCode || res.statusCode || 500;
  if (err.name ==='CastErroe' && err.kind==='ObjectId'){
    statusCode=404;
    err.message='Resource not found';
  }
  console.error(err.stack);
  res.status(statusCode).json({
    success: false,
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export default errorHandler
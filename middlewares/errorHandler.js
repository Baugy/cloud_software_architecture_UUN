// errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('⚠️ Validation Error:', err.message || err);
  
    if (err.name === 'ValidationError') {
      const errors = {};
  
      for (const field in err.errors) {
        let path = err.errors[field].path || field;
  
        path = path.replace(/^ingredients\[\d+\]\./, 'ingredients.');
        path = path.replace(/^ingredients\.\d+\./, 'ingredients.');
  
        errors[path] = err.errors[field].message || 'Validation failed.';
      }
  
      return res.status(400).json({
        error: 'Validation Error',
        details: errors
      });
    }
  
    // Handle other errors
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error'
    });
  };
  
  module.exports = errorHandler;
  
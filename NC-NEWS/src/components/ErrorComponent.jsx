const ErrorComponent = ({ error }) => {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
      </div>
    );
  };
  
  export default ErrorComponent;
const ReviewStatus = ({ status }) => {
    const statusStyles = {
      REVIEWED: 'bg-green-200',
      PENDING: 'bg-yellow-200',
    };
  
    const statusClassName = statusStyles[status] || 'bg-gray-100'; // Default background color
  
    return (
      <div className={`font-bold rounded-xl px-2 text-center ${statusClassName}`}>
        {status}
      </div>
    );
  };
  
  export default ReviewStatus;
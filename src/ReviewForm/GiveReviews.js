// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './GiveReviews.css';

// Function component for giving reviews
function GiveReviews({ onReviewSubmit }) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle star click
  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      setShowForm(false);
      if (onReviewSubmit) {
        onReviewSubmit(formData);
      }
      setFormData({
        name: '',
        review: '',
        rating: 0
      });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="give-reviews-container">
      {/* Display button to open the form */}
      <button className="review-btn" onClick={handleButtonClick}>Click Here</button>

      {showForm && (
        <>
          <div className="review-overlay" onClick={() => setShowForm(false)}></div>
          <div className="review-form-popup">
            <form onSubmit={handleSubmit}>
              <h2>Give Your Feedback</h2>
              {/* Display warning message if not all fields are filled */}
              {showWarning && <p className="warning">Please fill out all fields.</p>}
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="review">Review:</label>
                <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
              </div>
              <div>
                <label>Rating:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= formData.rating ? 'filled' : ''}`}
                      onClick={() => handleStarClick(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              {/* Submit button for form submission */}
              <button type="submit" className="review-btn">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default GiveReviews;

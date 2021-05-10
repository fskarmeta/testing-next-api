import { useRef, useState } from 'react';

const HomePage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const emailInput = useRef();
  const feedbackInput = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const email = emailInput.current.value;
    const feedback = feedbackInput.current.value;

    if (!email || !feedback) {
      return console.log('Values missing');
    }

    const obj = {
      email,
      feedback,
    };

    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  const getFeedbacks = async () => {
    const response = await fetch('/api/feedback');
    const data = await response.json();
    setFeedbacks(data.feedback);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input ref={emailInput} type='email' id='email' />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea ref={feedbackInput} rows='5' id='feedback'></textarea>
        </div>
        <button type='submit'>Send Feedback</button>
      </form>
      <hr />
      <button onClick={getFeedbacks}>Get Feedbacks</button>
      <ul>
        {feedbacks.map(item => (
          <li key={item.id}>
            {item.email} - {item.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

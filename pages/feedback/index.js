import { extractFeedback, buildFeedbackPath } from '../api/feedback/index';
import { Fragment, useState } from 'react';
const feedbackPage = props => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = id => {
    console.log(id);
    fetch('/api/feedback/' + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFeedbackData(data.feedback);
      });
  };

  if (!props.feedbackItems || props.feedbackItems.length === 0) {
    return <p>No feedback items yet</p>;
  }
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map(item => (
          <li key={item.id}>
            {item.feedback}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
export default feedbackPage;

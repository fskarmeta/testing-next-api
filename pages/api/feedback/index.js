import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

export const extractFeedback = filePath => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = {
      email,
      feedback,
      id: new Date().toISOString(),
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({ message: 'Success!', feedback: newFeedback });
  }
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return res.status(201).json({ feedback: data });
};

export default handler;

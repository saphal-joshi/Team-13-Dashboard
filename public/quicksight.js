const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
 
const app = express();
const PORT = 3000;
 
app.use(cors()); // allow frontend to call this backend
 
// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // Your region
  accessKeyId: '',
  secretAccessKey: ''
 
});
 
const quicksight = new AWS.QuickSight();
 
app.get('/embed-url', async (req, res) => {
  try {
    const params = {
      AwsAccountId: '',
      DashboardId: '',
      IdentityType: 'IAM',
      sessionUserArn: 'arn:aws:account::754810877713:account',
 
      SessionLifetimeInMinutes: 600,
      UndoRedoDisabled: false,
      ResetDisabled: false
    };
 
    const result = await quicksight.getDashboardEmbedUrl(params).promise();
    res.json({ embedUrl: result.EmbedUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting embed URL');
  }
  
});
 
 
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log('Frontend available at http://127.0.0.1:5500/webapptest.html');
});

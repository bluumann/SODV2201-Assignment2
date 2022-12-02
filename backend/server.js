const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;
const messageDataURL = './database/messages.json';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('BVC Course Registration Backend');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Checking for file
var exists = fs.existsSync(messageDataURL);
if (exists) {
  var data = fs.readFileSync(messageDataURL, 'utf-8');
  obj = JSON.parse(data);
}
else{
  // Create the data object if the file does not exist
  console.log("Creating data object");
  var obj = { messages: [] };
}

// Gemma
// API to submit new message/question
app.post('/newmessage', (req, res) => {
  let reply = "Success";
  let check = true;

  if(
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.message
  ) {
    check = false;
    reply = "Please fill out all fields.";
  }

  if(!check){
    res.send(reply);
  }

  if (check){
    // Create Contact Request object to store properties from msgInfo 
    const contactRequest = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      message: req.body.message
    };

    // Push the current contact request to the data object
    obj.messages.push(contactRequest);

    // Convert the JS object to a JSON string
    let data = JSON.stringify(obj, null, 2);

    // Write the JSON string to file
    fs.writeFile(messageDataURL, data, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Data successfully written to file.\n");
      }
    });
    res.send(contactRequest);
  }
 
});

// Gemma
// API to retrieve all messages
app.get('/questions', (req, res) => {
  if(obj.messages == []){
    res.send("There are no messages.")
  }
  res.send(obj.messages);
});




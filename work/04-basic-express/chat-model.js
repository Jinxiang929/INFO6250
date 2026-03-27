const users = { // Yes, an object!  Keep this as an object, you may change the usernames and values
  "Amit": "Amit", // The keys let you check to see if the user is logged in
  "Bao": "Bao",  // the values don't really matter, here we reuse the username, but it could be `true`
};

const messages = [ // Notice: An array of objects
  {
    sender: "Amit",
    text: "Javascript is soooo difficult!!!",
  },
  {
    sender: "Bao",
    text: "Yep, still working on this INFO6250 work, my web page looks awful.",
  }
];

// Below uses destructuring
function addMessage({ sender, text }) { // Leave this as `sender` - I want to see you solve the name disagreement
  
  //a shorter way but I didn't think it at first
  if(users[sender] && text.trim()) {
    messages.push({ sender, text });
  }
}

// These files demonstrating various ways of building our exports
// so they are inconsistent in ways "real" projects usually wouldn't want
const chatModel = {
  users,
  messages,
  addMessage,
};

module.exports = chatModel;


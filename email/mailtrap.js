const { MailtrapClient } = require('mailtrap');

const TOKEN = "de86772c14233a47f5f48042b698d72b";

const client = new MailtrapClient({
token: TOKEN,
});

const sender = {
email: "hello@demomailtrap.co",
name: "Mailtrap Test",
};
const recipients = [
{
email: User.email,
}
];

client
.send({
from: sender,
to: recipients,
subject: "You are awesome!",
text: "Congrats for sending test email with Mailtrap!",
category: "Integration Test",
})
.then(console.log, console.error);
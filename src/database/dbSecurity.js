const Subscriber = require('pg-listen')
require('../environments/config')

const subscriber = Subscriber({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
});

//await subscriber.listenTo(`${dbEvent}`);
subscriber.notifications.on("new_event", (payload) => {
        // Payload as passed to subscriber.notify() (see below)
        console.log("Received notification in 'my-channel':", payload)
    })

module.exports = async function connect() {
    await subscriber.connect(),
    await subscriber.listenTo("new_event")
}
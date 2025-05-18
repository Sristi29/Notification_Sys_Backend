# SETUP INSTRUCTIONS

- Install Node.js from nodejs.org and set it up in VScode.
- Install Docker Desktop from docker.com and run it.
- Start the RabbitMQ Docker container by running:
  (docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management)
- Check RabbitMQ dashboard at http://localhost:15672 and login with guest/guest.
- Clone your project repository to the VScode
- In the project folder, run npm install to install all dependencies:express,mongoose,.env and amqplib.
- Run the producer and consumer scripts using:
  (node queue/producer.js and node queue/consumer.js)

# ASSUMPTION

- We assume the user’s name, email, and other details are correct in the request,There is no central database to check or fetch user information.
- Only email notifications are supported now. SMS and push notifications may be added later.
- The RabbitMQ server runs locally at amqp://localhost.RabbitMQ is available during all operations,It will restart automatically if it stops.
- This version has no authentication or authorization.It assumes only trusted sources send requests to the API.
- Notifications are retried up to 3 times in case of failure. It is assumed that any temporary error will be resolved within these retries.

# API POSTMAN LINK

https://www.postman.com/sristisrivastava/workspace/sristi/request/43688501-2bfc9055-9cff-4d78-80e0-cedf4c8e0c43?action=share&creator=43688501&ctx=documentation

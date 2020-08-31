const cluster = require('cluster');
const os = require('os');

const { pid } = process;

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  console.log(`CPUs: ${cpuCount}`);
  console.log(`Master started. PID: ${pid}`);
  for (let i = 0; i < cpuCount - 1; i += 1) {
    const worker = cluster.fork();
    worker.on('exit', () => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
    worker.send('Hello from server');
    worker.on('message', (msg) => {
      console.log(`Message from worker ${worker.process.pid} : ${JSON.stringify(msg)}`);
    });
  }
} else if (cluster.isWorker) {
  const app = require('./worker.js');
  process.on('message', (msg) => {
    console.log(`[!]Message from master: ${msg}`);
  });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server started. PID: ${pid}  PORT: ${port}`);
    console.log(`Listening at http://localhost:${port}`);
  });

  // process.send({ message: `Hello!`, pid })
}

import * as amqp from 'amqplib';

export class RabbitMQHelper {
  private server = null;
  private channel = null;
  private returnData = null;
  constructor(
    private host: string,
    private exchange: string,
    private queue: string,
  ) { }

  public async init() {
    this.server = await amqp.connect(this.host);
    this.channel = await this.server.createChannel();
  }

  public async publish(data) {
    await this.init();
    this.channel.assertExchange(this.exchange, 'fanout', {
      durable: true,
    });
    this.channel.publish(
      this.exchange,
      this.queue,
      Buffer.from(JSON.stringify(data)),
    );
    console.log(' [x] Sent %s', data);
  }

  public async close() {
    this.server.close();
  }

  public async subscribe() {
    await this.init();
    await this.channel.assertExchange(this.exchange, 'fanout', {
      durable: true,
    });

    let response = await this.channel.assertQueue(this.queue, {
      exclusive: false,
    });

    console.log(
      ' [*] Waiting for messages in %s. To exit press CTRL+C',
      response.queue,
    );
    let messageCount = response.messageCount;
    response = await this.channel.bindQueue(
      response.queue,
      this.exchange,
      this.queue,
    );
    response = await this.channel.consume(
      response.queue,
      logMessage(messageCount),
      {
        noAck: false,
      },
    );

    function logMessage(messageCount) {
      return async msg => {

        console.log("[*] recieved: '%s'", JSON.parse(msg.content.toString()));
        // await this.channel.ack(msg, true);
        //return this.returnData = JSON.parse(msg.content.toString());
      };
    }
  }
}
export class Conversation{
  constructor({ id, conversationId, authorId, body, timestamp = Date.now() } = {}) {
    this.id = id;
    this.conversationId = conversationId;
    this.authorId = authorId;
    this.body = body;
    this.timestamp = timestamp;
  }
}

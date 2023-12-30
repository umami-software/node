export interface UmamiOptions {
  hostUrl?: string;
  websiteId?: string;
  sessionId?: string;
}

export interface UmamiPayload {
  website: string;
  hostname?: string;
  language?: string;
  referrer?: string;
  screen?: string;
  title?: string;
  url?: string;
  name?: string;
  data?: {
    [key: string]: string | number | Date;
  };
}

export interface UmamiEventData {
  [key: string]: string | number | Date;
}

export class Umami {
  options: UmamiOptions;
  properties: object;

  constructor(options = {}) {
    this.options = options;
    this.properties = {};
  }

  init(options: UmamiOptions) {
    this.options = { ...this.options, ...options };
  }

  send(payload: UmamiPayload, type: 'event' | 'identify' = 'event') {
    const { hostUrl } = this.options;

    return fetch(hostUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `node/${process.version}`,
      },
      body: JSON.stringify({ type, payload }),
    });
  }

  track(event: object | string, eventData?: UmamiEventData) {
    const type = typeof event;
    const { websiteId } = this.options;

    switch (type) {
      case 'string':
        return this.send({
          website: websiteId,
          name: event as string,
          data: eventData,
        });
      case 'object':
        return this.send(event as UmamiPayload);
    }

    return Promise.reject('Invalid payload.');
  }

  identify(properties: object = {}) {
    this.properties = { ...this.properties, ...properties };
    const { websiteId } = this.options;

    return this.send({ website: websiteId, data: { ...this.properties } }, 'identify');
  }

  reset() {
    this.properties = {};
  }
}

const umami = new Umami();

export default umami;

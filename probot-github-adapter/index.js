const createWebhook = require('github-webhook-handler')

module.exports = class GitHubAdapter {
  constructor ({logger}, options) {
    const path = options.webhookPath || '/'
    const secret = options.secret || 'development'

    this.logger = logger
    this.webhook = createWebhook({path, secret})

    // Log all webhook errors
    this.webhook.on('error', logger.error.bind(logger))
  }

  listen (callback) {
    // Log all received webhooks
    this.webhook.on('*', event => {
      this.logger.info({event}, 'Webhook received')
      callback(event)
    })
  }
}
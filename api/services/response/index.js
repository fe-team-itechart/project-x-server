const { statusMessagesHelper: statusMessages } = require('../../helpers');

class BaseResponse {
  static responseBuilder({ status = 200, data = {}, message }) {
    message = message ? message : statusMessages[status];
    return {
      status,
      statusMessage: statusMessages[status],
      message,
      data,
    };
  }
}

module.exports = BaseResponse;

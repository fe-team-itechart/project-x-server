const { statusMessagesHelper: statusMessages } = require('../../helpers');

class BaseResponse {
  getBody({ status = 200, data = {}, message = '' }) {
    return {
      status,
      statusMessage: statusMessages[status],
      message,
      data,
    };
  }
}

module.exports = BaseResponse;

/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 09:43:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-30 10:03:53
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TokenSchema = new Schema({
    expires: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
  });

  return mongoose.model('Token', TokenSchema);
};

/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-24 15:09:05
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-24 16:30:44
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SessionSchema = new Schema({
    expires: {
      type: Number,
      required: true,
    },
    JSESSIONID: {
      type: String,
      required: true,
    },
    openId: {
      type: String,
      required: true,
      unique: true,
    },
  });

  return mongoose.model('Session', SessionSchema);
};

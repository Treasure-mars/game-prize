import Notifications from "../services/notification.services";

const { SMS_TOPIC } = process.env;
class Notification {
  static async register(req, res) {
    try {
      const { data, message } = await Notifications.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      const { notificationId, productName } = data;
      if (notificationId) {
        return res.status(200).json({
          status: "success",
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
          data
=======
          message: `Notification ${productName} created with id ${notificationId}`,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
        });
      }
    } catch (error) {
      console.log("Error on registering notification: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        message: error.message,
=======
        error: error.message,
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      });
    }
  }
  static async updateNotification(req,res){
    try {
      const {data, message} = await Notifications.updateNotification(req.params, req.body)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      }
    } catch (error) {
      console.log(`Error on updating notification with id : ${req.params.notificationId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      });
    }
  }
  static async getNotification(req,res){
    try {
      const {data, message} = await Notifications.getNotification(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      }
    } catch (error) {
      console.log(`Error on getting notification with id : ${req.params.notificationId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      });
    }
  }
  static async deleteNotification(req,res){
    try {
      const {data, message} = await Notifications.deleteNotification(req.params)
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      }
    } catch (error) {
      console.log(`Error on deleting notification with id : ${req.params.notificationId}`, error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      });
    }
  }
  static async getAllNotifications(req,res){
    try {
      const {data, message} = await Notifications.getAllNotifications()
      if(message){
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        return res.status(404).json({
          status: 'fail',
          message
        })
      }
      if(data){
        return res.status(200).json({
          status: 'success',
          data
        });
=======
        return res.status(404).json({message})
      }
      if(data){
        return res.status(200).json({data})
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      }
    } catch (error) {
      console.log("Error on getting all notifications in: ", error);
      return res.status(500).json({
        status: "error",
<<<<<<< HEAD:Draw-App/src/controller/notification.controller.js
        message: error.message
=======
        error: error.message
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/controller/notification.controller.js
      });
    }
  }
}
export default Notification;

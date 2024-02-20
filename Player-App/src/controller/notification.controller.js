import Notifications from "../services/notification.services";

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
      if (data) {
        return res.status(200).json({
          status: "success",
          data
        });
      }
    } catch (error) {
      console.log("Error on registering notification: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getNotification(req,res){
    try {
      const {data, message} = await Notifications.getNotification(req.params, req.user)
      if(message){
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
      }
    } catch (error) {
      console.log(`Error on getting notification with id : ${req.params.notificationId}`, error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }

  static async getAllNotifications(req,res){
    try {
      const {data, message} = await Notifications.getAllNotifications(req.user)
      if(message){
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
      }
    } catch (error) {
      console.log("Error on getting all notifications in: ", error);
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
}
export default Notification;

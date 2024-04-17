import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import Notification from '../../../../models/notification.js';
import defaultSortNewest from '../../../../util/db/default-sort.js';
import QueryAPI from '../../../../util/db/query-api.js';
import paginate from '../../../../util/db/paginate.js';

// Endpoint: /api/user/notifications
// Method: GET
// Description: Lấy danh sách thông báo
export const handleGetNotifications = catchAsyncErrors(
  async (req, res, next) => {
    const recipient = req.user;

    const query = Notification.find({ recipient })
      .select('_id content createdAt read')
      .lean();

    const reqSort = req.query.sort?.createdAt;

    const requestQuery = defaultSortNewest(
      req.query,
      !reqSort && { createdAt: -1 }
    );

    const queryAPI = new QueryAPI(query, requestQuery).sort();
    let notificationRecords = await queryAPI.query;
    const numberOfNotifications = notificationRecords.length;
    notificationRecords = await queryAPI.pagination().query.clone();

    const {
      data: notifications,
      page,
      pages,
    } = paginate(
      numberOfNotifications,
      req.query.page,
      req.query.size,
      notificationRecords
    );

    // console.log('notificationRecords', notificationRecords);

    // map quả để chỉ lấy thuộc tính id
    const notificationIds = notificationRecords.map(
      (notification) => notification._id
    );

    // console.log(notificationIds);

    // update trạng thái thông báo của notificationIds
    // const updateResponse = 
    await Notification.updateMany(
      { _id: { $in: notificationIds }, read: false },
      { read: true }
    );

    // console.log(updateResponse);

    res.json({
      success: true,
      notifications,
      page,
      pages,
      code: 2082,
    });
  }
);

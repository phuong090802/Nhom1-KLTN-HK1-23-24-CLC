import Notification from '../../../../models/notification.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import paginate from '../../../../util/db/paginate.js';
import QueryAPI from '../../../../util/db/query-api.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

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
    const queryTransform = new QueryTransform(req.query).defaultSortNewest({
      ...(!reqSort && { createdAt: -1 }),
    });
    const queryAPI = new QueryAPI(query, queryTransform.query).sort();
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
    // map quả để chỉ lấy thuộc tính id
    const notificationIds = notificationRecords.map(
      (notification) => notification._id
    );
    // update trạng thái thông báo của notificationIds
    // const updateResponse =
    await Notification.updateMany(
      { _id: { $in: notificationIds }, read: false },
      { read: true }
    );
    res.json({
      success: true,
      notifications,
      page,
      pages,
      code: 2082,
    });
  }
);

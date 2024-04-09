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
      .select('_id content createdAt')
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

    // update trạng thái thông báo
    await Notification.updateMany({ recipient }, { read: true });

    res.json({
      success: true,
      notifications,
      page,
      pages,
      code: 2082,
    });
  }
);

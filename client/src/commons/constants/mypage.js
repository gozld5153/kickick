export const PROFILE = "회원정보 수정";
export const ATTENDANCE = "출석";
export const FAVORITES = "좋아요 한 글";
export const MY_POST = "내가 쓴 글";
export const MY_COMMENT = "내가 단 댓글";
export const PURCHASED_KICK = "내가 산 킥";
export const KICKMONEY_LOG = "킥머니 로그";
export const USER_CONTROL = "유저관리";
export const POST_REPORT = "게시글 신고 목록";
export const WRITE_NOTICE = "공지 적기";

export const PROFILE_PATHNAME = "/mypage/profile";
export const ATTENDANCE_PATHNAME = "/mypage/attendance";
export const FAVORITES_PATHNAME = "/mypage/favorites";
export const MY_POST_PATHNAME = "/mypage/mypost";
export const MY_COMMENT_PATHNAME = "/mypage/mycomment";
export const PURCHASED_KICK_PATHNAME = "/mypage/kick";
export const KICKMONEY_LOG_PATHNAME = "/mypage/log";
export const USER_CONTROL_PATHNAME = "/mypage/usercontrol";
export const POST_REPORT_PATHNAME = "/mypage/report";
export const WRITE_NOTICE_PATHNAME = "/";

export const CATEGORY_USER = "회원정보";
export const CATEGORY_ACTIVITY = "나의활동";
export const CATEGORY_PURCHASE = "구매목록";
export const CATEGORY_CONTROL = "관리";

export const tabList = [
  { label: PROFILE, pathname: PROFILE_PATHNAME, category: CATEGORY_USER },
  { label: ATTENDANCE, pathname: ATTENDANCE_PATHNAME, category: CATEGORY_USER },
  {
    label: FAVORITES,
    pathname: FAVORITES_PATHNAME,
    category: CATEGORY_ACTIVITY,
  },
  { label: MY_POST, pathname: MY_POST_PATHNAME, category: CATEGORY_ACTIVITY },
  {
    label: MY_COMMENT,
    pathname: MY_COMMENT_PATHNAME,
    category: CATEGORY_ACTIVITY,
  },
  {
    label: PURCHASED_KICK,
    pathname: PURCHASED_KICK_PATHNAME,
    category: CATEGORY_PURCHASE,
  },
  {
    label: KICKMONEY_LOG,
    pathname: KICKMONEY_LOG_PATHNAME,
    category: CATEGORY_PURCHASE,
  },
  {
    label: USER_CONTROL,
    pathname: USER_CONTROL_PATHNAME,
    category: CATEGORY_CONTROL,
  },
  {
    label: POST_REPORT,
    pathname: POST_REPORT_PATHNAME,
    category: CATEGORY_CONTROL,
  },
];

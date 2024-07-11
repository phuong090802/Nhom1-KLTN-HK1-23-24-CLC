const colors = {
  primary: "#2785DC",
  lightPrimary: "#3699f5",
  primary10: "rgba(39, 133, 220, 0.1)",
  primary20: "rgba(39, 133, 220, 0.2)",
  secondary: "#1DDBD2",
  ghostWhite: "#ededed",
  lightGray: "#E3E7EA",
  error: "#E03922",
  error20: "rgba(224, 57, 34, 0.2)",
  error10: "rgba(224, 57, 34, 0.1)",
  success: "#3de03d",
  success20: "rgba(61, 224, 61, 0.2)",
  success10: "rgba(61, 224, 61, 0.1)",
  white: "#fff",
  black: "#000",
  black75: "rgba(0, 0, 0, 0.75)",
  black50: "rgba(0, 0, 0, 0.5)",
  black25: "rgba(0, 0, 0, 0.25)",
  black10: "rgba(0, 0, 0, 0.1)",
  black5: "rgba(0, 0, 0, 0.05)",
  warning: "#FFB818",
};

const fonts = {
  BahnschriftBold: "BahnschriftBold",
  BahnschriftRegular: "BahnschriftRegular",
  Bungee: "Bungee",
};

const paths = {
  login: "/",
  home: "/app-home/home-page",
  dashboard: "/app-home/dashboard",
  user: "/app-home/user",
  adminDepartmentStatistic: "/admin/statistic/department-statistic",
  admin: {
    department: "/admin/admin-dep",
    user: "/admin/admin-user",
    news: "/admin/admin-news",
  },
  dephead: {
    counsellor: "/dephead/dephead-counsellor",
    field: "/dephead/dephead-field",
    faq: "/dephead/dephead-faq",
    aprove: "/dephead/dephead-aprove",
    question: "counsellor/counsellor-question",
  },
  counsellor: {
    question: "counsellor/counsellor-question",
    conversations: "counsellor/counsellor-conversations",
    conversationDetail:
      "counsellor/counsellor-conversations/ConversationDetail",
  },
};

const validate = {
  required: (value, name) => {
    return !value ? `${name || "Trường này"} không thể để trống` : "";
  },
};

export { colors, fonts, paths, validate };

import { ThemeConfig } from "antd";

export const editorTheme: ThemeConfig = {
  components: {
    Menu: {
      colorItemBg: "#434343",
      colorItemText: "#ffffff",
      colorItemTextSelected: "#ffffff",
      itemSelectedBg: "#595959",
      colorItemTextHover: "#ffffff",
      colorItemBgHover: "#595959",
    },
    Layout: {
      siderBg: "#434343",
      triggerBg: "#595959",
      triggerColor: "#ffffff",
    },
    Button: {
      boxShadow: "none",
      primaryShadow: "none",
      defaultShadow: "none",
      dangerShadow: "none",
    },
    Table: {
      colorBgContainer: "#ffffff",
      colorText: "#000000",
      colorTextHeading: "#000000",
      colorBorderSecondary: "#d9d9d9",
      colorFillAlter: "#fafafa",
      colorFillContent: "#ffffff",
      colorIcon: "#000000",
      colorIconHover: "#1890ff",
    },
    Modal: {
      contentBg: "#434343",
      colorText: "#ffffff",
      colorTextHeading: "#ffffff",
      colorBorder: "#595959",
      colorBgBase: "#434343",
      titleColor: "#ffffff",
      headerBg: "#434343",
      footerBg: "#434343",
      colorBorderBg: "#595959",
      colorFillContentHover: "#595959",
    },
  },
  token: {
    colorBgContainer: "#434343",
    colorBorder: "#595959",
    colorText: "#ffffff",
    colorTextSecondary: "#ffffff",
    colorPrimary: "#000000",
  },
};

export const defaultTheme = {
  token: {
    colorPrimary: "#1890ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#1890ff",
    colorTextBase: "rgba(0, 0, 0, 0.85)",
    colorBgBase: "#fff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    fontSize: 14,
    lineWidth: 1,
    lineType: "solid",
    colorBorder: "#d9d9d9",
    colorBgContainer: "#fff",
    colorText: "rgba(0, 0, 0, 0.85)",
    colorTextSecondary: "rgba(0, 0, 0, 0.45)",
    colorTextTertiary: "rgba(0, 0, 0, 0.45)",
    colorTextQuaternary: "rgba(0, 0, 0, 0.25)",
    colorFill: "rgba(0, 0, 0, 0.15)",
    colorFillSecondary: "rgba(0, 0, 0, 0.06)",
    colorFillTertiary: "rgba(0, 0, 0, 0.04)",
    colorFillQuaternary: "rgba(0, 0, 0, 0.02)",
    colorBgLayout: "#f0f2f5",
    colorBgElevated: "#fff",
    colorLink: "#1890ff",
  },
};

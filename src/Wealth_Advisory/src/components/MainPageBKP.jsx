import { useState, useEffect } from "react";
import { apiService } from "../services/api";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import FloatingChatWidget from "../components/FloatingChatWidget";
import { useStateContext } from "../contexts/ContextProvider";
import { useToast } from "../contexts/ToastContext";
import { useTheme } from "../contexts/ThemeContext";

const ToastContainer = () => {
  const { toasts } = useToast();
  const { isDarkMode } = useTheme();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[70] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 transform translate-x-0 ${
            toast.type === "success"
              ? isDarkMode
                ? "bg-green-800 border-green-600 text-green-100"
                : "bg-green-100 border-green-300 text-green-800"
              : toast.type === "error"
              ? isDarkMode
                ? "bg-red-800 border-red-600 text-red-100"
                : "bg-red-100 border-red-300 text-red-800"
              : isDarkMode
              ? "bg-slate-800 border-slate-600 text-slate-100"
              : "bg-white border-slate-300 text-slate-800"
          }`}
          style={{ minWidth: "300px" }}
        >
          <div className="flex items-center">
            <span className="mr-2">
              {toast.type === "success"
                ? "✅"
                : toast.type === "error"
                ? "❌"
                : toast.type === "phone"
                ? "📞"
                : "ℹ️"}
            </span>
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const themeClasses = {
  dark: {
    container: "min-h-screen bg-[#0F172A]",

    tabsContainer: "bg-[#1e293b] border border-slate-600/20",
    tabActive:
      "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-100 shadow-lg border border-slate-500/30",
    tabInactive:
      "text-slate-300 hover:text-slate-100 hover:bg-slate-700/30 border border-transparent",

    contentArea: "bg-[#1e293b] border border-slate-600/20",

    prospectCard:
      "bg-gradient-to-r from-[#334155] to-[#3f4f5f] hover:from-[#475569] hover:to-[#525f6f] border border-slate-600/20 shadow-xl",
    prospectText: "text-slate-50",
    prospectSubtext: "text-slate-300",
    prospectHighlight: "text-blue-300",

    modalOverlay: "bg-black bg-opacity-75 backdrop-blur-md",
    modalContainer: "bg-[#1e293b] border border-slate-600/20 shadow-2xl",
    modalHeader:
      "bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600/20",
    modalContent: "bg-gradient-to-br from-[#1e293b] to-[#2d3748]",

    clientId: "bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg",

    actionButtons: {
      primary:
        "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-slate-100 shadow-md",
      secondary:
        "bg-slate-700/40 hover:bg-slate-600/60 text-slate-200 hover:text-slate-100 border border-slate-600/30",
      view: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transform hover:scale-105 transition-all duration-200",
    },
    iconContainer: "bg-slate-700/40 backdrop-blur-sm",
  },

  light: {
    container:
      "min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100",

    tabsContainer: "bg-slate-100 border border-slate-200 shadow-sm",
    tabActive:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border border-blue-500/50 transform scale-105",
    tabInactive:
      "text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-transparent transition-all duration-200",

    contentArea: "bg-white border border-slate-200",

    prospectCard:
      "bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border border-slate-200 shadow-lg",
    prospectText: "text-slate-800",
    prospectSubtext: "text-slate-600",
    prospectHighlight: "text-blue-600",

    modalOverlay: "bg-black bg-opacity-50 backdrop-blur-sm",
    modalContainer: "bg-white border border-slate-200",
    modalHeader:
      "bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200",
    modalContent: "bg-gradient-to-br from-white to-slate-50",

    clientId: "bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg",

    actionButtons: {
      primary:
        "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md transform hover:scale-105 transition-all duration-200",
      secondary:
        "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all duration-200",
      view: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transform hover:scale-105 transition-all duration-200 font-medium",
    },
    iconContainer: "bg-slate-200",
  },
};

const navigationTabs = [
  { id: "prospects", label: "High-Potential Prospects" },
  { id: "opportunities", label: "Cross-sell Opportunities" },
  { id: "analytics", label: "Performance Analytics" },
];

const formatCurrency = (amount) => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(2)}B`;
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(2)}K`;
  } else {
    return `$${amount.toLocaleString()}`;
  }
};

const formatAUM = formatCurrency;
const formatRevenue = formatCurrency;
const formatLargeRevenue = formatCurrency;

const getPriorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return {
        background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
        boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
        border: "1px solid rgba(220, 38, 38, 0.3)",
        transform: "scale(1.05)",
      };
    case "Medium":
      return {
        background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
        boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)",
        border: "1px solid rgba(217, 119, 6, 0.3)",
        transform: "scale(1.02)",
      };
    case "Low":
      return {
        background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
        boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
        border: "1px solid rgba(5, 150, 105, 0.3)",
      };
    default:
      return {
        background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
        boxShadow: "0 4px 12px rgba(100, 116, 139, 0.2)",
        border: "1px solid rgba(100, 116, 139, 0.3)",
      };
  }
};

const ActionPlanModal = ({
  actionPlanModal,
  setActionPlanModal,
  actionPlanData,
  setActionPlanData,
  isDarkMode,
  handleGenerateEmail,
}) => {
  if (!actionPlanModal.isOpen) return null;

  const client = actionPlanModal.client || actionPlanModal.opportunity;
  const isOpportunity = !!actionPlanModal.opportunity;
  const theme = isDarkMode ? themeClasses.dark : themeClasses.light;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${theme.modalOverlay}`}
    >
      <div
        className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600/30"
            : "bg-white border border-slate-200"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between p-6 border-b rounded-t-2xl ${
            isDarkMode
              ? "bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600/30"
              : "bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200"
          }`}
        >
          <div>
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Create Action Plan
            </h2>
            <p
              className={`mt-1 text-sm ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Client: {client?.name}
            </p>
          </div>
          <button
            onClick={() =>
              setActionPlanModal({
                isOpen: false,
                client: null,
                opportunity: null,
              })
            }
            className={`text-2xl font-bold transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center ${
              isDarkMode
                ? "text-slate-400 hover:text-slate-200 hover:bg-slate-600/50"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            }`}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div
          className={`p-6 ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-800 to-slate-900"
              : "bg-gradient-to-br from-white to-slate-50"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Meeting Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={actionPlanData.meetingDate}
                  onChange={(e) =>
                    setActionPlanData((prev) => ({
                      ...prev,
                      meetingDate: e.target.value,
                    }))
                  }
                  onDoubleClick={(e) => {
                    e.target.showPicker && e.target.showPicker();
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-100 placeholder-slate-400 [color-scheme:dark]"
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                  }`}
                  style={{
                    colorScheme: isDarkMode ? "dark" : "light",
                  }}
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Communication Channel *
                </label>
                <select
                  value={actionPlanData.channel}
                  onChange={(e) =>
                    setActionPlanData((prev) => ({
                      ...prev,
                      channel: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-100"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                >
                  <option value="In-Person">In-Person Meeting</option>
                  <option value="Video">Video Call</option>
                  <option value="Phone">Phone Call</option>
                  <option value="Email">Email</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Priority Level
                </label>
                <select
                  value={actionPlanData.priority}
                  onChange={(e) =>
                    setActionPlanData((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-100 [color-scheme:dark]"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Follow-up Date *
                </label>
                <input
                  type="date"
                  value={actionPlanData.followUpDate}
                  onChange={(e) =>
                    setActionPlanData((prev) => ({
                      ...prev,
                      followUpDate: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-100"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Discussion Topics *
                </label>
                <textarea
                  value={actionPlanData.discussionTopics}
                  onChange={(e) =>
                    setActionPlanData((prev) => ({
                      ...prev,
                      discussionTopics: e.target.value,
                    }))
                  }
                  placeholder="e.g., Inheritance planning, Investment strategy, Risk assessment"
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[100px] transition-all duration-200 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-100 placeholder-slate-400"
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                  }`}
                  required
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Next Action Items *
                </label>
                <textarea
                  value={actionPlanData.nextAction}
                  onChange={(e) =>
                    setActionPlanData((prev) => ({
                      ...prev,
                      nextAction: e.target.value,
                    }))
                  }
                  placeholder="e.g., Trust setup, Portfolio review, Insurance evaluation"
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[100px] transition-all duration-200 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-100 placeholder-slate-400"
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                  }`}
                  required
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Additional Notes
                </label>
                <textarea
                  value={actionPlanData.notes}
                  onChange={(e) =>
                    setActionPlanData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Any additional notes or context"
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[80px] transition-all duration-200 text-sm ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 text-slate-100 placeholder-slate-400"
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                  }`}
                  style={{ fontFamily: "inherit" }}
                />
              </div>
            </div>
          </div>

          {/* Opportunity Details Section */}
          {isOpportunity && (
            <div className="mt-6">
              <div
                className={`rounded-lg p-6 border ${
                  isDarkMode
                    ? "bg-slate-700/30 border-slate-600/30"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-4 ${
                    isDarkMode ? "text-slate-100" : "text-blue-900"
                  }`}
                >
                  Opportunity Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? "text-slate-300" : "text-blue-700"
                      }`}
                    >
                      Current AUM:
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-slate-100" : "text-blue-900"
                      }`}
                    >
                      {client?.currentAUM}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? "text-slate-300" : "text-blue-700"
                      }`}
                    >
                      Identified Gap:
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-slate-100" : "text-blue-900"
                      }`}
                    >
                      {client?.identified_gap}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? "text-slate-300" : "text-blue-700"
                      }`}
                    >
                      Recommended Product:
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-slate-100" : "text-blue-900"
                      }`}
                    >
                      {client?.product}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? "text-slate-300" : "text-blue-700"
                      }`}
                    >
                      Potential Revenue:
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-slate-100" : "text-blue-900"
                      }`}
                    >
                      {client?.revenue}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? "text-slate-300" : "text-blue-700"
                      }`}
                    >
                      Priority:
                    </p>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                      style={getPriorityStyles(client?.potential_value_score)}
                    >
                      {client?.potential_value_score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div
            className={`mt-6 flex flex-wrap gap-3 justify-end pt-4 border-t ${
              isDarkMode
                ? "border-t border-slate-600/30"
                : "border-t border-slate-200"
            }`}
          >
            <button
              onClick={() =>
                setActionPlanModal({
                  isOpen: false,
                  client: null,
                  opportunity: null,
                })
              }
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm border ${
                isDarkMode
                  ? "bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 border-slate-600/50"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300"
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleGenerateEmail}
              disabled={
                !actionPlanData.meetingDate || !actionPlanData.followUpDate
              }
              className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 font-medium text-sm shadow-lg transform hover:scale-105 ${
                !actionPlanData.meetingDate || !actionPlanData.followUpDate
                  ? isDarkMode
                    ? "bg-slate-600/50 text-slate-400 cursor-not-allowed"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
              }`}
              title={
                !actionPlanData.meetingDate || !actionPlanData.followUpDate
                  ? "Please fill in meeting date and follow-up date first"
                  : "Generate email for this client"
              }
            >
              <span className="mr-2 text-sm">📝</span>
              Generate Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailPreviewModal = ({
  emailModal,
  setEmailModal,
  isDarkMode,
  handleSendEmailFromModal,
}) => {
  if (!emailModal.isOpen) return null;

  const theme = isDarkMode ? themeClasses.dark : themeClasses.light;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[60] p-4 ${theme.modalOverlay}`}
    >
      <div
        className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600/30"
            : "bg-white border border-slate-200"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between p-6 border-b rounded-t-2xl ${
            isDarkMode
              ? "bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600/30"
              : "bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200"
          }`}
        >
          <div>
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              📧 Email Preview
            </h2>
            <p
              className={`mt-1 text-sm ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              To: {emailModal.emailContent.clientName} (
              {emailModal.emailContent.clientEmail})
            </p>
          </div>
          <button
            onClick={() =>
              setEmailModal({
                isOpen: false,
                emailContent: {
                  subject: "",
                  body: "",
                  clientEmail: "",
                  clientName: "",
                },
              })
            }
            className={`text-2xl font-bold transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center ${
              isDarkMode
                ? "text-slate-400 hover:text-slate-200 hover:bg-slate-600/50"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            }`}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div
          className={`p-6 ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-800 to-slate-900"
              : "bg-gradient-to-br from-white to-slate-50"
          }`}
        >
          <div className="space-y-6">
            {/* Email Subject */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Subject Line
              </label>
              <input
                type="text"
                value={emailModal.emailContent.subject}
                onChange={(e) =>
                  setEmailModal((prev) => ({
                    ...prev,
                    emailContent: {
                      ...prev.emailContent,
                      subject: e.target.value,
                    },
                  }))
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                  isDarkMode
                    ? "bg-slate-700/50 border-slate-600/50 text-slate-100 placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                }`}
              />
            </div>

            {/* Email Body */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Email Body
              </label>
              <textarea
                value={emailModal.emailContent.body}
                onChange={(e) =>
                  setEmailModal((prev) => ({
                    ...prev,
                    emailContent: {
                      ...prev.emailContent,
                      body: e.target.value,
                    },
                  }))
                }
                rows="15"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[300px] transition-all duration-200 text-sm ${
                  isDarkMode
                    ? "bg-slate-700/50 border-slate-600/50 text-slate-100 placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                }`}
                style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}
              />
            </div>

            {/* Email Preview Section */}
            <div
              className={`rounded-lg p-4 border ${
                isDarkMode
                  ? "bg-slate-700/30 border-slate-600/30"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <h3
                className={`text-sm font-bold mb-2 ${
                  isDarkMode ? "text-slate-100" : "text-blue-900"
                }`}
              >
                📋 Email Preview
              </h3>
              <div
                className={`text-xs ${
                  isDarkMode ? "text-slate-300" : "text-blue-700"
                }`}
              >
                <p>
                  <strong>To:</strong> {emailModal.emailContent.clientEmail}
                </p>
                <p>
                  <strong>Subject:</strong> {emailModal.emailContent.subject}
                </p>
                <div
                  className="mt-2 p-3 rounded border max-h-40 overflow-y-auto"
                  style={{
                    whiteSpace: "pre-wrap",
                    backgroundColor: isDarkMode ? "#475569" : "#f8fafc",
                  }}
                >
                  {emailModal.emailContent.body}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div
            className={`mt-6 flex flex-wrap gap-3 justify-end pt-4 border-t ${
              isDarkMode
                ? "border-t border-slate-600/30"
                : "border-t border-slate-200"
            }`}
          >
            <button
              onClick={() =>
                setEmailModal({
                  isOpen: false,
                  emailContent: {
                    subject: "",
                    body: "",
                    clientEmail: "",
                    clientName: "",
                  },
                })
              }
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm border ${
                isDarkMode
                  ? "bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 border-slate-600/50"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300"
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleSendEmailFromModal}
              className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 font-medium text-sm shadow-lg ${
                isDarkMode
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                  : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
              } transform hover:scale-105`}
            >
              <span className="mr-2 text-sm">📧</span>
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function MainPage() {
  const { showToast } = useToast();
  const { login1 } = useStateContext();

  const [activeTab, setActiveTab] = useState("prospects");
  const [highPotentialData, setHighPotentialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [crossSellData, setCrossSellData] = useState([]);
  const [crossSellLoading, setCrossSellLoading] = useState(false);
  const [crossSellError, setCrossSellError] = useState(null);

  const [performanceData, setPerformanceData] = useState(null);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  const [performanceError, setPerformanceError] = useState(null);

  const [summaryData, setSummaryData] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerDetailData, setCustomerDetailData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? themeClasses.dark : themeClasses.light;

  const [actionPlanModal, setActionPlanModal] = useState({
    isOpen: false,
    client: null,
    opportunity: null,
  });

  const [actionPlanData, setActionPlanData] = useState({
    meetingDate: "",
    channel: "In-Person",
    discussionTopics: "",
    nextAction: "",
    followUpDate: "",
    priority: "Medium",
    notes: "",
  });

  const handleCallClient = (prospect) => {
    const phoneNumber = prospect.mobile_number;

    if (phoneNumber && phoneNumber !== "NA") {
      // For mobile devices - direct call
      if (
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        window.open(`tel:${phoneNumber}`);
        showToast(`Calling ${prospect.name}...`, "phone", 2000);
      } else {
        // For desktop - copy number and show toast
        navigator.clipboard.writeText(phoneNumber);
        showToast(
          `Phone number ${phoneNumber} copied to clipboard`,
          "success",
          3000
        );
      }
    } else {
      showToast("Phone number not available for this client", "error", 3000);
    }
  };

  const handleCreateActionPlan = (client, isOpportunity = false) => {
    setActionPlanModal({
      isOpen: true,
      client: isOpportunity ? null : client,
      opportunity: isOpportunity ? client : null,
    });

    if (isOpportunity) {
      setActionPlanData((prev) => ({
        ...prev,
        discussionTopics: client.discussion_topic || "",
        nextAction: `Discuss ${client.next_actions}`,
        priority: client.potential_value_score || "Medium",
      }));
    } else {
      setActionPlanData((prev) => ({
        ...prev,
        discussionTopics: "Portfolio review and investment strategy",
        nextAction: "Follow up on investment recommendations",
      }));
    }
  };

  const [emailModal, setEmailModal] = useState({
    isOpen: false,
    emailContent: {
      subject: "",
      body: "",
      clientEmail: "",
      clientName: "",
    },
  });

  const handleGenerateEmail = () => {
    const client = actionPlanModal.client || actionPlanModal.opportunity;
    const clientEmail = `${client.name
      .toLowerCase()
      .replace(/\s+/g, ".")}@wealth.com`;

    const emailSubject = `Meeting Request: ${actionPlanData.discussionTopics}`;

    // Build email body dynamically to avoid blank rows
    let emailBody = `Dear ${client.name},

I hope this email finds you well. I would like to schedule a meeting to discuss some important matters regarding your portfolio.`;

    // Add notes if provided
    if (actionPlanData.notes && actionPlanData.notes.trim()) {
      emailBody += `\n\n${actionPlanData.notes.trim()}`;
    }

    // Add meeting details
    emailBody += `\n\nMeeting Details:`;
    emailBody += `\n- Date: ${new Date(
      actionPlanData.meetingDate
    ).toLocaleDateString()}`;
    emailBody += `\n- Channel: ${actionPlanData.channel}`;

    // Add discussion topics if provided
    if (
      actionPlanData.discussionTopics &&
      actionPlanData.discussionTopics.trim()
    ) {
      emailBody += `\n- Discussion Topics: ${actionPlanData.discussionTopics.trim()}`;
    }

    // Add next actions if provided
    if (actionPlanData.nextAction && actionPlanData.nextAction.trim()) {
      emailBody += `\n- Next Actions: ${actionPlanData.nextAction.trim()}`;
    }

    // Add follow-up date
    emailBody += `\n- Follow-up Date: ${new Date(
      actionPlanData.followUpDate
    ).toLocaleDateString()}`;

    // Add closing
    emailBody += `\n\nPlease let me know if this time works for you, or if you'd prefer to reschedule.

Best regards,
Your Wealth Management Team`;

    // Set email modal content
    setEmailModal({
      isOpen: true,
      emailContent: {
        subject: emailSubject,
        body: emailBody,
        clientEmail: clientEmail,
        clientName: client.name,
      },
    });
  };

  // Add this new function to handle actual email sending
  const handleSendEmailFromModal = () => {
    const mailtoLink = `mailto:${
      emailModal.emailContent.clientEmail
    }?subject=${encodeURIComponent(
      emailModal.emailContent.subject
    )}&body=${encodeURIComponent(emailModal.emailContent.body)}`;

    window.open(mailtoLink);

    showToast(
      `Email sent to ${emailModal.emailContent.clientName} at ${emailModal.emailContent.clientEmail}`,
      "success",
      3000
    );

    // Close both modals and reset data
    setEmailModal({
      isOpen: false,
      emailContent: { subject: "", body: "", clientEmail: "", clientName: "" },
    });
    setActionPlanModal({ isOpen: false, client: null, opportunity: null });
    setActionPlanData({
      meetingDate: "",
      channel: "In-Person",
      discussionTopics: "",
      nextAction: "",
      followUpDate: "",
      priority: "Medium",
      notes: "",
    });
  };

  const handleViewCustomer = async (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    setModalLoading(true);

    try {
      // Transform portfolio data from API format to chart format
      const transformPortfolioData = (portfolio) => {
        if (!portfolio || !Array.isArray(portfolio)) {
          // Fallback to default data if no portfolio
          return [
            {
              category: "Equities",
              amount: 100,
              percentage: 100,
              color: "#9fadc3ff",
              description: "dummy",
            },
          ];
        }

        const colorMap = {
          Alternatives: "#8b5cf6", // Purple
          Equities: "#3b82f6", // Blue
          "Fixed Income": "#10b981", // Green
          "Real Estate": "#f59e0b", // Orange
          Cash: "#ef4444", // Red
          Bonds: "#06b6d4", // Cyan
          "Mutual Funds": "#ec4899", // Pink
          ETFs: "#84cc16", // Lime
          "Index Funds": "#f97316", // Orange-red
          Commodities: "#a855f7", // Violet
        };

        return portfolio.map((item) => ({
          category: item.asset_class,
          amount: item.current_value,
          percentage: parseFloat(item.allocation.toFixed(1)),
          color: colorMap[item.asset_class] || "#64748b", // Default gray
          description: item.description,
        }));
      };

      // Parse family information from API data
      const parseFamilyInfo = (customer) => {
        const familyMembers = [];

        if (
          customer.dependents_name &&
          customer.dependents_age &&
          customer.dependents_relation
        ) {
          const names = customer.dependents_name.split(", ");
          const ages = customer.dependents_age.split(", ");
          const relations = customer.dependents_relation.split(", ");

          for (let i = 0; i < names.length; i++) {
            if (names[i] && ages[i] && relations[i]) {
              familyMembers.push({
                name: names[i].trim(),
                age: parseInt(ages[i].trim()),
                relation: relations[i].trim(),
              });
            }
          }
        }

        return {
          maritalStatus: customer.marital_status || "Unknown",
          dependents: customer.dependents || 0,
          dependentsName: customer.dependents_name || "None",
          dependentsAge: customer.dependents_age || "N/A",
          familyMembers: familyMembers,
        };
      };

      const portfolioBreakdown = transformPortfolioData(customer.portfolio);
      const totalAUM = portfolioBreakdown.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      const familyInfo = parseFamilyInfo(customer);

      const detailData = {
        personalInfo: {
          name: customer.name,
          id: customer.id,
          persona: customer.persona,
          netWorth: customer.netWorth,
          email: customer.email,
          phone: customer.mobile_number,
          joinDate: "January 2022",
          riskTolerance: "Moderate",
        },
        currentHoldings: {
          totalAUM: totalAUM,
          totalAUMFormatted: formatCurrency(totalAUM),
          portfolioBreakdown: portfolioBreakdown,
        },
        familyInfo: familyInfo,
        socialIntelligence: {
          lifestyle:
            customer.persona === "High Net Worth"
              ? "High Net Worth Individual"
              : customer.persona === "Mass Affluent"
              ? "Upper Middle Class Professional"
              : "Emerging Professional",
          interests: ["Investment", "Financial Planning", "Wealth Building"],
          recentLifeEvents: customer.life_events
            ? [customer.life_events]
            : ["No recent events"],
          charitableGiving:
            customer.persona === "High Net Worth"
              ? "Active philanthropist"
              : "Occasional donor",
        },
      };

      setCustomerDetailData(detailData);
    } catch (error) {
      console.error("Failed to load customer details:", error);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    loadHighPotentialData();
    loadCrossSellData();
    loadPerformanceData();
    loadSummaryData();
  }, []);

  const loadHighPotentialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getHighPotential();

      if (response.status === "success" && response.data) {
        const transformedData = response.data.map((item, index) => ({
          id: item.client_id,
          name: item.client_name || "Bank Client",
          email: item.email || "client-name@wealth.com",
          mobile_number: item.mobile_number || "NA",
          persona: item.persona || "Unknown",
          netWorth: formatCurrency(item.net_worth || 0),
          rawNetWorth: item.net_worth || 0,
          potential: item.potential || "No potential available",

          portfolio: item.portfolio || [],
          dependents: item.dependents || 0,
          marital_status: item.marital_status || "Unknown",
          dependents_name: item.dependents_name,
          dependents_age: item.dependents_age,
          dependents_relation: item.dependents_relation,
          life_events: item.life_events,
        }));

        setHighPotentialData(transformedData);
      }
    } catch (err) {
      console.error("Failed to load high potential data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadCrossSellData = async () => {
    try {
      setCrossSellLoading(true);
      setCrossSellError(null);
      const response = await apiService.getCrossSell();

      if (response.status === "success" && response.data) {
        const transformedData = response.data.map((item) => ({
          name: item.client_name || "Unknown Client",
          potential_value_score: item.Priority || "Low",
          currentAUM: formatAUM(item.aum || 0),
          identified_gap: item.identified_gap || "No gap identified",
          discussion_topic: item.discussion_topic || "No Discussion Topic",
          next_actions: item.next_actions || "N/A",
          collaborative_filtering_recommendation:
            item.recommendation || "No Product recommendation",
          product: item.product || "No Product available",
          revenue: formatRevenue(item.revenue || 0),
          rawRevenue: item.revenue || 0,
          value_rank: item.value_rank || 0,
        }));

        transformedData.sort((a, b) => a.value_rank - b.value_rank);

        setCrossSellData(transformedData);
      }
    } catch (err) {
      console.error("Failed to load cross-sell data:", err);
      setCrossSellError("Failed to load cross-sell data. Please try again.");
    } finally {
      setCrossSellLoading(false);
    }
  };

  const loadPerformanceData = async () => {
    try {
      setPerformanceLoading(true);
      setPerformanceError(null);
      const response = await apiService.getPerformance();

      if (response.status === "success" && response.data) {
        setPerformanceData(response.data);
      }
    } catch (err) {
      console.error("Failed to load performance data:", err);
      setPerformanceError("Failed to load performance data. Please try again.");
    } finally {
      setPerformanceLoading(false);
    }
  };

  const loadSummaryData = async () => {
    try {
      setSummaryLoading(true);
      setSummaryError(null);
      const response = await apiService.getSummary();

      if (response.status === "success" && response.data) {
        setSummaryData(response.data);
      }
    } catch (err) {
      console.error("Failed to load summary data:", err);
      setSummaryError("Failed to load summary data. Please try again.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const getDashboardData = () => {
    if (!summaryData) {
      return [
        {
          value: "--",
          label: "Total AUM",
          icon: "💰",
        },
        {
          value: "--",
          label: "Yearly Revenue Opportunity",
          icon: "🎯",
        },
        {
          value: "--",
          label: "Cross-sell Opportunity",
          icon: "📈",
        },
        {
          value: "--",
          label: "Active Clients",
          icon: "👥",
        },
      ];
    }

    return [
      {
        value: formatLargeRevenue(summaryData["Total AUM"] || 0),
        label: "Total AUM",
        icon: "💰",
      },
      {
        value: formatLargeRevenue(
          summaryData["Yearly Revenue Opportunity"] || 0
        ),
        label: "Yearly Revenue Opportunity",
        icon: "🎯",
      },
      {
        value: formatLargeRevenue(summaryData["Cross-Sell Opportunities"] || 0),
        label: "Cross-sell Opportunity",
        icon: "📈",
      },
      {
        value: summaryData["Total Clients"]?.toString() || "0",
        label: "Active Clients",
        icon: "👥",
      },
    ];
  };

  const renderProspectsContent = () => {
    if (loading) {
      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-ping mx-auto"></div>
            </div>
            <p className="text-slate-600 font-medium">
              Loading high potential prospects...
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={loadHighPotentialData}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    const dataToShow = highPotentialData.length > 0 ? highPotentialData : [];

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${theme.iconContainer}`}
            >
              <span className="text-slate-600 text-sm">🤖</span>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${theme.prospectText}`}>
                AI-Ranked High-Potential Prospects
              </h3>
              <p className={`text-sm ${theme.prospectSubtext}`}>
                {dataToShow.length} prospects ranked by potential value
              </p>
            </div>
          </div>
        </div>

        {dataToShow.length === 0 ? (
          <div className="text-center py-12">
            <p className={theme.prospectSubtext}>
              No high potential prospects found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {dataToShow.map((prospect, index) => (
              <div
                key={prospect.id}
                className={`rounded-lg p-6 flex items-center justify-between transition-colors ${theme.prospectCard}`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-md ${theme.clientId}`}
                  >
                    {prospect.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4
                        className={`text-lg font-semibold cursor-pointer hover:${theme.prospectHighlight} transition-colors ${theme.prospectText}`}
                        onClick={() => handleViewCustomer(prospect)}
                      >
                        {prospect.name}
                      </h4>
                      <span
                        className={`px-2.5 py-1 rounded text-xs font-medium ${
                          isDarkMode
                            ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {prospect.persona}
                      </span>
                    </div>

                    <p className={`text-sm mb-2 ${theme.prospectSubtext}`}>
                      Net Worth: {prospect.netWorth}
                    </p>

                    <p className={`text-sm ${theme.prospectHighlight}`}>
                      💡 {prospect.potential}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleCallClient(prospect)}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${theme.actionButtons.secondary}`}
                    title="Call Client"
                  >
                    📞
                  </button>
                  <button
                    className={`px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${theme.actionButtons.view}`}
                    onClick={() => handleViewCustomer(prospect)}
                  >
                    View→
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCrossSellContent = () => {
    if (crossSellLoading) {
      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className={`text-lg ${theme.prospectSubtext}`}>
              Loading cross-sell opportunities...
            </p>
          </div>
        </div>
      );
    }

    if (crossSellError) {
      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{crossSellError}</p>
            <button
              onClick={loadCrossSellData}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    const dataToShow = crossSellData.length > 0 ? crossSellData : [];

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${theme.iconContainer}`}
            >
              <span className="text-slate-600 text-sm">📈</span>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${theme.prospectText}`}>
                Cross-sell & Upsell Opportunities
              </h3>
              <p className={`text-sm ${theme.prospectSubtext}`}>
                {dataToShow.length} AI-identified gaps and product
                recommendations for existing clients
              </p>
            </div>
          </div>
        </div>

        {dataToShow.length === 0 ? (
          <div className="text-center py-12">
            <p className={theme.prospectSubtext}>
              No cross-sell opportunities found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {dataToShow.map((opportunity, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 transition-all duration-300 hover:shadow-xl border ${theme.prospectCard}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4
                        className={`text-lg font-semibold ${theme.prospectText}`}
                      >
                        {opportunity.name}
                      </h4>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                        style={getPriorityStyles(
                          opportunity.potential_value_score
                        )}
                      >
                        {opportunity.potential_value_score} Priority
                      </span>
                    </div>

                    <p className={`text-sm mb-1 ${theme.prospectSubtext}`}>
                      Current AUM:{" "}
                      <span className="font-medium">
                        {opportunity.currentAUM}
                      </span>
                    </p>

                    <p
                      className={`text-sm mb-3 ${theme.prospectHighlight} font-medium`}
                    >
                      {opportunity.identified_gap}
                    </p>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm">💡</span>
                      <p className={`text-sm ${theme.prospectSubtext}`}>
                        <span className="font-medium">
                          Recommended Product:
                        </span>{" "}
                        <span
                          className={`${theme.prospectHighlight} font-medium`}
                        >
                          {opportunity.product}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end space-y-3 ml-8">
                    <div>
                      <p className={`text-xs ${theme.prospectSubtext} mb-1`}>
                        Revenue:
                      </p>
                      <p className={`text-xl font-bold ${theme.prospectText}`}>
                        {opportunity.revenue}
                      </p>
                    </div>

                    <button
                      className={`px-6 py-2 rounded-lg transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105 ${theme.actionButtons.view}`}
                      onClick={() => handleCreateActionPlan(opportunity, true)}
                    >
                      Create Action Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAnalyticsContent = () => {
    if (performanceLoading) {
      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className={`text-lg ${theme.prospectSubtext}`}>
              Loading performance analytics...
            </p>
          </div>
        </div>
      );
    }

    if (performanceError) {
      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{performanceError}</p>
            <button
              onClick={loadPerformanceData}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!performanceData) {
      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <p className={`text-lg ${theme.prospectSubtext}`}>
            No performance data available.
          </p>
        </div>
      );
    }

    const aiMetrics = [
      {
        label: "Prediction Accuracy",
        value: Math.round(performanceData.ai_accuracy * 100),
        displayValue: `${Math.round(performanceData.ai_accuracy * 100)}%`,
        progressColor: "from-blue-500 to-green-500",
        comment:
          "🎯 Exceptional model precision - consistently outperforming industry benchmarks",
      },
      {
        label: "Conversion Rate",
        value: Math.round(performanceData.conversion_rate * 100),
        displayValue: `${Math.round(performanceData.conversion_rate * 100)}%`,
        progressColor: "from-blue-500 to-green-500",
        comment:
          "📊 Balanced performance indicating quality over quantity approach",
      },
      {
        label: "Revenue Attribution",
        value: 75,
        displayValue: formatLargeRevenue(performanceData.revenue_attribution),
        progressColor: "from-blue-500 to-green-500",
        comment: "💰 Strong revenue impact showcasing AI's strategic value",
      },
    ];

    const monthlyMetrics = [
      {
        label: "New Clients Acquired",
        value: performanceData.monthly.new_clients.toString(),
      },
      {
        label: "Cross-sell Success",
        value: performanceData.monthly.cross_sell_success,
      },
      {
        label: "AI Recommendations Used",
        value: performanceData.monthly.ai_recommendation_use,
      },
      {
        label: "Portfolio Growth",
        value: performanceData.monthly.portfolio_growth,
      },
    ];

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${theme.iconContainer}`}
            >
              <span className="text-slate-600 text-sm">📊</span>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${theme.prospectText}`}>
                Performance Analytics
              </h3>
              <p className={`text-sm ${theme.prospectSubtext}`}>
                Real-time AI model and portfolio performance indicators
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Performance Metrics - Reduced Size */}
            <div
              className={`rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/40"
                  : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    isDarkMode ? "bg-slate-600/40" : "bg-slate-100"
                  }`}
                >
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h4
                    className={`text-lg font-bold ${
                      isDarkMode ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    AI Performance Metrics
                  </h4>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Real-time AI model performance indicators
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {aiMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {metric.label}
                      </span>
                      <span
                        className={`font-bold text-sm ${
                          isDarkMode ? "text-slate-100" : "text-slate-800"
                        }`}
                      >
                        {metric.displayValue}
                      </span>
                    </div>
                    <div
                      className={`w-full rounded-full h-2 mb-3 ${
                        isDarkMode ? "bg-slate-700" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${metric.progressColor} transition-all duration-1000 ease-out`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                    {/* AI Comment Section */}
                    <div
                      className={`p-3 rounded-lg border-l-4 mb-4 ${
                        isDarkMode
                          ? "bg-slate-700/20 border-l-blue-400 border border-slate-600/20"
                          : "bg-blue-50/50 border-l-blue-500 border border-blue-100"
                      } transition-all duration-300 hover:shadow-sm`}
                    >
                      <p
                        className={`text-xs leading-relaxed font-medium ${
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                        style={{
                          fontFamily:
                            "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {metric.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Performance - Reduced Size */}
            <div
              className={`rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/40"
                  : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    isDarkMode ? "bg-slate-600/40" : "bg-slate-100"
                  }`}
                >
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h4
                    className={`text-lg font-bold ${
                      isDarkMode ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    Monthly Performance
                  </h4>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Key performance indicators for this month
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {monthlyMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                      isDarkMode
                        ? "bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/40"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      {metric.label}
                    </span>
                    <span
                      className={`font-bold text-sm ${
                        isDarkMode ? "text-slate-100" : "text-slate-800"
                      }`}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CustomerDetailModal = () => {
    if (!isModalOpen) return null;

    return (
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${theme.modalOverlay}`}
      >
        <div
          className={`rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
            isDarkMode
              ? "border border-slate-600/30"
              : "border border-blue-200/50 shadow-blue-100/50"
          } ${theme.modalContainer}`}
        >
          {/* Modal Header - Updated font sizes */}
          <div
            className={`flex items-center justify-between p-6 border-b rounded-t-2xl ${
              isDarkMode
                ? "bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600/30"
                : "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200/50"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br from-blue-600 to-blue-700">
                {selectedCustomer?.id}
              </div>
              <div>
                <h2
                  className={`text-xl font-bold mb-1 ${
                    isDarkMode ? "text-slate-100" : "text-blue-900"
                  }`}
                >
                  {selectedCustomer?.name}
                </h2>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-300" : "text-blue-700"
                  }`}
                >
                  {selectedCustomer?.persona}
                </p>
                <p
                  className={`font-medium text-xs mt-1 ${
                    isDarkMode ? "text-slate-400" : "text-blue-600"
                  }`}
                >
                  Net Worth: {selectedCustomer?.netWorth}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className={`text-2xl font-bold transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center ${
                isDarkMode
                  ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                  : "text-blue-400 hover:text-blue-600 hover:bg-blue-100"
              }`}
            >
              ×
            </button>
          </div>

          {/* Modal Content */}
          <div
            className={`p-6 ${
              isDarkMode
                ? "bg-gradient-to-br from-slate-800 to-slate-900"
                : "bg-gradient-to-br from-blue-50/30 to-white"
            }`}
          >
            {modalLoading ? (
              <div className="flex items-center justify-center py-16">
                <div
                  className={`animate-spin rounded-full h-16 w-16 border-b-4 ${
                    isDarkMode ? "border-slate-400" : "border-blue-500"
                  }`}
                ></div>
                <p
                  className={`ml-6 text-sm ${
                    isDarkMode ? "text-slate-300" : "text-blue-700"
                  }`}
                >
                  Loading customer details...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information - Updated font sizes */}
                <div
                  className={`rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30"
                      : "bg-gradient-to-br from-white to-blue-50/50 border-blue-200/50"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 flex items-center ${
                      isDarkMode ? "text-slate-100" : "text-blue-900"
                    }`}
                  >
                    <span className="mr-2 text-xl">👤</span>
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Name
                      </p>
                      <p
                        className={`font-medium text-sm ${
                          isDarkMode ? "text-slate-200" : "text-blue-900"
                        }`}
                      >
                        {customerDetailData?.personalInfo?.name}
                      </p>
                    </div>
                    <div
                      className={`border-b pb-3 ${
                        isDarkMode ? "border-slate-600/30" : "border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Email
                      </p>
                      <p
                        className={`font-semibold text-sm ${
                          isDarkMode ? "text-slate-200" : "text-blue-900"
                        }`}
                      >
                        {customerDetailData?.personalInfo?.email}
                      </p>
                    </div>
                    <div
                      className={`border-b pb-3 ${
                        isDarkMode ? "border-slate-600/30" : "border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Phone
                      </p>
                      <p
                        className={`font-semibold text-sm ${
                          isDarkMode ? "text-slate-200" : "text-blue-900"
                        }`}
                      >
                        {customerDetailData?.personalInfo?.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Current Holdings - Updated font sizes */}
                <div
                  className={`rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30"
                      : "bg-gradient-to-br from-white to-blue-50/50 border-blue-200/50"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 flex items-center ${
                      isDarkMode ? "text-slate-100" : "text-blue-900"
                    }`}
                  >
                    <span className="mr-2 text-xl">💰</span>
                    Current Holdings
                  </h3>

                  <div
                    className={`mb-4 p-3 rounded-lg border ${
                      isDarkMode
                        ? "bg-slate-700/30 border-slate-600/30"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? "text-slate-400" : "text-blue-700"
                      }`}
                    >
                      Total AUM
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-slate-100" : "text-blue-900"
                      }`}
                    >
                      {customerDetailData?.currentHoldings?.totalAUMFormatted}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie
                            data={
                              customerDetailData?.currentHoldings
                                ?.portfolioBreakdown
                            }
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="percentage"
                          >
                            {customerDetailData?.currentHoldings?.portfolioBreakdown?.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              )
                            )}
                          </Pie>
                          <Tooltip
                            formatter={(value, name, props) => [
                              `${value}% (${formatCurrency(
                                props.payload.amount
                              )})`,
                              props.payload.category,
                            ]}
                            contentStyle={{
                              backgroundColor: isDarkMode
                                ? "#1e293b"
                                : "#ffffff",
                              border: isDarkMode
                                ? "1px solid #475569"
                                : "1px solid #e2e8f0",
                              borderRadius: "8px",
                              color: isDarkMode ? "#f1f5f9" : "#0f172a",
                              fontSize: "12px",
                              boxShadow: isDarkMode
                                ? "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)"
                                : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                            }}
                            labelStyle={{
                              color: isDarkMode ? "#cbd5e1" : "#64748b",
                              fontSize: "11px",
                              fontWeight: "500",
                            }}
                            itemStyle={{
                              color: isDarkMode ? "#f1f5f9" : "#0f172a",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col justify-center space-y-2">
                      {customerDetailData?.currentHoldings?.portfolioBreakdown?.map(
                        (item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <div>
                                <span
                                  className={`font-medium text-xs ${
                                    isDarkMode
                                      ? "text-slate-200"
                                      : "text-blue-900"
                                  }`}
                                >
                                  {item.category}
                                </span>
                                {item.description && (
                                  <p
                                    className={`text-xs ${
                                      isDarkMode
                                        ? "text-slate-400"
                                        : "text-blue-600"
                                    }`}
                                  >
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`font-bold text-xs ${
                                  isDarkMode
                                    ? "text-slate-100"
                                    : "text-blue-900"
                                }`}
                              >
                                {item.percentage}%
                              </div>
                              <div
                                className={`text-xs ${
                                  isDarkMode
                                    ? "text-slate-400"
                                    : "text-blue-600"
                                }`}
                              >
                                {formatCurrency(item.amount)}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Family Information - Updated font sizes */}
                <div
                  className={`rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30"
                      : "bg-gradient-to-br from-white to-blue-50/50 border-blue-200/50"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 flex items-center ${
                      isDarkMode ? "text-slate-100" : "text-blue-900"
                    }`}
                  >
                    <span className="mr-2 text-xl">👨‍👩‍👧‍👦</span>
                    Family Information
                  </h3>
                  <div className="space-y-4">
                    {/* Marital Status */}
                    <div
                      className={`border-b pb-3 ${
                        isDarkMode ? "border-slate-600/30" : "border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Marital Status
                      </p>
                      <p
                        className={`font-semibold text-sm ${
                          isDarkMode ? "text-slate-200" : "text-blue-900"
                        }`}
                      >
                        {customerDetailData?.familyInfo?.maritalStatus}
                      </p>
                    </div>

                    {/* Number of Dependents */}
                    <div
                      className={`border-b pb-3 ${
                        isDarkMode ? "border-slate-600/30" : "border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Number of Dependents
                      </p>
                      <p
                        className={`font-semibold text-sm ${
                          isDarkMode ? "text-slate-200" : "text-blue-900"
                        }`}
                      >
                        {customerDetailData?.familyInfo?.dependents}
                      </p>
                    </div>

                    {/* Family Members Details */}
                    <div>
                      <p
                        className={`text-xs font-medium mb-2 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Family Members Details
                      </p>
                      <div className="space-y-2">
                        {customerDetailData?.familyInfo?.familyMembers?.length >
                        0 ? (
                          customerDetailData.familyInfo.familyMembers.map(
                            (member, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center justify-between p-3 rounded-lg border ${
                                  isDarkMode
                                    ? "bg-slate-700/30 border-slate-600/30"
                                    : "bg-blue-50 border-blue-200"
                                }`}
                              >
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 bg-gradient-to-br from-blue-600 to-blue-700">
                                    {member.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p
                                      className={`font-semibold text-sm ${
                                        isDarkMode
                                          ? "text-slate-200"
                                          : "text-blue-900"
                                      }`}
                                    >
                                      {member.name}
                                    </p>
                                    <p
                                      className={`text-xs ${
                                        isDarkMode
                                          ? "text-slate-400"
                                          : "text-blue-600"
                                      }`}
                                    >
                                      {member.relation}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p
                                    className={`text-xs font-medium ${
                                      isDarkMode
                                        ? "text-slate-300"
                                        : "text-blue-700"
                                    }`}
                                  >
                                    Age: {member.age}
                                  </p>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div
                            className={`p-3 rounded-lg border text-center ${
                              isDarkMode
                                ? "bg-slate-700/30 border-slate-600/30"
                                : "bg-blue-50 border-blue-200"
                            }`}
                          >
                            <p
                              className={`text-sm ${
                                isDarkMode ? "text-slate-400" : "text-blue-600"
                              }`}
                            >
                              No family members listed
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Intelligence */}
                <div
                  className={`rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30"
                      : "bg-gradient-to-br from-white to-blue-50/50 border-blue-200/50"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 flex items-center ${
                      isDarkMode ? "text-slate-100" : "text-blue-900"
                    }`}
                  >
                    <span className="mr-2 text-xl">🔍</span>
                    Social Intelligence
                  </h3>
                  <div className="space-y-4">
                    <div
                      className={`border-b pb-3 ${
                        isDarkMode ? "border-slate-600/30" : "border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Lifestyle
                      </p>
                      <p
                        className={`font-semibold text-sm ${
                          isDarkMode ? "text-slate-200" : "text-blue-900"
                        }`}
                      >
                        {customerDetailData?.socialIntelligence?.lifestyle}
                      </p>
                    </div>

                    <div
                      className={`border-b pb-3 ${
                        isDarkMode ? "border-slate-600/30" : "border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Interests
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {customerDetailData?.socialIntelligence?.interests?.map(
                          (interest, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                isDarkMode
                                  ? "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 border-slate-500"
                                  : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300"
                              }`}
                            >
                              {interest}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div
                      className={`border-b pb-3 ${
                        isDarkMode ? "border-slate-600/30" : "border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-2 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Recent Life Events
                      </p>
                      <div className="space-y-2">
                        {customerDetailData?.socialIntelligence?.recentLifeEvents?.map(
                          (event, idx) => (
                            <div
                              key={idx}
                              className={`flex items-start p-3 rounded-lg border ${
                                isDarkMode
                                  ? "bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-600/30"
                                  : "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
                              }`}
                            >
                              <span
                                className={`mr-2 mt-0.5 text-xs ${
                                  isDarkMode
                                    ? "text-slate-400"
                                    : "text-blue-600"
                                }`}
                              >
                                •
                              </span>
                              <p
                                className={`font-medium text-sm ${
                                  isDarkMode
                                    ? "text-slate-200"
                                    : "text-blue-900"
                                }`}
                              >
                                {event}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-blue-700"
                        }`}
                      >
                        Charitable Giving
                      </p>
                      <div
                        className={`p-3 rounded-lg border ${
                          isDarkMode
                            ? "bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-600/30"
                            : "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
                        }`}
                      >
                        <p
                          className={`font-medium text-sm ${
                            isDarkMode ? "text-slate-200" : "text-blue-900"
                          }`}
                        >
                          {
                            customerDetailData?.socialIntelligence
                              ?.charitableGiving
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div
              className={`mt-6 flex flex-wrap gap-3 justify-end pt-4 border-t ${
                isDarkMode ? "border-slate-600/30" : "border-blue-200"
              }`}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "prospects":
        return renderProspectsContent();
      case "opportunities":
        return renderCrossSellContent();
      case "analytics":
        return renderAnalyticsContent();
      default:
        return renderProspectsContent();
    }
  };

  return (
    <div className={theme.container}>
      <ToastContainer />
      <CustomerDetailModal />
      <ActionPlanModal
        actionPlanModal={actionPlanModal}
        setActionPlanModal={setActionPlanModal}
        actionPlanData={actionPlanData}
        setActionPlanData={setActionPlanData}
        isDarkMode={isDarkMode}
        handleGenerateEmail={handleGenerateEmail}
      />
      <EmailPreviewModal
        emailModal={emailModal}
        setEmailModal={setEmailModal}
        isDarkMode={isDarkMode}
        handleSendEmailFromModal={handleSendEmailFromModal}
      />
      <div className="px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-lg flex items-center px-6 py-6 border transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600/30"
                    : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
                }`}
                style={{ minHeight: 140 }}
              >
                <div className="flex items-center justify-center mr-6 h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <div className="animate-pulse bg-white/30 rounded-full h-8 w-8"></div>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div
                    className={`animate-pulse h-4 w-24 mb-2 rounded ${
                      isDarkMode ? "bg-slate-600" : "bg-slate-300"
                    }`}
                  ></div>
                  <div
                    className={`animate-pulse h-6 w-16 rounded ${
                      isDarkMode ? "bg-slate-600" : "bg-slate-300"
                    }`}
                  ></div>
                </div>
              </div>
            ))
          ) : summaryError ? (
            <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
              <p className="text-red-400 text-sm mb-2">{summaryError}</p>
              <button
                onClick={loadSummaryData}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          ) : (
            getDashboardData().map((card, idx) => (
              <div
                key={idx}
                className={`rounded-xl shadow-lg hover:shadow-xl flex items-center px-6 py-6 border transition-all duration-300 hover:transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600/30"
                    : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
                }`}
                style={{ minHeight: 140 }}
              >
                <div className="flex items-center justify-center mr-6 h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl shadow-lg">
                  {card.icon}
                </div>

                <div className="flex flex-col justify-center flex-1">
                  <div
                    className={`text-sm font-semibold mb-2 uppercase tracking-wide ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {card.label}
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {card.value}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mb-8">
          <div
            className={`flex space-x-1 p-1 rounded-lg w-fit ${theme.tabsContainer}`}
          >
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id ? theme.tabActive : theme.tabInactive
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`rounded-lg shadow-lg min-h-[500px] ${theme.contentArea}`}
        >
          {renderContent()}
        </div>
      </div>
      {login1 && <FloatingChatWidget />}
    </div>
  );
}

export default MainPage;

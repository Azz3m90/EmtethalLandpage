/**
 * Google Analytics 4 (GA4) Configuration for Emtethal
 * Website: https://www.emtethal.com
 * Last Updated: 2024-12-30
 */

// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 measurement ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

// Initialize Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

// Configure GA4 with enhanced settings
gtag("config", GA_MEASUREMENT_ID, {
  // Enhanced measurement settings
  enhanced_measurement_scrolls: true,
  enhanced_measurement_clicks: true,
  enhanced_measurement_forms: true,
  enhanced_measurement_video_engagement: true,

  // Custom settings for Emtethal
  site_speed_sample_rate: 100, // Track site speed for all users
  custom_map: {
    dimension1: "user_language", // Track user language (Arabic/English)
    dimension2: "page_section", // Track which page section users visit
    dimension3: "user_type", // Track user type (new/returning)
    dimension4: "device_type", // Track device type
    dimension5: "traffic_source", // Track traffic source
  },

  // Cookie settings
  cookie_domain: "emtethal.com",
  cookie_expires: 63072000, // 2 years

  // Privacy settings
  anonymize_ip: true,
  allow_google_signals: true,
  allow_ad_personalization_signals: false,
});

// Custom Event Tracking Functions
const EmtethalAnalytics = {
  // Track language switches
  trackLanguageSwitch: function (fromLanguage, toLanguage) {
    gtag("event", "language_switch", {
      event_category: "engagement",
      event_label: `${fromLanguage}_to_${toLanguage}`,
      custom_parameter_1: toLanguage,
    });
  },

  // Track contact form submissions
  trackContactForm: function (formType) {
    gtag("event", "form_submit", {
      event_category: "lead_generation",
      event_label: formType,
      value: 1,
    });
  },

  // Track section scrolling
  trackSectionView: function (sectionName) {
    gtag("event", "section_view", {
      event_category: "engagement",
      event_label: sectionName,
      custom_parameter_2: sectionName,
    });
  },

  // Track service interest
  trackServiceInterest: function (serviceName) {
    gtag("event", "service_interest", {
      event_category: "engagement",
      event_label: serviceName,
      value: 1,
    });
  },

  // Track downloads (if any)
  trackDownload: function (fileName, fileType) {
    gtag("event", "file_download", {
      event_category: "engagement",
      event_label: fileName,
      file_extension: fileType,
    });
  },

  // Track external link clicks
  trackExternalClick: function (linkUrl, linkText) {
    gtag("event", "click", {
      event_category: "external_link",
      event_label: linkUrl,
      transport_type: "beacon",
    });
  },

  // Track video engagement (if videos are added)
  trackVideoPlay: function (videoTitle, videoProgress) {
    gtag("event", "video_play", {
      event_category: "video_engagement",
      event_label: videoTitle,
      value: videoProgress,
    });
  },

  // Track search usage (if search is added)
  trackSiteSearch: function (searchTerm, resultsCount) {
    gtag("event", "search", {
      search_term: searchTerm,
      event_category: "site_search",
      event_label: searchTerm,
      value: resultsCount,
    });
  },

  // Track user engagement time
  trackEngagementTime: function (pageSection, timeSpent) {
    gtag("event", "user_engagement", {
      event_category: "engagement_time",
      event_label: pageSection,
      value: Math.round(timeSpent / 1000), // Convert to seconds
    });
  },

  // Track conversion events
  trackConversion: function (conversionType, value = null) {
    const eventData = {
      event_category: "conversion",
      event_label: conversionType,
    };

    if (value !== null) {
      eventData.value = value;
    }

    gtag("event", "conversion", eventData);
  },
};

// Auto-track scroll depth
let maxScrollDepth = 0;
window.addEventListener("scroll", function () {
  const scrollDepth = Math.round(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );

  if (scrollDepth > maxScrollDepth) {
    maxScrollDepth = scrollDepth;

    // Track significant scroll milestones
    if (scrollDepth >= 25 && scrollDepth < 50 && maxScrollDepth < 25) {
      gtag("event", "scroll", {
        event_category: "engagement",
        event_label: "25_percent",
        value: 25,
      });
    } else if (scrollDepth >= 50 && scrollDepth < 75 && maxScrollDepth < 50) {
      gtag("event", "scroll", {
        event_category: "engagement",
        event_label: "50_percent",
        value: 50,
      });
    } else if (scrollDepth >= 75 && scrollDepth < 100 && maxScrollDepth < 75) {
      gtag("event", "scroll", {
        event_category: "engagement",
        event_label: "75_percent",
        value: 75,
      });
    } else if (scrollDepth >= 100 && maxScrollDepth < 100) {
      gtag("event", "scroll", {
        event_category: "engagement",
        event_label: "100_percent",
        value: 100,
      });
    }
  }
});

// Track page load time
window.addEventListener("load", function () {
  setTimeout(function () {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;

    gtag("event", "page_load_time", {
      event_category: "site_performance",
      event_label: window.location.pathname,
      value: Math.round(loadTime),
    });
  }, 0);
});

// Track user's preferred language
document.addEventListener("DOMContentLoaded", function () {
  const userLang = navigator.language || navigator.userLanguage;
  const pageLang = document.documentElement.lang;

  gtag("event", "page_view_with_context", {
    event_category: "user_context",
    custom_parameter_1: pageLang,
    browser_language: userLang,
    page_language: pageLang,
  });
});

// Export for global use
window.EmtethalAnalytics = EmtethalAnalytics;

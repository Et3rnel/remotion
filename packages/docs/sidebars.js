module.exports = {
  someSidebar: [
    {
      type: "category",
      label: "Getting started",
      items: [
        "getting-started",
        "the-fundamentals",
        "animating-properties",
        "reusability",
        "timeline",
        "render",
      ],
    },
    {
      type: "category",
      label: "Techniques",
      items: [
        "assets",
        "using-audio",
        "fonts",
        "using-randomness",
        "audio-visualization",
        "use-img-and-iframe",
        "javascript",
        "data-fetching",
        "encoding",
        "transparent-videos",
        "parametrized-rendering",
        "dynamic-metadata",
        "ssr",
        "webpack",
        "legacy-babel",
      ],
    },

    "cli",
    "config",
    {
      type: "category",
      label: "API - Core",
      items: [
        "continue-render",
        "delay-render",
        "interpolate",
        "interpolate-colors",
        "get-input-props",
        "measure-spring",
        "random",
        "register-root",
        "spring",
        "use-current-frame",
        "use-video-config",
        "audio",
        "composition",
        "sequence",
        "video",
        "absolute-fill",
        "img",
        "iframe",
        "easing",
      ],
    },
    {
      type: "category",
      label: "API - @remotion/bundler",
      items: ["bundle"],
    },
    "gif",
    {
      type: "category",
      label: "API - @remotion/media-utils",
      items: [
        "get-audio-data",
        "get-audio-duration",
        "get-video-metadata",
        "get-waveform-portion",
        "use-audio-data",
        "visualize-audio",
      ],
    },
    {
      type: "category",
      label: "API - @remotion/three",
      items: ["three", "three-canvas", "three-video"],
    },
    {
      type: "category",
      label: "API - @remotion/renderer",
      items: ["get-compositions", "render-frames", "stitch-frames-to-video"],
    },
    {
      type: "category",
      label: "Troubleshooting",
      items: ["timeout", "performance"],
    },
    "2-0-migration",
    "license",
  ],
};

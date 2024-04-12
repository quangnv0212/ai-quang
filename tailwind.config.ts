import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        visby: ["Visby", "sans"],
      },
      fontSize: {
        "6-8": ["6px", "8px"],
        "8-10": ["8px", "10px"],
        "10-10": ["10px", "10px"],
        "10-12": ["10px", "12px"],
        "10-14": ["10px", "14px"],
        "10-16": ["10px", "16px"],
        "11-16": ["11px", "16px"],
        "12-12": ["12px", "12px"],
        "12-14": ["12px", "14px"],
        "12-16": ["12px", "16px"],
        "12-18": ["12px", "18px"],
        "12-20": ["12px", "20px"],
        "12-22": ["12px", "22px"],
        "12-24": ["12px", "24px"],
        "13-18": ["13px", "18px"],
        "14-14": ["14px", "14px"],
        "14-16": ["14px", "16px"],
        "14-18": ["14px", "18px"],
        "14-20": ["14px", "20px"],
        "14-22": ["14px", "22px"],
        "14-24": ["14px", "24px"],
        "14-28": ["14px", "28px"],
        "16-16": ["16px", "16px"],
        "16-18": ["16px", "18px"],
        "16-20": ["16px", "20px"],
        "16-22": ["16px", "22px"],
        "16-24": ["16px", "24px"],
        "16-28": ["16px", "28px"],
        "18-18": ["18px", "18px"],
        "18-20": ["18px", "20px"],
        "18-22": ["18px", "22px"],
        "18-24": ["18px", "24px"],
        "18-28": ["18px", "28px"],
        "18-32": ["18px", "32px"],
        "20-20": ["20px", "20px"],
        "20-22": ["20px", "22px"],
        "20-24": ["20px", "24px"],
        "20-28": ["20px", "28px"],
        "20-30": ["20px", "30px"],
        "20-32": ["20px", "32px"],
        "22-28": ["22px", "28px"],
        "24-28": ["24px", "28px"],
        "24-30": ["24px", "30px"],
        "24-32": ["24px", "32px"],
        "24-36": ["24px", "36px"],
        "24-38": ["24px", "38px"],
        "26-40": ["26px", "40px"],
        "28-32": ["28px", "32px"],
        "28-36": ["28px", "36px"],
        "28-38": ["28px", "38px"],
        "28-40": ["28px", "40px"],
        "28-44": ["28px", "44px"],
        "28-52": ["28px", "52px"],
        "30-40": ["30px", "40px"],
        "32-32": ["32px", "32px"],
        "32-40": ["32px", "40px"],
        "32-48": ["32px", "48px"],
        "34-34": ["34px", "34px"],
        "36-44": ["36px", "44px"],
        "36-52": ["36px", "52px"],
        "40-40": ["40px", "40px"],
        "40-48": ["40px", "48px"],
        "40-56": ["40px", "56px"],
        "48-48": ["48px", "48px"],
        "48-64": ["48px", "64px"],
        "48-72": ["48px", "72px"],
        "52-64": ["52px", "64px"],
        "56-64": ["56px", "64px"],
        "64-64": ["64px", "64px"],
        "88-88": ["88px", "88px"],
        "72-86": ["72px", "86px"],
        "72-100": ["72px", "100px"],
        "240-290": ["240px", "290px"],
        "400-484": ["400px", "484px"],
      },
      colors: {
        grayf4: "#F4F4F4",
        grayf7: "#F7F7F7",
        grayfc: "#FCFCFC",
        graye4: "#e4e4e4",
        "primary-hover": "#2d509b",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#2d669b",
          "primary-hover": "#2d509b",
          grayf4: "#F4F4F4",
          grayf7: "#F7F7F7",
          grayfc: "#FCFCFC",
          graye4: "#e4e4e4",
          gray80: "#808191",
          primaryText: "#11142D",
          secondary: "#2ED480",
        },
        light: {
          primary: "#2d669b",
          "primary-hover": "#2d509b",
          grayf4: "#F4F4F4",
          grayf7: "#F7F7F7",
          grayfc: "#FCFCFC",
          graye4: "#e4e4e4",
          gray80: "#808191",
          primaryText: "#11142D",
          secondary: "#2ED480",
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;

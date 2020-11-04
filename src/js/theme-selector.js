matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    let theme = 
    matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark" : "light";
    documentElement.setAttribute("theme", theme);
  });
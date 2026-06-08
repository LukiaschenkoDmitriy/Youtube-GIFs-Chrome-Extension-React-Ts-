const setYoutubeTheme = () => {
    const isDark = document.documentElement.hasAttribute('dark') || document.documentElement.getAttribute('data-dark-theme') === 'true';
    document.body.classList.add(isDark ? "gc-theme-dark" : "gc-theme-white");
}

export default setYoutubeTheme;
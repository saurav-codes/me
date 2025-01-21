// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'ph ph-moon' : 'ph ph-sun';
    }
});

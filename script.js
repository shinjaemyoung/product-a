document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const ballsContainer = document.getElementById('balls-container');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // 테마 설정
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    };

    const updateThemeIcon = (theme) => {
        if (theme === 'dark') {
            themeIcon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        } else {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    };

    // 초기 테마 로드
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    const getBallColor = (num) => {
        if (num >= 1 && num <= 10) return 'ball-yellow';
        if (num >= 11 && num <= 20) return 'ball-blue';
        if (num >= 21 && num <= 30) return 'ball-red';
        if (num >= 31 && num <= 40) return 'ball-gray';
        return 'ball-green';
    };

    const generateLottoNumbers = () => {
        generateBtn.disabled = true;
        generateBtn.style.opacity = '0.7';
        
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        ballsContainer.innerHTML = '';

        sortedNumbers.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.className = `lotto-ball ${getBallColor(num)}`;
            ball.textContent = num;
            ball.style.animationDelay = `${index * 0.15}s`;
            ballsContainer.appendChild(ball);
        });

        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.style.opacity = '1';
        }, sortedNumbers.length * 150 + 600);
    };

    generateBtn.addEventListener('click', generateLottoNumbers);
});

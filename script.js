document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const ballsContainer = document.getElementById('balls-container');

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

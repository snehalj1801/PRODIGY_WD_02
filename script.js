
        let startTime = 0;
        let elapsedTime = 0;
        let timerInterval;

        const display = document.getElementById('display');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');
        const resetButton = document.getElementById('reset');
        const timestampsList = document.getElementById('timestampsList');

        function formatTime(time) {
            const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
            const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
            const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}.${milliseconds}`;
        }

        function updateDisplay() {
            const currentTime = Date.now();
            elapsedTime = currentTime - startTime;
            display.textContent = formatTime(elapsedTime);
        }

        function addTimestamp() {
            const timestamp = document.createElement('li');
            timestamp.textContent = formatTime(elapsedTime);
            timestampsList.appendChild(timestamp);
        }

        startButton.addEventListener('click', () => {
            if (!timerInterval) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(updateDisplay, 10);
            }
        });

        stopButton.addEventListener('click', () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                addTimestamp();
            }
        });

        resetButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            elapsedTime = 0;
            display.textContent = formatTime(0);
            timestampsList.innerHTML = '';
        });
    
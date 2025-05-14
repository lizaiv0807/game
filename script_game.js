let robotLevel, rounds, userScore = 0, robotScore = 0, draws = 0, currentRound = 0;
        let playerHistory = [];
        
        // Статистика всіх ігор
        let overallStats = {
            easy: { userWins: 0, robotWins: 0, draws: 0 },
            medium: { userWins: 0, robotWins: 0, draws: 0 },
            hard: { userWins: 0, robotWins: 0, draws: 0 }
        };

        function startGame() {
            robotLevel = document.getElementById('robotLevel').value;
            rounds = parseInt(document.getElementById('rounds').value);

            if (isNaN(rounds) || rounds < 1) {
                alert('Будь ласка, введіть коректну кількість раундів.');
                return;
            }

            document.getElementById('gameBlock').classList.remove('hidden');
            document.getElementById('resultsBlock').classList.add('hidden');
            document.getElementById('roundResult').innerHTML = '';
            currentRound = 0;
            userScore = 0;
            robotScore = 0;
            draws = 0;
            playerHistory = [];
        }

        function playRound() {
            if (currentRound < rounds) {
                const playerChoice = document.getElementById('playerChoice').value;
                const robotChoice = getRobotChoice();
                const result = determineWinner(playerChoice, robotChoice);
                
                let roundMessage = `Раунд ${currentRound + 1}: Ваш вибір: ${playerChoice}, Вибір бота: ${robotChoice}. `;
                if (result === 'player') {
                    userScore++;
                    roundMessage += 'Ви виграли!';
                } else if (result === 'robot') {
                    robotScore++;
                    roundMessage += 'Ви програли!';
                } else {
                    draws++;
                    roundMessage += 'Нічия!';
                }

                document.getElementById('roundResult').innerHTML = roundMessage;
                document.getElementById('roundResult').classList.remove('hidden');

                currentRound++;
                if (currentRound >= rounds) {
                    updateOverallStats();
                    displayFinalResults();
                } else {
                    setTimeout(() => {
                        document.getElementById('roundResult').innerHTML = ''; // Очищує результати раунду для наступного
                    }, 8000); // Затримка перед очищенням 8 секунд
                }
            }
        }

        function getRobotChoice() {
            if (robotLevel === 'easy') {
                return 'rock'; // Детермінований вибір
            } else if (robotLevel === 'medium') {
                const choices = ['rock', 'scissors', 'paper'];
                return choices[Math.floor(Math.random() * choices.length)]; // Випадковий вибір
            } else {
               return adaptiveChoice();
            }
        }

        function adaptiveChoice() {
            if (playerHistory.length === 0) {
                return 'rock'; 
            }

            const lastChoice = playerHistory[playerHistory.length - 1];

            if (Math.random() < 0.2) { // 30% ймовірність випадкового вибору
                const choices = ['rock', 'scissors', 'paper'];
                return choices[Math.floor(Math.random() * choices.length)];
            }

            if (lastChoice === 'rock') return 'paper'; 
            if (lastChoice === 'scissors') return 'rock'; 
            if (lastChoice === 'paper') return 'scissors'; 
        }

        function determineWinner(player, robot) {
            if (player === robot) return 'draw';
            if ((player === 'rock' && robot === 'scissors') ||
                (player === 'scissors' && robot === 'paper') ||
                (player === 'paper' && robot === 'rock')) {
                return 'player';
            }
            return 'robot';
        }

        function updateOverallStats() {
            overallStats[robotLevel].userWins += userScore;
            overallStats[robotLevel].robotWins += robotScore;
            overallStats[robotLevel].draws += draws;
        }

        function displayFinalResults() {
            document.getElementById('gameBlock').classList.add('hidden');
            document.getElementById('resultsBlock').classList.remove('hidden');
            document.getElementById('resultText').innerText = `Кінець гри! Ви виграли: ${userScore}, Бот виграв: ${robotScore}, Нічия: ${draws}`;
            document.getElementById('finalStats').innerText = userScore > robotScore ? 'Вітаємо, ви перемогли!' :
                userScore < robotScore ? 'На жаль, ви програли.' : 'Нічия!';

            displayOverallStats();
        }

        function displayOverallStats() {
            const statsMessage = `
                Загальна статистика:
                Простий: Перемоги - ${overallStats.easy.userWins}, Програші - ${overallStats.easy.robotWins}, Нічії - ${overallStats.easy.draws}
                Середній: Перемоги - ${overallStats.medium.userWins}, Програші - ${overallStats.medium.robotWins}, Нічії - ${overallStats.medium.draws}
                Складний: Перемоги - ${overallStats.hard.userWins}, Програші - ${overallStats.hard.robotWins}, Нічії - ${overallStats.hard.draws}
            `;
            document.getElementById('overallStats').innerText = statsMessage;
            document.getElementById('overallStats').classList.remove('hidden');
        }
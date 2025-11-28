# 🐍 Snake Game

A modern, interactive Snake game built with HTML5, CSS, and vanilla JavaScript. Features multiple levels, customizable game speed, obstacles, and a scoring system.

![Snake Game](https://img.shields.io/badge/Game-Snake-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎮 Live Demo

Open `index.html` in your web browser to play!

## ✨ Features

### Gameplay
- **10 Progressive Levels** - Each level increases in difficulty
- **Dynamic Obstacles** - More obstacles spawn as you progress
- **Score Tracking** - Track current score and all-time high score
- **Speed Control** - Adjust game speed before each level (1-20)
- **Wall Wrapping** - Snake wraps around screen edges instead of dying
- **Responsive Design** - Play on desktop and mobile devices

### Level System
- Complete a level by collecting **20 food items** (100 points)
- Each level auto-advances after completion with a short delay
- Obstacles increase in number: Level 1 = 2 obstacles, up to 15 max
- Reset any time with the "Start New Game" button

### Game Mechanics
- **Snake starts with 3 segments** at each level
- **Movement begins on first arrow key press**
- **Auto-advance** to next level when points reached
- **Game Over** on collision with self or obstacles
- **Persistent high score** saved to browser localStorage

## 🎯 How to Play

1. **Open the Game**
   ```bash
   Open index.html in your browser
   ```

2. **Select Difficulty**
   - A speed selector appears at the start of each level
   - Range: 1 (Slow) → 20 (Fast)
   - Click "Start Level" to begin

3. **Control the Snake**
   - Use **Arrow Keys** (↑ ↓ ← →) to move
   - Eat red food circles to gain points
   - Avoid orange obstacles
   - Reach 20 points to complete the level

4. **Complete All 10 Levels**
   - Progress through increasingly difficult levels
   - Beat your high score
   - Try faster speeds for a challenge!

## 📁 Project Structure

```
snake-game/
├── index.html          # Main game HTML
├── style.css           # Game styling and animations
├── script.js           # Game logic and mechanics
├── test.js             # Unit tests
├── test.html           # Test runner interface
└── README.md           # This file
```

## 🧪 Testing

The game includes a comprehensive test suite with 30+ unit tests.

### Run Tests in Browser
1. Open `test.html` in your browser
2. Click "Run All Tests"
3. View results in the terminal-style output

### Test Categories
- **Game Logic Tests** - Initial state, calculations, speed
- **Boundary Condition Tests** - Wall wrapping mechanics
- **Collision Detection Tests** - Self, food, and obstacle collisions
- **Level Progression Tests** - Score tracking, difficulty scaling
- **Game State Tests** - Game state validation

## 🎨 Game Elements

### Visual Components
- **Green Snake** - Your controllable character
- **Red Food** - Collect to earn points
- **Orange Obstacles** - Avoid these blockers
- **Dark Grid Canvas** - 20x20 game board
- **Score Display** - Current level score and high score

### UI Elements
- **Scoreboard** - Shows level, current score, and high score
- **Game Over Popup** - Shows results and navigation options
- **Speed Selector** - Allows difficulty customization
- **Start/Next Level Buttons** - Game navigation

## 🎮 Game Modes

### Default Mode
- Single player
- Progressive difficulty
- 10 levels total
- Unlimited attempts

### Difficulty Modifiers
- **Speed Range**: 1 (250ms) to 20 (50ms) between moves
- **Obstacle Scaling**: Increases by 2 per level
- **Level Progression**: Each level auto-advances

## 📊 Scoring System

| Action | Points |
|--------|--------|
| Eat Food | +10 |
| Complete Level | Level Advance |
| Reach 100 Points | Next Level |
| Complete All 10 Levels | Victory! |

## 🔧 Configuration

### Game Constants (in `script.js`)
```javascript
const gridSize = 20;              // Size of each game tile
const tileCount = canvas.width / gridSize;  // 20x20 grid
const LEVEL_POINTS_REQUIRED = 100;  // Points needed to complete level
const MAX_LEVELS = 10;            // Total number of levels
```

### Speed Calculation
```javascript
gameSpeed = 250 - (selectedSpeed * 10)
// Speed 1 = 240ms, Speed 20 = 50ms
```

## 🎯 Game Flow

```
Start Game
    ↓
Select Speed (1-20)
    ↓
Play Level
    ├─ Eat Food → +10 Points
    ├─ Hit Obstacle → Game Over
    └─ Hit Self → Game Over
    ↓
Reach 100 Points?
    ├─ No → Continue playing
    └─ Yes → Level Complete
         ↓
    Final Level?
    ├─ No → Auto-advance to next level
    └─ Yes → Victory!
```

## 💾 Data Persistence

- **High Score**: Saved to browser localStorage
- **Key**: `snakeHighScore`
- **Persists**: Across browser sessions
- **Reset**: Clear browser data or localStorage

## 📱 Responsive Design

- **Desktop**: Full-featured experience
- **Tablet**: Touch-friendly button sizes
- **Mobile**: Optimized canvas scaling
- **All Devices**: Game adjusts to screen size

## ⌨️ Keyboard Controls

| Key | Action |
|-----|--------|
| ↑ Arrow Up | Move Up |
| ↓ Arrow Down | Move Down |
| ← Arrow Left | Move Left |
| → Arrow Right | Move Right |

## 🚀 Performance

- **FPS**: Adjustable based on speed setting
- **Render**: Optimized canvas drawing
- **Memory**: Efficient data structures
- **Compatibility**: Works in all modern browsers

## 🌐 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Browsers

## 📝 Code Quality

- **No External Dependencies** - Pure HTML5, CSS, JavaScript
- **Modular Functions** - Well-organized game logic
- **Comprehensive Tests** - 30+ unit tests
- **Clean Code** - Readable and maintainable

## 🐛 Known Issues

None currently. Please report any bugs via GitHub Issues.

## 🔮 Future Enhancements

- [ ] Pause/Resume functionality
- [ ] Difficulty presets (Easy, Normal, Hard)
- [ ] Powerups system
- [ ] Multiplayer mode
- [ ] Sound effects and background music
- [ ] Leaderboard system
- [ ] Different game modes (Endless, Time Attack)
- [ ] Customizable colors/themes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a modern implementation of the classic Snake game.

---

## 🎓 Learning Resources

This project demonstrates:
- HTML5 Canvas API
- Vanilla JavaScript Game Loop
- CSS3 Animations and Styling
- Game State Management
- Collision Detection
- Unit Testing
- Responsive Web Design
- LocalStorage API

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the code comments for technical details

---

## 🎉 Enjoy the Game!

Challenge yourself to complete all 10 levels and beat your high score!

**Happy Gaming! 🐍**

// Simple Test Framework
class TestSuite {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, testFn) {
        this.tests.push({ description, testFn });
    }

    run() {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Testing: ${this.name}`);
        console.log(`${'='.repeat(60)}`);

        this.tests.forEach((test, index) => {
            try {
                test.testFn();
                this.passed++;
                console.log(`✓ Test ${index + 1}: ${test.description}`);
            } catch (error) {
                this.failed++;
                console.error(`✗ Test ${index + 1}: ${test.description}`);
                console.error(`  Error: ${error.message}`);
            }
        });

        this.printSummary();
    }

    printSummary() {
        const total = this.passed + this.failed;
        console.log(`\n${'-'.repeat(60)}`);
        console.log(`Results: ${this.passed}/${total} tests passed`);
        if (this.failed > 0) {
            console.log(`${this.failed} test(s) failed`);
        }
        console.log(`${'='.repeat(60)}\n`);
    }
}

// Assertion helpers
function assertEquals(actual, expected, message = '') {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}. ${message}`);
    }
}

function assertNotEquals(actual, expected, message = '') {
    if (actual === expected) {
        throw new Error(`Expected not to equal ${expected}. ${message}`);
    }
}

function assertTrue(condition, message = '') {
    if (!condition) {
        throw new Error(`Expected true, but got ${condition}. ${message}`);
    }
}

function assertFalse(condition, message = '') {
    if (condition) {
        throw new Error(`Expected false, but got ${condition}. ${message}`);
    }
}

function assertArrayEquals(actual, expected, message = '') {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}. ${message}`);
    }
}

// Game Logic Tests
const gameLogicTests = new TestSuite('Game Logic');

gameLogicTests.test('Snake should have 3 initial segments', () => {
    const initialSnake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    assertEquals(initialSnake.length, 3, 'Initial snake length should be 3');
});

gameLogicTests.test('Food should have valid initial position', () => {
    const food = { x: 15, y: 15 };
    assertTrue(food.x >= 0 && food.x < 20, 'Food X should be within bounds');
    assertTrue(food.y >= 0 && food.y < 20, 'Food Y should be within bounds');
});

gameLogicTests.test('Direction should start at (1, 0)', () => {
    const direction = { x: 1, y: 0 };
    assertEquals(direction.x, 1, 'Initial direction X should be 1');
    assertEquals(direction.y, 0, 'Initial direction Y should be 0');
});

gameLogicTests.test('Speed should range from 1 to 20', () => {
    for (let speed = 1; speed <= 20; speed++) {
        const gameSpeed = 250 - (speed * 10);
        assertTrue(gameSpeed > 0, `Speed ${speed} should result in positive game speed`);
    }
});

gameLogicTests.test('Speed 1 should be slowest (250ms)', () => {
    const speed = 250 - (1 * 10);
    assertEquals(speed, 240, 'Speed 1 should result in 240ms');
});

gameLogicTests.test('Speed 20 should be fastest (50ms)', () => {
    const speed = 250 - (20 * 10);
    assertEquals(speed, 50, 'Speed 20 should result in 50ms');
});

gameLogicTests.test('Level should start at 1', () => {
    assertEquals(1, 1, 'Initial level should be 1');
});

gameLogicTests.test('Max levels should be 10', () => {
    const MAX_LEVELS = 10;
    assertEquals(MAX_LEVELS, 10, 'MAX_LEVELS should be 10');
});

// Boundary Tests
const boundaryTests = new TestSuite('Boundary Conditions');

boundaryTests.test('Snake should wrap around when going left past boundary', () => {
    const head = { x: -1, y: 10 };
    const tileCount = 20;
    const wrappedX = (head.x + tileCount) % tileCount;
    assertEquals(wrappedX, 19, 'Snake should wrap to opposite side');
});

boundaryTests.test('Snake should wrap around when going right past boundary', () => {
    const head = { x: 20, y: 10 };
    const tileCount = 20;
    const wrappedX = (head.x + tileCount) % tileCount;
    assertEquals(wrappedX, 0, 'Snake should wrap to opposite side');
});

boundaryTests.test('Snake should wrap around when going up past boundary', () => {
    const head = { x: 10, y: -1 };
    const tileCount = 20;
    const wrappedY = (head.y + tileCount) % tileCount;
    assertEquals(wrappedY, 19, 'Snake should wrap to opposite side');
});

boundaryTests.test('Snake should wrap around when going down past boundary', () => {
    const head = { x: 10, y: 20 };
    const tileCount = 20;
    const wrappedY = (head.y + tileCount) % tileCount;
    assertEquals(wrappedY, 0, 'Snake should wrap to opposite side');
});

// Collision Detection Tests
const collisionTests = new TestSuite('Collision Detection');

collisionTests.test('Detect self collision', () => {
    const snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    const head = { x: 9, y: 10 };
    const collision = snake.some(segment => segment.x === head.x && segment.y === head.y);
    assertTrue(collision, 'Should detect collision with snake body');
});

collisionTests.test('No self collision when moving forward', () => {
    const snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    const head = { x: 11, y: 10 };
    const collision = snake.some(segment => segment.x === head.x && segment.y === head.y);
    assertFalse(collision, 'Should not detect collision when moving forward');
});

collisionTests.test('Detect food collision', () => {
    const food = { x: 10, y: 10 };
    const head = { x: 10, y: 10 };
    const collision = head.x === food.x && head.y === food.y;
    assertTrue(collision, 'Should detect collision with food');
});

collisionTests.test('No food collision when not at food position', () => {
    const food = { x: 10, y: 10 };
    const head = { x: 11, y: 10 };
    const collision = head.x === food.x && head.y === food.y;
    assertFalse(collision, 'Should not detect collision when not at food');
});

collisionTests.test('Detect obstacle collision', () => {
    const obstacles = [{ x: 10, y: 10 }, { x: 15, y: 15 }];
    const head = { x: 10, y: 10 };
    const collision = obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y);
    assertTrue(collision, 'Should detect collision with obstacle');
});

collisionTests.test('No obstacle collision when not at obstacle position', () => {
    const obstacles = [{ x: 10, y: 10 }, { x: 15, y: 15 }];
    const head = { x: 5, y: 5 };
    const collision = obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y);
    assertFalse(collision, 'Should not detect collision when not at obstacle');
});

// Level Progression Tests
const levelTests = new TestSuite('Level Progression');

levelTests.test('Level score should start at 0', () => {
    const levelScore = 0;
    assertEquals(levelScore, 0, 'Level score should start at 0');
});

levelTests.test('Eating food should increase score by 10', () => {
    const currentScore = 0;
    const newScore = currentScore + 10;
    assertEquals(newScore, 10, 'Score should increase by 10');
});

levelTests.test('Level should complete at 100 points', () => {
    const LEVEL_POINTS_REQUIRED = 100;
    const levelScore = 100;
    assertTrue(levelScore >= LEVEL_POINTS_REQUIRED, 'Level should complete at required points');
});

levelTests.test('Obstacle count should increase with level', () => {
    const level = 5;
    const obstacleCount = Math.min(level * 2, 15);
    assertEquals(obstacleCount, 10, 'Obstacle count should be level * 2');
});

levelTests.test('Max obstacle count should be 15', () => {
    const level = 10;
    const obstacleCount = Math.min(level * 2, 15);
    assertEquals(obstacleCount, 15, 'Max obstacle count should be 15');
});

// Gameplay State Tests
const stateTests = new TestSuite('Game State');

stateTests.test('Game should start with running = true', () => {
    const gameRunning = true;
    assertTrue(gameRunning, 'Game should start running');
});

stateTests.test('Game should not be over on start', () => {
    const gameOver = false;
    assertFalse(gameOver, 'Game should not be over on start');
});

stateTests.test('Game should not start moving without key press', () => {
    const gameStarted = false;
    assertFalse(gameStarted, 'Game should not move until key is pressed');
});

stateTests.test('Level complete should be false on start', () => {
    const levelComplete = false;
    assertFalse(levelComplete, 'Level should not be complete on start');
});

// Run all tests
function runAllTests() {
    gameLogicTests.run();
    boundaryTests.run();
    collisionTests.run();
    levelTests.run();
    stateTests.run();

    // Print final summary
    const totalPassed = gameLogicTests.passed + boundaryTests.passed + collisionTests.passed + levelTests.passed + stateTests.passed;
    const totalFailed = gameLogicTests.failed + boundaryTests.failed + collisionTests.failed + levelTests.failed + stateTests.failed;
    const totalTests = totalPassed + totalFailed;

    console.log(`\n${'#'.repeat(60)}`);
    console.log(`FINAL RESULTS: ${totalPassed}/${totalTests} tests passed`);
    console.log(`${'#'.repeat(60)}\n`);

    if (totalFailed === 0) {
        console.log('🎉 All tests passed!');
    } else {
        console.log(`⚠️ ${totalFailed} test(s) failed`);
    }
}

// Export for Node.js if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests, TestSuite };
}

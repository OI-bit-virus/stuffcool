// physics.js

class PhysicsEngine {
    constructor(gravity = 9.81) {
        this.gravity = gravity;
        this.objects = [];
    }

    addObject(object) {
        this.objects.push(object);
    }

    update(deltaTime) {
        this.objects.forEach(object => {
            if (object.isStatic) return;
            object.velocity.y += this.gravity * deltaTime; // Apply gravity
            object.position.x += object.velocity.x * deltaTime;
            object.position.y += object.velocity.y * deltaTime;
            this.checkCollision(object);
        });
    }

    checkCollision(object) {
        // Simple AABB collision detection
        for (let other of this.objects) {
            if (other !== object) {
                if (this.isColliding(object, other)) {
                    this.resolveCollision(object, other);
                }
            }
        }
    }

    isColliding(a, b) {
        return (a.position.x < b.position.x + b.width &&
                a.position.x + a.width > b.position.x &&
                a.position.y < b.position.y + b.height &&
                a.position.y + a.height > b.position.y);
    }

    resolveCollision(a, b) {
        // Simple collision resolution logic
        let overlapX = Math.min(a.position.x + a.width - b.position.x, b.position.x + b.width - a.position.x);
        let overlapY = Math.min(a.position.y + a.height - b.position.y, b.position.y + b.height - a.position.y);

        if (overlapX < overlapY) {
            a.position.x += overlapX * (a.position.x < b.position.x ? -1 : 1);
        } else {
            a.position.y += overlapY * (a.position.y < b.position.y ? -1 : 1);
        }
    }
}

// Example usage
const engine = new PhysicsEngine();
const object1 = { position: { x: 0, y: 0 }, velocity: { x: 1, y: 0 }, width: 50, height: 50, isStatic: false };
const object2 = { position: { x: 100, y: 100 }, velocity: { x: -1, y: 0 }, width: 50, height: 50, isStatic: false };
engine.addObject(object1);
engine.addObject(object2);

// Update loop (to be called every frame)
function update(deltaTime) {
    engine.update(deltaTime);
}


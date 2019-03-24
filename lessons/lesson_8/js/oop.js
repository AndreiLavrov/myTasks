// Пример использования конструктора

function Donkey(name, weight) {
    let _name = name;
    this.weight = weight;
    this.getInfo = function() {
        return `Имя: ${_name}, Вес: ${this.weight}`;
    }
}

const ia = new Donkey('Ia', 120);

// ia = new Object();
// ia.constructor = Donkey
// ia.__proto__ = Donkey.prototype
// const ia = this.constructor

console.log(ia.getInfo());
console.log(ia instanceof Donkey);

function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} says`);
};

function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype.speak = function() {
    Animal.prototype.speak.call(this);
    console.log('woof');
};

function Cat(name) {
    Animal.call(this, name);
}

Cat.prototype.speak = function() {
    Animal.prototype.speak.call(this);
    console.log('meeeou');
};

const fish = {
    speak: function() {
        console.log(`i cant speak`);
    }
};

function Zoo(animals) {
    this.animals = animals;
    this.callAnimals = function() {
      this.animals.forEach(function(item){
          item.speak();
      });
    };
}

const dog = new Dog('Tuzik');
const cat = new Cat('Matroskin');
const unknown = new Animal('Alien');

const zoo = new Zoo([dog, cat, unknown, fish]);
zoo.callAnimals();

function Calculator() {
    const actions = {
        add: function (a, b) {
            return a + b;

        },
        sub: function (a, b) {
            return a - b;

        },
        mul: function (a, b) {
            return a * b;

        },
        div: function (a, b) {
            return a / b;

        },
    };

    this.runAction = function (action, a, b) {
        try {
            return actions[action](a, b);
        } catch (e) {
            if (action in actions === false) {
                console.log('You try to use unknown method. Please try again with next one: add, sub, mul, div');
            }
        }
    }
}

const calc = new Calculator();

console.log(calc.runAction('sum', 1, 3));
console.log(calc.runAction('add', 1, 3));








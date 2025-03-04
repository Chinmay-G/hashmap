import { LinkedList, Node } from "./linked-list.js";

class HashMap {
    capacity;
    loadFactor;
    buckets;
    size;

    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    getBucket(key) {
        const hashCode = this.hash(key);
        return this.buckets[hashCode];
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++)
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        let bucket = this.buckets[hashCode];

        if (bucket && bucket.containsKey(key)) {
            let index = bucket.findKey(key);
            let item = bucket.at(index);
            item.value.value = value;
            return;
        }
        if (!bucket) {
            this.buckets[hashCode] = new LinkedList();
        }
        this.buckets[hashCode].append({ key, value });
        this.size++;

        if (this.size > (this.capacity * this.loadFactor)) {
            console.log('Growing the bucket...');
            this.resize();
        }
    }

    // Returns value assigned to the key
    get(key) {
        const bucket = this.getBucket(key);
        if (!bucket.containsKey(key)) return null;

        const index = bucket.findKey(key);
        return bucket.at(index).value.value;
    }

    // Returns true or false
    has(key) {
        const bucket = this.getBucket(key);
        if (!bucket) return false;
        return bucket.containsKey(key);
    }

    remove(key) {
        const bucket = this.getBucket(key);
        if (!bucket || !bucket.containsKey(key)) return false;

        const index = bucket.findKey(key);
        bucket.removeAt(index);
        this.size--;
        return true;
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    keys() {
        let arr = [];
        for (let bucket of this.buckets) {
            if (!bucket) continue;
            let curr = bucket.head;
            while (curr) {
                arr.push(curr.value.key);
                curr = curr.nextNode;
            }
        }
        return arr;
    }

    values() {
        let arr = [];
        for (let bucket of this.buckets) {
            if (!bucket) continue;
            let curr = bucket.head;
            while (curr) {
                arr.push(curr.value.value);
                curr = curr.nextNode;
            }
        }
        return arr;
    }

    entries() {
        let arr = [];
        for (let bucket of this.buckets) {
            if (!bucket) continue;
            let curr = bucket.head;
            while (curr) {
                arr.push([curr.value.key, curr.value.value]);
                curr = curr.nextNode;
            }
        }
        return arr;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.size = 0;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity);

        for (let bucket of oldBuckets) {
            if (!bucket) continue;
            let curr = bucket.head;
            while (curr) {
                this.set(curr.value.key, curr.value.value);
                curr = curr.nextNode;
            }
        }
    }

}
const test = new HashMap();
console.log(test.hash('Rama'));
console.log(test.hash('Sita'));
console.log(test.hash('apple'));
console.log(test.hash('pineapple'));
console.log(test.hash('banana'));

test.set('apple', 'red');
test.set('apple', 'green');
test.set('pineapple', 'yellow');
test.set('orange', 'orange');
test.set('oranga', 'orange');
test.set('orangew', 'orange');
test.set('oranger', 'orange');
test.set('oranget', 'orange');
test.set('orangey', 'orange');
test.set('orangeo', 'orange');
test.set('orangei', 'orange');
test.set('orangel', 'orange');
test.set('orangeb', 'orange');
test.set('orangeg', 'orange');
test.set('orangem', 'orange');
// test.set('orangev', 'orange');
// test.set('orangello', 'orange');
test.set('orangen', 'orange');
console.log(test.buckets);

console.log(test.get('orangenoo')); // null
console.log(test.get('orangen')); // orange

console.log(test.has('appleo')); // false

console.log(test.remove('oranga')); // true
console.log(test.remove('oran')); // false
console.log(test.buckets);

console.log(test.length());

// test.clear();
// console.log(test.buckets);

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

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

        if (!bucket) {
            this.buckets[hashCode] = new LinkedList();
        }
        if (bucket && bucket.containsKey(key)) {
            let index = bucket.findKey(key);
            let item = bucket.at(index);
            item.value.value = value;
            return;
        }
        this.buckets[hashCode].append({ key, value });
        this.size++;
    }
}
const test = new HashMap();
console.log(test.hash('Rama'));
console.log(test.hash('Sita'));

test.set('apple', 'red');
test.set('apple', 'green');
test.set('pineapple', 'yellow');
test.set('orange', 'orange');
console.log(test.buckets);
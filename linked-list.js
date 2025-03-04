export class LinkedList {
    head;

    constructor() {
        this.head = null;
    }

    append(value) {
        if (!this.head) this.head = new Node(value);
        else {
            let temp = this.head;
            while (temp.nextNode) temp = temp.nextNode;
            temp.nextNode = new Node(value);
        }
    }

    prepend(value) {
        if (!this.head) this.head = new Node(value);
        else {
            let temp = this.head;
            this.head = new Node(value);
            this.head.nextNode = temp;
        }
    }

    size() {
        if (!this.head) return 0;
        let temp = this.head;
        let count = 0;
        while (temp) {
            temp = temp.nextNode;
            count++;
        }
        return count;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        let curr = this.head;
        while (curr.nextNode) curr = curr.nextNode;
        return curr;
    }

    at(index) {
        if (index >= this.size() || index < 0) return null;

        // if (index === 0) return this.head;
        let curr = this.head;
        let i = 0
        while (curr && i < index) {
            curr = curr.nextNode;
            i++
        }
        return curr;
    }

    pop() {
        if (this.size() === 1) {
            this.head = new Node();
            return;
        }
        const lastButOne = this.at(this.size() - 2);
        lastButOne.nextNode = null;
    }

    contains(value) {
        let curr = this.head;
        while (curr) {
            if (curr.value === value) return true;
            curr = curr.nextNode;
        }
        return false;
    }

    find(value) {
        let curr = this.head;
        let index = 0;
        while (curr) {
            if (curr.value === value) return index;
            curr = curr.nextNode;
            index++;
        }
        return null;
    }

    toString() {
        let curr = this.head;
        let str = '';
        while (curr) {
            str += `( ${curr.value} ) -> `;
            curr = curr.nextNode;
        }
        return str + 'null';
    }

    insertAt(value, index) {
        if (index > this.size() || index < 0) return 'Invalid index value. Try again!';

        let nodesAfter = this.at(index);
        if (index === 0) this.head = new Node(value, nodesAfter);
        else this.at(index - 1).nextNode = new Node(value, nodesAfter);
    }

    removeAt(index) {
        if (index >= this.size() || index < 0 || (index === 0 && this.size() === 0)) return null;

        let nodesAfter = this.at(index + 1);
        if (index === 0) this.head = nodesAfter;
        else this.at(index - 1).nextNode = nodesAfter;
    }

    containsKey(key) {
        let curr = this.head;
        while (curr) {
            if (curr.value.key === key) return true;
            curr = curr.nextNode;
        }
        return false;
    }

    findKey(key) {
        let curr = this.head;
        let index = 0;
        while (curr) {
            if (curr.value.key === key) return index;
            curr = curr.nextNode;
            index++;
        }
        return null;
    }
}

export class Node {
    value;
    nextNode;

    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}
class HashMap {
    constructor(loadFactor) {

        function initialCapacity () {
            let buckets = [];
            for (let i = 0; i < 16; i++) {
                let list = new LinkedList()
                buckets.push(list);
            }
            return buckets
        }

        this.capacity = initialCapacity();
        this.loadFactor = loadFactor;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
    }
}

class node {
    constructor(value, key, next = null) {
        this.value = value;
        this.next = next;
        this.key = key;
    }
}

function hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return hashCode;
} 

let hashMap = new HashMap();


function checkIndex (index) {
    if (index < 0 || index >= hashMap.capacity.length) {
        throw new Error("Trying to access index out of bound");
    }
}

function set(key, value) {
    let hashedKey = hash(key);
    const length = 16;
    const index = hashedKey % length;
    let current = hashMap.capacity[index];
    const newValue = new node(value, hashedKey);

    checkIndex(index)

    while (current.head !== null) {
        if (current.head.key === hashedKey) {
            current.head.value = value;
        }
        current.head = current.head.next;
    }

    if (current.head === null) {
        current.head = newValue
    } else {
        while (current.head.next !== null) {
            current.head = current.head.next
        }
        current.head.next = newValue;
    }
    return current
}

function get(key) {
    let hashedKey = hash(key);
    const length = 16;
    const index = hashedKey % length;
    let current = hashMap.capacity[index];
    
    checkIndex(index)

    if (current.head === null) {
        return null;
    } else {
        while (current.head !== null) {
            if (current.head.key === hashedKey) {
                return current.head.value
            }
            current.head = current.head.next;
        }
    }

    return current.head
}

function has(key) {
    let hashedKey = hash(key);
    const length = 16;
    const index = hashedKey % length;
    let current = hashMap.capacity[index];
    
    checkIndex(index)

    if (current.head === null) {
        return false;
    } else {
        while (current.head !== null) {
            if (current.head.key === hashedKey) {
                return true
            }
            current.head = current.head.next;
        }
    }

    return false
}


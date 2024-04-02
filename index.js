class HashMap {
    constructor(loadFactor = 0) {

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


function editLoadFactor () {
    hashMap.loadFactor += 1 / hashMap.capacity.length;

    function increaseCapacity () {
        let currentBuckets = [...hashMap.capacity]

        for (let i = 0; i < hashMap.capacity.length; i++) {
            let list = new LinkedList();
            currentBuckets.push(list)
        }

        return currentBuckets
    }

    if (hashMap.loadFactor >= 0.75) {
        console.log("Load factor sequence initiated");
        hashMap.loadFactor = length() / hashMap.capacity.length
        hashMap.capacity = increaseCapacity()
    }
}

function set(key, value) {
    let hashedKey = hash(key);
    const length = 16;
    const index = hashedKey % length;
    let current = hashMap.capacity[index]; 
    const newValue = new node(value, hashedKey);

    checkIndex(index)

    if (current.head === null) {
        current.head = newValue
    } else {
        while (current.head.next !== null) {
            current.head = current.head.next
        }
        if (current.head.key === hashedKey) {
            
            return current.head.value = value;
        }
        current.head.next = newValue;
    }
    editLoadFactor()

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

function remove(key) {
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
                return current.head = null;
            }
            editLoadFactor('decrease');
            current.head = current.head.next;
        }
    }
    return current
}

function length() {
    let totalKeys = 0;
    for (let i = 0; i < hashMap.capacity.length; i++) {
        let current = hashMap.capacity[i].head;
        while (current !== null) {
            totalKeys++;
            current = current.next
        }
    }
    return totalKeys
}

function clear() {
    return new HashMap();
}

function keys() {
    let totalKeys = [];
    for (let i = 0; i < hashMap.capacity.length; i++) {
        let current = hashMap.capacity[i].head;
        while (current !== null) {
            totalKeys.push(current.key)
            current = current.next
        }
    }
    return totalKeys
}

set("ahmad", "ahmad")
set("asdsad", "kd")
set("xsa", "adasd")

console.log(keys());
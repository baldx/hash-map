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

function editLoadFactor (action) {
    switch (action) {
        case 'increase':
            hashMap.loadFactor = hashMap.loadFactor + 1/16
            break;
    
        case 'decrease':
            hashMap.loadFactor = hashMap.loadFactor - 1/16
            break;
    }
}

function set(key, value) {
    let hashedKey = hash(key);
    const length = 16;
    const index = hashedKey % length;
    let current = hashMap.capacity[index]; // this +
    const newValue = new node(value, hashedKey); // this have to be configured since the keys and hashed key are the same

    checkIndex(index)

    

    if (current.head === null) {
        current.head = newValue
        editLoadFactor('increase')
    } else {
        if (current.head !== null) {
            while (current.head.next !== null) {
                current.head = current.head.next
            }
            if (current.head.key === hashedKey) {
                return current.head.value = value;
            }
        }
        current.head.next = newValue;
    }
    return current
}


set("ldla", "test1")
set("ldddla", "test1")
set("ldla", "test3")
set("ldddla", "test2")

console.log(hashMap.capacity[13]);

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
    let length = hashMap.capacity.length - 1;
    let list = hashMap.capacity;

    while (length > 0) {
        if (list[length].head === null) {
            totalKeys = totalKeys
        } else {
            while (list[length].head !== null) {
                if (list[length].head.key) {
                    totalKeys++;
                }
                list[length].head = list[length].head.next; //fix with collisions later
            }
        }
        length--;
    }

    return totalKeys
}

function clear() {
    return new HashMap();
}

function keys() {
    let keys = []
    let length = hashMap.capacity.length - 1;
    let list = hashMap.capacity;

    while (length > 0) {
        if (list[length].head === null) {
            keys.push()
        } else {
            while (list[length].head !== null) {
                if (list[length].head.key) {
                    keys.push(list[length].head.key)
                }
                list[length].head = list[length].head.next; //deal with collisions
            }
        }
        length--;
    }

    return keys
}

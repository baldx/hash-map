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
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
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


function set(key, value) {
    let hashedKey = hash(key);
    const length = 16;
    const index = hashedKey % length;
    let current = hashMap.capacity[index];

    if (current.head === null) {
        const newValue = new node(value);
        current.head = newValue.value
    }

    return current
}

console.log(set("asd", "adsd"));
console.log(hashMap);

/*
    function set() {
        if list head is null {
            set value to head
            set head.next to null
        }
            
        else {
            while next node is not null {
                set current node to next node
            }
            set next node to value
        }

    }
*/
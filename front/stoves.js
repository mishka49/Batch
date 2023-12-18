let coll = [
    [
        0,
        {name: "gena", age: 11}
    ],
    [
        1,
        {name: "roma", age: 12}
    ],
    [
        2,
        {name: "sasha", age: 13}
    ]
]

console.log(typeof coll[0])
console.log(coll.map((item) => item[1].age))
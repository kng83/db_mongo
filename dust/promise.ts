// Przyklad promisa

function bobo(para: any, callback) {
    return callback();
}

let my_Name = 'pawel';

let me = bobo(my_Name, () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(my_Name);
        },3500)

    });
});
console.log(me.then((resolve) => {
    console.log(resolve)
}));


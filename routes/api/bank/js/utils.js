function printResource(resource) {

    let allocation = resource.allocation;
    let need = resource.need;

    const TAB = '\t';
    console.log(`Process${TAB}Alloca${TAB.repeat(allocation[0].length)}Need`);

    for(let i = 0; i < allocation.length; i++) {
        let str = '';

        str += `P${i}${TAB}`;

        for(let item of allocation[i]) {
            str += `${item}${TAB}`;
        }

        for(let item of need[i]) {
            str += `${item}${TAB}`;
        }

        console.log(str);
    }
}

module.exports = { printResource };
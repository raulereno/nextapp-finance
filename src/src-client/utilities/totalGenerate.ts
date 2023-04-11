export const totalGenerate = (transactions: any) => {
    let result = [];
    result[0] = transactions.reduce((acc : number, ele : any) => {if(ele.type[0] === 'negocio'){ return acc + ele.value} else {return acc}}, 0)
    result[1] = transactions.reduce((acc : number, ele : any) => {if(ele.type[0] === 'negocio'){ return acc + ele.value} else {return acc}}, 0)

    return result
}
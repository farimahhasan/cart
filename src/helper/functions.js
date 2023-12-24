const shorten = (title) => {
    const splitedTitle = title.split(" ");
    const newTitle = `${splitedTitle[0]} ${splitedTitle[1]}`
    return newTitle;
    // یا
    //return title.split(" ").slice(0,2).join("")
}


const isInCart = (state, id) => {
  const result = !!state.selectedItems.find(item => item.id === id)
  return result;
}
const quantityCount = (state, id) => {
    const index = state.selectedItems.findIndex(item => item.id === id);
    if (index === -1) {
        return 0
    } else {
        return state.selectedItems[index].quantity;
    }
}


let searchProducts=(products,search)=>{
  if(!search) return products
  let result = products.filter((product)=>product.title.toLowerCase().includes(search))
  return result;
}

let filterProducts=(products,category)=>{
    if(!category) return products
    let result = products.filter((product)=>product.category===category)
    return result;
}

let createQueryObject=(currentQuery , newQuery)=>{
  if(newQuery.category==="all"){
    const {category , ...rest}=currentQuery
    return rest
  }
  if(newQuery.search===""){
    const {search , ...rest}=currentQuery
    return rest
  }
  return{
    ...currentQuery,...newQuery
  }
}

const getInitialQuery=(searchParams)=>{
  let query={}
  const category=searchParams.get("category")
  const search=searchParams.get("search")
  if(category) query.category=category
  if(search) query.search=search
  return query
}

export {shorten, isInCart, quantityCount, searchProducts , filterProducts , createQueryObject , getInitialQuery};
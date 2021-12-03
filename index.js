/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/

const storeItemList = document.querySelector('.store--item-list') // finding ul inside header section
const cartItemList = document.querySelector('.item-list.cart--item-list') // finding ul inside main section
const deleteBtn = document.querySelector('.delete-section button')

//state object with items inside, every item is a object inside array
const state = {
  items:[
    {
      id: '001',
      name: 'beetroot',
      price: 1.35,
      inStock: 10,
      inCart: 0 // by default the app starts with 0 inCart or quantity
      
    },
    {
      id: '002',
      name: 'carrot',
      price: 2.80,
      inStock: 10,
      inCart: 0
    },
    {
      id: '003',
      name: 'apple',
      price: 2.65,
      inStock: 10,
      inCart: 0
    },
    {
      id: '004',
      name: 'apricot',
      price: 3.15,
      inStock: 10,
      inCart: 0
    },
    {
      id: '005',
      name: 'avocado',
      price: 2.25,
      inStock: 10,
      inCart: 0
    },
    {
      id: '006',
      name: 'bananas',
      price: 1.55,
      inStock: 10,
      inCart: 0
    },
    {
      id: '007',
      name: 'bell-pepper',
      price: 4.10,
      inStock: 10,
      inCart: 0
    },
    {
      id: '008',
      name: 'berry',
      price: 1.55,
      inStock: 10,
      inCart: 0
    },
    {
      id: '009',
      name: 'blueberry',
      price: 3.90,
      inStock: 10,
      inCart: 0
    },
    {
      id: '010',
      name: 'eggplant',
      price: 4.05,
      inStock: 10,
      inCart: 0
    },
    {
      id: '011',
      name: 'watermelon',
      price: 3.50,
      inStock: 10,
      inCart: 0
    },
    {
      id: '012',
      name: 'grapes',
      price: 1.20,
      inStock: 10,
      inCart: 0
    }
  ]
}

// function that we send a single element inside array and it increase quantity by one
function inCreaseQuantity(item){
  if(item.inStock > 0){
    item.inCart++
    item.inStock--
  }
}
// function that we send a single element inside array and it decrease quantity by one
function deCreaseQuantity(item){
  item.inCart--
  item.inStock++
}
//function that accept one argument of single element and return the number of inCart inside object in the state
function getNumberOfItemsInCart(item){
  return item.inCart
}
//fuction that loop in every object inside state array and reset inCart to zero
function emptyStoreList(){
  for(const item of state.items){
    item.inCart = 0
  }
}

//function that get the one single price
function getPrice(item){
  return item.price
}
//function that remove one single item inside state and update the states
function removeItemFromStore(item){
  const updatedStore = state.items.filter(function(storeItem){
    return storeItem.id != item.id
  })
  state.items = updatedStore
}

//function to show the total price
function showPrice(){
  const spanEl = document.querySelector('.total-number')
  let totalPrice = 0
  spanEl.innerHTML =''
  for(const item of state.items){
    totalPrice += (getNumberOfItemsInCart(item) * getPrice(item))
  }
  spanEl.textContent = `£${totalPrice.toFixed(2)}`
}


// first created single item inside ul store in the header
function renderStoreItem(item){
  const listItem = document.createElement('li')
  
    const removeButton = document.createElement('button')
    removeButton.textContent = 'x'
  
    removeButton.addEventListener('click', function(){
      removeItemFromStore(item)
      render()
    })
    const itemIcon = document.createElement('div')
    itemIcon.setAttribute('class','store--item-icon')
    const listItemButton = document.createElement('button')
    listItemButton.textContent = 'Add to cart'
  
    const spanEl = document.createElement('span')
    spanEl.setAttribute('class','single-item-price')
    spanEl.textContent = `Price: £${getPrice(item).toFixed(2)}`

    const inStockEl = document.createElement('span')
    inStockEl.setAttribute('class','in-stock')
    inStockEl.textContent = `In Stock: ${item.inStock}`
    const imgEl = document.createElement('img')
    imgEl.setAttribute('src',`assets/icons/${item.id}-${item.name}.svg`)
    imgEl.setAttribute('alt',`${item.name}`)
  
    storeItemList.append(listItem)
    listItem.append(removeButton,itemIcon,listItemButton, spanEl,inStockEl)
    itemIcon.append(imgEl)
    
    //listen to the button when the user click
    listItemButton.addEventListener('click',function(){
      inCreaseQuantity(item) //updating quantity by adding +1 in the states
      render() //calling render function
    })
}

function renderStore() {
  storeItemList.innerHTML = ''
  
  for(const item of state.items){
    renderStoreItem(item)
  }
}

//render CartItem inside main
function renderCartItem(){

  cartItemList.innerHTML = '' // after updating some states clearing the ul content

  for(const item of state.items){ // looping for every item in the state object

    if(getNumberOfItemsInCart(item) > 0){ // if inCart is bigger than 0 create that single element in the cartItem li inside ul
      const cartLiEl = document.createElement('li')
      const imageEl = document.createElement('img')
      imageEl.setAttribute('class','cart--item-icon')
      imageEl.setAttribute('src',`assets/icons/${item.id}-${item.name}.svg`)
      imageEl.setAttribute('alt',`${item.name}`)
      const pEl = document.createElement('p')
      pEl.textContent = `${item.name}`

      const decreaseButton = document.createElement('button')
      decreaseButton.classList.add('quantity-btn','remove-btn','center');
      decreaseButton.textContent = '-'
      //listen the decrease button, whena user click it update the quantity of single object in state and than call the render
      decreaseButton.addEventListener('click',function(){
        deCreaseQuantity(item)
        render()
      })
      const spanEl = document.createElement('span')
      spanEl.classList.add('quantity-text','center')
      spanEl.textContent = `${item.inCart}`

      const increaseButton = document.createElement('button')
      increaseButton.classList.add('quantity-btn','add-btn','center')
      increaseButton.textContent = '+'
      //listen the increase button, whena user click it update the quantity of single object in state and than call the render
      increaseButton.addEventListener('click',function(){
        inCreaseQuantity(item)
        render()
      })
      cartItemList.append(cartLiEl)
      cartLiEl.append(imageEl,pEl,decreaseButton,spanEl,increaseButton)
    } 
  }
}

function listenToDeleteButton(){
  deleteBtn.addEventListener('click',function(){
    emptyStoreList()
    render()
  })
}
function render(){
  renderStore()
  renderCartItem()
  showPrice()
  listenToDeleteButton()
}
render()//calling render function
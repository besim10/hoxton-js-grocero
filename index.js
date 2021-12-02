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


//state object with items inside, every item is a object inside array
const state = {
  items:[
    {
      id: '001',
      name: 'beetroot',
      price: 0.35,
      inCart: 0 // by default the app starts with 0 inCart or quantity
    },
    {
      id: '002',
      name: 'carrot',
      price: 0.45,
      inCart: 0
    },
    {
      id: '003',
      name: 'apple',
      price: 0.85,
      inCart: 0
    },
    {
      id: '004',
      name: 'apricot',
      price: 0.85,
      inCart: 0
    },
    {
      id: '005',
      name: 'avocado',
      price: 0.85,
      inCart: 0
    },
    {
      id: '006',
      name: 'bananas',
      price: 0.85,
      inCart: 0
    },
    {
      id: '007',
      name: 'bell-pepper',
      price: 0.85,
      inCart: 0
    },
    {
      id: '008',
      name: 'berry',
      price: 0.85,
      inCart: 0
    },
    {
      id: '009',
      name: 'blueberry',
      price: 0.85,
      inCart: 0
    },
    {
      id: '010',
      name: 'eggplant',
      price: 0.45,
      inCart: 0
    }
  ]
}

// function that we send a single element inside array and it increase quantity by one
function inCreaseQuantity(item){
  item.inCart += 1
}
// function that we send a single element inside array and it decrease quantity by one
function deCreaseQuantity(item){
  item.inCart -= 1
}
//function that accept one argument of single element and return the number of inCart inside object in the state
function getNumberOfItemsInCart(item){
  return item.inCart
}

//function that get the one single price
function getPrice(item){
  return item.price
}

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
function storeItem(item){
  const listItem = document.createElement('li')
  const itemIcon = document.createElement('div')
  itemIcon.setAttribute('class','store--item-icon')
  const listItemButton = document.createElement('button')
  listItemButton.textContent = 'Add to cart'
  const imgEl = document.createElement('img')
  imgEl.setAttribute('src',`assets/icons/${item.id}-${item.name}.svg`)
  imgEl.setAttribute('alt',`${item.name}`)

  storeItemList.append(listItem)
  listItem.append(itemIcon,listItemButton)
  itemIcon.append(imgEl)
  
  //listen to the button when the user click
  listItemButton.addEventListener('click',function(){
    inCreaseQuantity(item) //updating quantity by adding +1 in the states
    render() //calling render function
  })
}

//With for loop creating all the store items, like apple bananas etc.
function renderStoreItemList(){
  for(const item of state.items){
    storeItem(item)
  }
}
renderStoreItemList()


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

function render(){
  renderCartItem()
  showPrice()
}
render()//calling render function
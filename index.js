/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/
const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.item-list.cart--item-list')


const state = {
  items:[
    {
      id: '001',
      name: 'beetroot',
      price: 0.35,
      inCart: 0
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
function inCreaseQuantity(item){
  item.inCart += 1
}
function getInCart(item){
  return item.inCart
}

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

  listItemButton.addEventListener('click',function(){
    inCreaseQuantity(item)
    renderCartItem()
  })
}
function renderStoreItemList(){
  for(const item of state.items){
    storeItem(item)
  }
}
renderStoreItemList()

function renderCartItem(){

  cartItemList.innerHTML = ''
  for(const item of state.items){
    if(getInCart(item) > 0){
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
      const spanEl = document.createElement('span')
      spanEl.classList.add('quantity-text','center')
      spanEl.textContent = `${item.inCart}`
      const increaseButton = document.createElement('button')
      increaseButton.classList.add('quantity-btn','add-btn','center')
      increaseButton.textContent = '+'
      
      cartItemList.append(cartLiEl)
      cartLiEl.append(imageEl,pEl,decreaseButton,spanEl,increaseButton)
    } 
  }
}
function render(){
  renderCartItem()
}
render()
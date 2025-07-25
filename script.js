const products = [
  { id:1,name:"Floral Tote",price:299,image:"images/bag1.jpg" },
  { id:2,name:"Canvas Love",price:299,image:"images/bag2.jpg" },
  { id:3,name:"Elegant Print",price:299,image:"images/bag3.jpg" },
  { id:4,name:"Eco Chic",price:299,image:"images/bag4.jpg" }
];

function loadCart(){return JSON.parse(localStorage.getItem("cart"))||[];}
function saveCart(cart){localStorage.setItem("cart", JSON.stringify(cart));}
function updateCartIcon(){const count=loadCart().reduce((s,i)=>s+i.quantity,0);document.getElementById("cart-count").innerText=count;}
function showToast(msg){
  const t = document.createElement("div"); t.className="toast"; t.innerText=msg;
  document.body.appendChild(t); setTimeout(()=>t.remove(),1500);
}
function addToCart(id){
  const cart=loadCart(),item=cart.find(p=>p.id===id);
  item?item.quantity++:cart.push({id,quantity:1});
  saveCart(cart); updateCartIcon(); showToast("✅ Added to Cart");
  if(document.getElementById('cart-items')) displayCart();
}
function changeQty(id,delta){const cart=loadCart(),item=cart.find(p=>p.id===id);if(item){
  item.quantity+=delta;
  if(item.quantity<=0){removeFromCart(id); return;}
  saveCart(cart); displayCart(); updateCartIcon();}
}
function removeFromCart(id){const cart=loadCart().filter(p=>p.id!==id);saveCart(cart);displayCart();updateCartIcon();}

function displayCart(){
  const cart=loadCart(),ct=document.getElementById("cart-items"),tt=document.getElementById("cart-total");
  ct.innerHTML="";let total=0; cart.forEach(it=>{
    const p=products.find(pr=>pr.id===it.id);
    total+=p.price*it.quantity;
    ct.innerHTML+=`
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}"/>
        <div class="cart-details">
          <h3>${p.name}</h3>
          <p>₹${p.price} x ${it.quantity} = ₹${p.price*it.quantity}</p>
          <div class="qty-controls">
            <button onclick="changeQty(${it.id},-1)">-</button>
            <span>${it.quantity}</span>
            <button onclick="changeQty(${it.id},1)">+</button>
            <button onclick="removeFromCart(${it.id})">Remove</button>
          </div>
        </div>
      </div>`;
  });
  tt.innerText=total;
}

function checkoutRazorpay(){
  const total=loadCart().reduce((sum,it)=>sum+(products.find(p=>p.id===it.id).price*it.quantity),0);
  window.location.href=`https://rzp.io/l/alankriti-bags?amount=${total*100}`;
}

document.addEventListener("DOMContentLoaded", updateCartIcon);
if(document.getElementById("cart-items")) displayCart();

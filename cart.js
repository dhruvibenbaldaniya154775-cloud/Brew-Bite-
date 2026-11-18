
function cartData(){return BB.get(BB.keys.cart,[])}
function renderCart(){
 const wrap=document.getElementById('cartItems');if(!wrap)return;const cart=cartData();
 if(!cart.length){wrap.innerHTML='<div class="empty">Your cart is empty.<br><a class="btn btn-primary" style="margin-top:15px" href="menu.html">Browse Menu</a></div>';updateSummary();return}
 wrap.innerHTML=cart.map(x=>`<div class="cart-row"><img src="${x.image}" alt="${x.name}"><div><h3 style="margin:0">${x.name}</h3><p class="muted">${BB.money(x.price)} each</p></div><div class="qty"><button onclick="changeQty('${x.id}',-1)">−</button><b>${x.qty}</b><button onclick="changeQty('${x.id}',1)">+</button></div><div class="cart-price"><b>${BB.money(x.price*x.qty)}</b><button class="btn btn-light cart-remove" onclick="removeCart('${x.id}')" style="margin-left:8px">Remove</button></div></div>`).join('');
 updateSummary();
}
function changeQty(id,d){const c=cartData(),x=c.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)return removeCart(id);BB.set(BB.keys.cart,c);renderCart();updateCartCount()}
function removeCart(id){BB.set(BB.keys.cart,cartData().filter(x=>x.id!==id));renderCart();updateCartCount();BB.toast('Item removed')}
function updateSummary(){const sub=cartData().reduce((s,x)=>s+x.price*x.qty,0),tax=Math.round(sub*.1),total=sub+tax;['subtotal','tax','total'].forEach(k=>{const e=document.getElementById(k);if(e)e.textContent=BB.money(k==='subtotal'?sub:k==='tax'?tax:total)});const checkout=document.getElementById('checkoutBtn');if(checkout)checkout.style.display=sub?'inline-block':'none'}
document.addEventListener('DOMContentLoaded',renderCart);

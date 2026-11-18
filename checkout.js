
function setupCheckout(){
 const f=document.getElementById('checkoutForm');if(!f||!BB.requireLogin())return;
 const cart=BB.get(BB.keys.cart,[]);if(!cart.length){location.href='cart.html';return}
 const u=BB.user();f.name.value=u.name;f.email.value=u.email;f.phone.value=u.phone;f.address.value=u.address||'';
 const sub=cart.reduce((s,x)=>s+x.price*x.qty,0),tax=Math.round(sub*.1);document.getElementById('coSubtotal').textContent=BB.money(sub);document.getElementById('coTax').textContent=BB.money(tax);document.getElementById('coTotal').textContent=BB.money(sub+tax);
 f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(!d.name||!d.email||!d.phone||!d.address||!d.payment)return showAuthMsg('checkoutMsg','Please fill all checkout fields.');
  const order={id:BB.uid('ORD'),userId:u.id,name:d.name,email:d.email,date:new Date().toLocaleString('en-IN'),items:cart,total:sub+tax,status:'Order Placed',payment:d.payment};const orders=BB.get(BB.keys.orders,[]);orders.unshift(order);BB.set(BB.keys.orders,orders);BB.set(BB.keys.cart,[]);document.getElementById('confirmation').innerHTML=`<div class="alert success"><b>Order placed successfully!</b><br>Order ID: ${order.id}<br>Total: ${BB.money(order.total)}<br><a href="orders.html">View My Orders</a></div>`;f.reset();updateCartCount();f.style.display='none';
 });
}
document.addEventListener('DOMContentLoaded',setupCheckout);


const BB = {
  keys: {users:'bb_users', current:'bb_currentUser', products:'bb_products', cart:'bb_cart', orders:'bb_orders', reservations:'bb_reservations'},
  get(k, fallback){try{return JSON.parse(localStorage.getItem(k)) ?? fallback}catch(e){return fallback}},
  set(k,v){localStorage.setItem(k,JSON.stringify(v))},
  uid(prefix){return prefix + Date.now().toString().slice(-7) + Math.floor(Math.random()*90+10)},
  money(n){return '₹ ' + Number(n||0).toFixed(0)},
  current(){return this.get(this.keys.current,null)},
  user(){const id=this.current(); return id ? this.get(this.keys.users,[]).find(u=>u.id===id) : null},
  toast(msg){const t=document.getElementById('toast'); if(t){t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}},
  seed(){
    if(!localStorage.getItem(this.keys.products)){
      const p=[
        {id:'p1',name:'Cappuccino',category:'Coffee',price:169,desc:'Rich espresso with smooth steamed milk foam.',image:'images/coffee.svg',available:true},
        {id:'p2',name:'Cold Coffee',category:'Cold Drinks',price:149,desc:'Chilled creamy coffee served refreshing and cold.',image:'images/coffee.svg',available:true},
        {id:'p3',name:'Latte',category:'Coffee',price:159,desc:'Mild espresso blended with silky steamed milk.',image:'images/coffee.svg',available:true},
        {id:'p4',name:'Masala Tea',category:'Tea',price:99,desc:'Warm Indian tea with aromatic spices.',image:'images/tea.svg',available:true},
        {id:'p5',name:'Veg Sandwich',category:'Snacks',price:129,desc:'Fresh vegetables, cheese and toasted bread.',image:'images/snack.svg',available:true},
        {id:'p6',name:'French Fries',category:'Snacks',price:119,desc:'Crispy golden fries with a light seasoning.',image:'images/snack.svg',available:true},
        {id:'p7',name:'Chocolate Cake',category:'Desserts',price:149,desc:'Soft chocolate cake with a rich cocoa finish.',image:'images/dessert.svg',available:true},
        {id:'p8',name:'Brownie',category:'Desserts',price:129,desc:'Fudgy chocolate brownie served fresh.',image:'images/dessert.svg',available:true},
        {id:'p9',name:'Pancake Stack',category:'Breakfast',price:179,desc:'Fluffy pancakes served with a sweet topping.',image:'images/breakfast.svg',available:true},
        {id:'p10',name:'Breakfast Toast',category:'Breakfast',price:139,desc:'Toasted bread with a simple cafe breakfast topping.',image:'images/breakfast.svg',available:true}
      ]; this.set(this.keys.products,p);
    }
    if(!localStorage.getItem(this.keys.users)) this.set(this.keys.users,[]);
    if(!localStorage.getItem(this.keys.orders)) this.set(this.keys.orders,[]);
    if(!localStorage.getItem(this.keys.reservations)) this.set(this.keys.reservations,[]);
    if(!localStorage.getItem(this.keys.cart)) this.set(this.keys.cart,[]);
  },
  requireLogin(){
    if(!this.user()){location.href='login.html?next='+encodeURIComponent(location.pathname.split('/').pop());return false}
    return true
  }
};
BB.seed();

function renderShell(){
  const page=document.body.dataset.page||'';
  const u=BB.user();
  const nav=document.getElementById('site-nav');
  if(nav) nav.innerHTML=`
    <div class="container nav-inner">
      <a class="brand" href="index.html">☕ Brew &amp; Bite<small>Fresh coffee. Simple ordering.</small></a>
      <button class="menu-toggle" id="menuToggle">☰</button>
      <div class="nav-links" id="navLinks">
        <a href="index.html" class="${page==='home'?'active':''}">Home</a>
        <a href="menu.html" class="${page==='menu'?'active':''}">Menu</a>
        <a href="reservation.html" class="${page==='reservation'?'active':''}">Reservation</a>
        <a href="orders.html" class="${page==='orders'?'active':''}">My Orders</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="nav-actions">
        <a class="icon-btn" href="cart.html" title="Cart">🛒 <span id="cartCount">0</span></a>
        ${u ? `<a class="icon-btn" href="profile.html" title="Profile">👤 ${u.name.split(' ')[0]}</a>` : `<a class="btn btn-primary" href="login.html">Login</a>`}
      </div>
    </div>`;
  document.getElementById('menuToggle')?.addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));
  updateCartCount();
  const footer=document.getElementById('site-footer');
  if(footer) footer.innerHTML=`<div class="container footer-grid">
    <div><h2>Brew &amp; Bite</h2><p>Fresh coffee. Simple ordering.</p><p class="muted" style="color:#d7c3b7">A frontend-only college cafe management demo built with HTML, CSS, JavaScript and localStorage.</p></div>
    <div><h3>Quick Links</h3><p><a href="menu.html">Menu</a></p><p><a href="reservation.html">Reservation</a></p><p><a href="orders.html">My Orders</a></p></div>
    <div><h3>Contact</h3><p>📍 Rajkot, Gujarat</p><p>☎ +91 98765 43210</p><p>✉ hello@brewandbite.demo</p></div>
  </div><div class="container footer-bottom">© 2026 Brew &amp; Bite • College Project</div>`;
}
function updateCartCount(){const c=BB.get(BB.keys.cart,[]); const n=c.reduce((s,x)=>s+x.qty,0); const el=document.getElementById('cartCount');if(el)el.textContent=n}
function addToCart(id,qty=1){
  const products=BB.get(BB.keys.products,[]), p=products.find(x=>x.id===id); if(!p||!p.available)return;
  const cart=BB.get(BB.keys.cart,[]); const row=cart.find(x=>x.id===id);
  if(row)row.qty+=qty;else cart.push({id:p.id,name:p.name,price:p.price,image:p.image,qty});
  BB.set(BB.keys.cart,cart); updateCartCount(); BB.toast(p.name+' added to cart');
}
document.addEventListener('DOMContentLoaded',()=>{renderShell();});

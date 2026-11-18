
function productCard(p){
 return `<div class="card">
   <img class="product-img" src="${p.image}" alt="${p.name}">
   <div class="card-body">
     <span class="badge">${p.category}</span>
     <h3 style="margin-top:9px">${p.name}</h3>
     <p class="muted">${p.desc}</p>
     <div class="price">${BB.money(p.price)}</div>
     <div class="card-actions">
       <button class="btn btn-primary" onclick="addToCart('${p.id}')">Add to Cart</button>
       <a class="btn btn-light" href="product.html?id=${p.id}">View Details</a>
     </div>
   </div>
 </div>`;
}
function renderMenu(){
 const list=document.getElementById('productGrid'); if(!list)return;
 const products=BB.get(BB.keys.products,[]).filter(p=>p.available);
 const search=(document.getElementById('searchProduct')?.value||'').toLowerCase();
 const cat=document.querySelector('.filter-btn.active')?.dataset.cat||'All';
 const sort=document.getElementById('sortProduct')?.value||'default';
 let arr=products.filter(p=>(cat==='All'||p.category===cat)&&(p.name.toLowerCase().includes(search)||p.desc.toLowerCase().includes(search)));
 if(sort==='low')arr.sort((a,b)=>a.price-b.price); if(sort==='high')arr.sort((a,b)=>b.price-a.price); if(sort==='az')arr.sort((a,b)=>a.name.localeCompare(b.name));
 list.innerHTML=arr.length?arr.map(productCard).join(''):`<div class="empty" style="grid-column:1/-1">No products found.</div>`;
}
function setupMenu(){
 if(!document.getElementById('productGrid'))return;
 document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMenu()}));
 document.getElementById('searchProduct')?.addEventListener('input',renderMenu);
 document.getElementById('sortProduct')?.addEventListener('change',renderMenu);
 renderMenu();
}
function renderProductDetails(){
 const el=document.getElementById('productDetails');if(!el)return;
 const id=new URLSearchParams(location.search).get('id');const p=BB.get(BB.keys.products,[]).find(x=>x.id===id)||BB.get(BB.keys.products,[])[0];
 if(!p){el.innerHTML='<div class="empty">Product not found.</div>';return}
 el.innerHTML=`<div class="detail-grid">
   <div><img class="detail-img" src="${p.image}" alt="${p.name}"></div>
   <div><span class="badge">${p.category}</span><h1 style="color:var(--brown);margin:10px 0">${p.name}</h1><p class="muted" style="line-height:1.8">${p.desc}</p><div class="price" style="font-size:1.5rem">${BB.money(p.price)}</div>
   <div style="margin:20px 0"><label><b>Quantity</b></label><div class="qty" style="margin-top:8px"><button id="minus">−</button><span id="qty">1</span><button id="plus">+</button></div></div>
   <button class="btn btn-primary" id="detailAdd">Add to Cart</button></div></div>
   <div class="section-head" style="margin-top:55px"><h2>Related Products</h2></div><div class="grid grid-3">${BB.get(BB.keys.products,[]).filter(x=>x.category===p.category&&x.id!==p.id).slice(0,3).map(productCard).join('')}</div>`;
 let q=1;document.getElementById('minus').onclick=()=>{q=Math.max(1,q-1);document.getElementById('qty').textContent=q};document.getElementById('plus').onclick=()=>{q++;document.getElementById('qty').textContent=q};document.getElementById('detailAdd').onclick=()=>addToCart(p.id,q);
}
document.addEventListener('DOMContentLoaded',()=>{setupMenu();renderProductDetails();});

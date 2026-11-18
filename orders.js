
function renderOrders(){
 const el=document.getElementById('ordersList');if(!el||!BB.requireLogin())return;const u=BB.user();const orders=BB.get(BB.keys.orders,[]).filter(o=>o.userId===u.id);
 if(!orders.length){el.innerHTML='<div class="empty">No orders yet. <a href="menu.html">Order something tasty!</a></div>';return}
 const statuses=['Order Placed','Preparing','Ready','Completed'];
 el.innerHTML=orders.map(o=>`<div class="card" style="margin-bottom:15px"><div class="card-body"><div style="display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap"><div><h3>${o.id}</h3><p class="muted">${o.date}</p></div><span class="badge">${o.status}</span></div><p>${o.items.map(i=>`${i.name} × ${i.qty}`).join(', ')}</p><b>${BB.money(o.total)}</b><div style="margin-top:12px;color:var(--muted)">Order Placed → Preparing → Ready → Completed</div></div></div>`).join('');
}
document.addEventListener('DOMContentLoaded',renderOrders);

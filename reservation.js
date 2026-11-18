
function setupReservation(){
 const f=document.getElementById('reservationForm');if(!f||!BB.requireLogin())return;const u=BB.user();f.name.value=u.name;f.email.value=u.email;f.phone.value=u.phone;
 f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(!d.name||!d.email||!d.phone||!d.date||!d.time||!d.guests)return showAuthMsg('reservationMsg','Please complete all required fields.');
  const r={id:BB.uid('RES'),userId:u.id,...d,status:'Pending',createdAt:new Date().toLocaleString('en-IN')};const rs=BB.get(BB.keys.reservations,[]);rs.unshift(r);BB.set(BB.keys.reservations,rs);showAuthMsg('reservationMsg',`Reservation confirmed for review. Reservation ID: ${r.id}`,'success');f.reset();f.name.value=u.name;f.email.value=u.email;f.phone.value=u.phone;
 });
}
function renderReservations(){
 const el=document.getElementById('reservationList');if(!el||!BB.requireLogin())return;const u=BB.user();const rs=BB.get(BB.keys.reservations,[]).filter(r=>r.userId===u.id);
 if(!rs.length){el.innerHTML='<div class="empty">No reservations found.</div>';return}
 el.innerHTML=rs.map(r=>`<div class="card" style="margin-bottom:15px"><div class="card-body"><div style="display:flex;justify-content:space-between"><h3>${r.id}</h3><span class="badge">${r.status}</span></div><p><b>${r.date}</b> at <b>${r.time}</b> • ${r.guests} guests</p><p class="muted">Table: ${r.table||'Any'}${r.request?` • ${r.request}`:''}</p></div></div>`).join('');
}
document.addEventListener('DOMContentLoaded',()=>{setupReservation();renderReservations()});
